---
title: TypeScriptでハフマン符号を作る
date: 2021-03-23
category: Algorithm
description: バイナリーを文字列で扱うJavaScriptな実装
ogp: /ogp.jpeg
---


最近圧縮アルゴリズムに興味が出てきたんですが、いきなり重いのやると挫折するので比較的理解しやすいとどっかのブログに書いてあったハフマン符号をTypeScriptで作ります。ちゃんとデコードもします。

完成品はこちら
https://github.com/kota-yata/deno-huffman

型に関しては、全てnumber型とstring型だけでどうにかします。なのでビット列は全てstring型として扱います。

# ハフマン符号って何ですか
「なめてんのかお前」って思った人は次の章に進んで大丈夫です。

ハフマン符号は戦後間もない1952年にデイビッドさんが発明した圧縮アルゴリズムです。文字の出現頻度を調べて、頻出する文字には少ないビット列を、あまり出てこない文字には長いビット列を割り当ててデータ量の削減を実現しています。ZipとかJPEGの圧縮にも使われていることでも有名ですね。

ハフマン符号の長所として、**接頭符号**であることが挙げられます。接頭符号というのは、ある符号が他の符号の最初の部分と重複しないという性質です。例えば、
|符号|文字|
| - | - |
|0|A|
|1|B|
|01|C|

という符号があった場合、Aの符号０がCの符号の最初と同じになっているので接頭符号とは言えません。これで何が困るのかというと、エンコードされたビット列の中に「01」があった場合、デコードされた文字は「AB」と「C」のどちらもあり得るのです。デコードされる文字列がエンコード前と違ったらそれはもう可逆圧縮とは言えませんね。

もう一つ、ハフマン符号が広く使われる理由として、著作権の問題がないことも挙げられます。先述の通り、ハフマン符号はかなり歴史の長いアルゴリズムなのでより効率の良いアルゴリズムもいくつかすでに発明されています。ただそのほとんどは著作権が絡んで自由に使えなかったりするので、いまだに圧縮性能としては中程度のハフマン符号が使われているわけです。

# 大まかな流れ
### エンコード
1. ハフマン符号は文字の出現頻度を元に木を作るので、まずは平文を探索して文字の出現頻度を調べます
2. 各文字の出現頻度がわかったらそれを元にハフマン木を作ります
3. ハフマン木が無事に作れたらそこから各文字に対応するビット列を算出してテーブルを作ります
4. それが終わったらもう一度平文を探索して各文字をビット列に変換していきます
5. 最後にデコード用にハフマン木そのものをエンコードしてヘッダーとしてエンコード結果と繋げ、ハフマン符号化完了になります

以上のように、エンコードの際に合計で2回平文を走査します。しかしこれではデータ量が莫大になったときに圧縮時間が長くなってしまうので、出現頻度を調べながらビット列への変換を行い、走査を1回で済ませる**動的ハフマン符号**というものも存在します。動的ハフマン符号は処理時間は短いですがハフマン木の精度は落ちることがあります。
今回は動的ハフマン符号ではなく、普通に2回走査する**静的ハフマン符号**を実装します。

### デコード
1. まずはヘッダーを読んでテーブルを再生成します
2. テーブルができたら残りのビット列を文字列に変換してデコード終了です

デコードに関してはテーブルさえ手に入れば何も苦労はないので比較的簡単に処理が終わります。

# 前提条件
よく使う型はこんな感じで定義しています。独自の型が出てきて何だこれってなったらここに戻って確認してください

```typescript
export type treeArray = [string | null, number, [treeArray, treeArray]?];
export type rebuiltTreeArray = [
  string | null,
  [rebuiltTreeArray, rebuiltTreeArray]?,
];
export type occurrenceArray = treeArray[];
export type bitsTable = [string, string][];
export interface dividedObj {
  spliced: string;
  remaining: string;
}
```

処理の中で、何回も使うものは別ファイルに関数として定義しています。
```typescript
// 文字をビット列に変換する
export const convertSymbolToBits = (symbol: string): string => {
  const bits: string = symbol.charCodeAt(0).toString(2);
  return bits;
};

// ビット列を文字に変換する
export const convertBitsToSymbol = (bits: string): string => {
  const symbol: string = String.fromCharCode(parseInt(bits, 2));
  return symbol;
};

// 第一引数の長さになるように第二引数の前に0を追加する
export const padding = (len: number, string: string): string => {
  const pre: string = "0".repeat(len);
  const result: string = (pre + string).slice(-len);
  return result;
};
```

# エンコード
お待たせしました。
今回は参考にした[このサイト](https://engineering.purdue.edu/ece264/17au/hw/HW13?alt=huffman)で使われていた「go go gophers」という文字列を例にとってエンコードとデコードをしたいと思います。

### 平文から各文字の出現頻度を調べる
まずは一度平文を走査して各文字の出現頻度を調べます。

```typescript: getOccurrence.ts
const getOccurence = (plane: string): occurrenceArray => {
  let string: string = plane;
  const occurrenceArray: occurrenceArray = new Array(0) as occurrenceArray;
  while (string.length > 0) {
    const regexString: string = string[0].replace(/[-\/\\^$*+?.()|\[\]{}]/g, "\\$&");
    const regExp = new RegExp(regexString, "g");
    const occurrence: number = (string.match(regExp) || []).length;
    const relation: treeArray = [string[0], occurrence];
    occurrenceArray.push(relation);
    string = string.replace(regExp, "");
  }
  return occurrenceArray;
};
```
ここでやっていることとしては、whileループの中で、文字列の最初を切り出し、その文字が文字列の中にどれくらい含まれているかを```string.match(regExp).length```で調べています。文字と出現回数を配列に格納したのち、文字列からその文字全てを削除し、次のループに入っています。
この関数で得られる配列は以下のような感じです。

```typescript
occurrenceArray = [
  [ "g", 3 ],
  [ "o", 3 ],
  [ " ", 2 ],
  [ "p", 1 ],
  [ "h", 1 ],
  [ "e", 1 ],
  [ "r", 1 ],
  [ "s", 1 ]
]
```

### 出現頻度の情報からハフマン木を作る
木の作り方は、まず出現頻度の低い2つの文字を葉として短い木を作ります。そして2つの文字の出現回数を足した回数と他の文字の出現回数を比べ、再び低い方から2つを使って木を作ります。最終的に僕のコードで生成された木は以下のような感じです。僕のコードで、というのはアルゴリズムによってはちょっと違う構造になることがあるからです。最終的な圧縮率は変わらないのでそんなに気にするとこではないです。
![](https://storage.googleapis.com/zenn-user-upload/vb3645r6qz3hvb62lxttip0v5pi4)


コードで木を表現する方法としては、連想配列やNodeListなどでも可能ですが、今回は多次元配列を用いて木構造を表現しようと思います。
```
[文字 or null, 出現回数, [[左の子],[右の子]]]
```
1要素目に文字が来る場合は葉なので、3要素目はありません。以下の```generateTree.ts```で木を生成します。
```typescript: generateTree.ts
const generateTree = (occurrenceArray: occurrenceArray): occurrenceArray => {
  if (occurrenceArray.length <= 1) return occurrenceArray;
  sortQuickly(occurrenceArray);
  const parsedArray: treeArray = [
    null,
    occurrenceArray[0][1] + occurrenceArray[1][1],
    [occurrenceArray[0], occurrenceArray[1]],
  ];
  occurrenceArray.splice(0, 2);
  occurrenceArray.unshift(parsedArray);
  return generateTree(occurrenceArray);
};
```
先ほど作成した出現回数の配列を書き換える形で木を作ります。
まず配列を出現頻度でソートします。
```typescript
sortQuickly(occurrenceArray);
```
ここは
```typescript
occurrenceArray.sort((a, b) => {
  return a[1].length - b[1].length;
});
```
でも構わないのですが、せっかくなのでクイックソートで書きました。趣味です。
```typescript
const partitioning = ( mda: occurrenceArray, start: number, end: number ): number => {
  const pivot: number = mda[end][1];
  let pivotIndex: number = start;
  for (let i: number = start; i < end; i++) {
    if (mda[i][1] > pivot) continue;
    [mda[i], mda[pivotIndex]] = [mda[pivotIndex], mda[i]];
    pivotIndex++;
  }
  [mda[pivotIndex], mda[end]] = [mda[end], mda[pivotIndex]];
  return pivotIndex;
};

const sortQuickly = ( mda: occurrenceArray, start: number = 0, end: number = mda.length - 1 ): void => {
  if (start >= end) return;
  const pivotIndex: number = partitioning(mda, start, end);
  sortQuickly(mda, start, pivotIndex - 1);
  sortQuickly(mda, pivotIndex + 1, end);
};
```
最初の行で1要素目が文字だった場合の条件分岐はできているのでソートされた配列の1,2要素目（=頻度の少ない方から1,2番目）をマージして新しい木構造を作ります。
```typescript
const parsedArray: treeArray = [
  null,
  occurrenceArray[0][1] + occurrenceArray[1][1], // 2つの出現回数を足す
  [occurrenceArray[0], occurrenceArray[1]], // 子要素として追加する
];
// 最初の2要素を削除して代わりに生成した木を挿入する
occurrenceArray.splice(0, 2);
occurrenceArray.unshift(parsedArray);
return generateTree(occurrenceArray); // 配列が最終的に全て木構造になるまで再帰する
```

### ハフマン木から文字とビット列の変換表を作る
```typescript:generateBitsTable.ts
const generateBitsTableFromTreeArray = ( tree: treeArray, bitsTable: bitsTable = new Array(0) as bitsTable, bit: string = "" ): bitsTable => {
  if (tree[0] !== null) {
    bitsTable.push([tree[0], bit]);
    return bitsTable;
  }
  // tree[0]がnullなのに3要素目がないということはつまり節なのに子がいないということなのでエラー
  if (!tree[2]) {
    throw new Error("You assigned wrong tree as argument");
  }
  // まずは左の子要素を探索しに行く
  const nextBitsTable: bitsTable = generateBitsTableFromTreeArray(
    tree[2][0],
    bitsTable,
    bit + "0",
  );
  // 左の子を全て探索したらそのbitsTableを受け取って右の子の探索に向かう
  return generateBitsTableFromTreeArray(tree[2][1], nextBitsTable, bit + "1");
};
```
木は完成しているのであとは文字と符号の変換表を作るだけです。具体的には木の左の枝を0、右を1として木の根から再帰的に辿っていき、1要素目が文字列=葉に行き着いたらそれまで辿った枝のビットを繋げたものを符号としてテーブルに格納します。
```typescript
if (tree[0] !== null) {
  bitsTable.push([tree[0], bit]);
  return bitsTable;
}
```
tree[0]がnullでないということは子要素がない、つまり葉なので、文字と```bit```に格納してあるこれまで辿ってきた枝のビット列を配列として変換表```bitsTable```にpushして上の節に戻ります。
```typescript
// tree[0]がnullなのに3要素目がないということはつまり節なのに子がいないということなのでエラー
if (!tree[2]) {
  throw new Error("You assigned wrong tree as argument");
}
// まずは左の子要素を探索しに行く
const nextBitsTable: bitsTable = generateBitsTableFromTreeArray(
  tree[2][0],
  bitsTable,
  bit + "0",
);
// 左の子を全て探索したらそのbitsTableを受け取って右の子の探索に向かう
return generateBitsTableFromTreeArray(tree[2][1], nextBitsTable, bit + "1");
```
コメントで大体説明していますが、左の子を奥深くまで探索したあとに変換表を引き継いで右の子の探索に移ります。これを再帰的に行うことでハフマン木から変換表の生成が可能になります。
変換表の完成形はこんな感じ。
```typescript
bitsTable = [
  [ "s", "000" ],
  [ "e", "0010" ],
  [ "r", "0011" ],
  [ "g", "01" ],
  [ "o", "10" ],
  [ "p", "1100" ],
  [ "h", "1101" ],
  [ " ", "111" ]
]
```

### 文字列をエンコードする
変換表が完成したら、もう一度文字列を走査して各文字を符号に変換していきます。
```typescript:getResult.ts
const generateResultBits = ( plane: string, bitsTable: bitsTable ): string => {
  let stringArray: string[] = [];
  let bitArray: string[] = [];
  for (let i = 0; i < bitsTable.length; i++) {
    [stringArray[i], bitArray[i]] = [bitsTable[i][0], bitsTable[i][1]];
  }
  let resultString = "";
  // 文字列配列の中で対象の文字とマッチするインデックスのビット列を結果に追加する
  for (let i = 0; i < plane.length; i++) {
    const index: number = stringArray.indexOf(plane[i]);
    resultString += bitArray[index];
  }
  return resultString;
};
```
ここでは一旦変換表```bitsTable```を文字の配列と符号の配列に分割して、文字の配列の方で```indexOf(文字)```してそのインデックスの符号を結果に追加しています。別に```bitsTable```のままでもやろうと思えばできるんでしょうがこっちの方がやりやすかったので分割してます。
エンコードされた文字列はこうなります。
```
0110111011011101101100110100100011000
```

### ハフマン木自体をエンコードする
ハフマン符号は出現頻度で符号が決まるので標準化された変換表なんてものはありません。Qiitaとかの記事を見ると、エンコードした後に変換表だけは変数に格納してそのままデコードで使うなどというチートをしている輩がいたり、そもそもデコード諦めて文字列のエンコード結果だけ出力してハフマン符号らしからぬ圧縮率を叩き出していたりする記事はあったのですがここを詳細に書いてる日本語の記事がなかったので結構困りました。最終的にアメリカの大学の講義録みたいなやつに書いてあった方法で理解しました。
https://engineering.purdue.edu/ece264/17au/hw/HW13?alt=huffman
この文献を見つけるまでは変換表を素直にビット変換する方法でヘッダーに加えていたのですが、そうすると結局エンコード前とあまり変わらなかったりして「ハフマン符号大したことなくね」とか思ってました。ごめんなさい。
```typescript:encodeTree.ts
const encodeTree = ( huffmanTree: treeArray, resultString: string = "" ): string => {
  if (huffmanTree[0] !== null) {
    const symbolBits: string = convertSymbolToBits(huffmanTree[0]);
    return resultString += `1${padding(8, symbolBits)}`;
  }
  resultString += "0";
  if (!huffmanTree[2]) throw new Error("You assigned wrong array...");
  const resultLeft: string = encodeTree(huffmanTree[2][0], resultString);
  return encodeTree(huffmanTree[2][1], resultLeft);
};
```
具体的な方法としては、ハフマン木から変換表を作った時と同様に根から深さ優先探索で左の子から探索し、葉に着いたらそれまでのビットと文字を結果に追加します。
注意したいのは、この場合探索時に貯めておくビットは枝の値ではなく節の値です。探索している子が節だった場合は0、葉に当たった場合は1を追加しその直後に該当する文字8bits分を追加します。こうすることで1が来たらその後8bitsは文字であることがわかるので、接頭辞なしでデコード時にハフマン木を再構築できるというわけです。

### ヘッダーとエンコードされた文字列を合体して完成
先ほど2回目の走査でエンコードしたビット列と上でエンコードしたハフマン木をつなげたものが出力結果になります。ただ、このままだとどこまでがヘッダーなのかの区切りが分からないので、一番最初にエンコードしたハフマン木の長さを16bitsで入れておきます。
さっきの大学の文献を見るとこの情報は入れず、別のエンコード方法で区別できるようにしてるっぽいのですがいまいちそこが理解できませんでした。区切りの判別が16bits以内でできるのであれば微々たるものですが圧縮率も上がるので方法が分かる方は教えていただけると嬉しいです。
```typescript:encode.ts
const encodedTree: string = encodeTree(huffmanTree);
const encodedTreeLength: string = getEncodedTreeLength(encodedTree);
const result: string = generateResultBits(plane, bitsTable);
return encodedTreeLength + encodedTree + result;
```
```typescript:encodeTree.ts
const getEncodedTreeLength = (encodedTree: string): string => {
  const lengthNumber: number = encodedTree.length;
  const lengthBits: string = padding(16, lengthNumber.toString(2));
  return lengthBits;
};
```
##### 出力結果
```
000000000100111100010111001101011001011011100101011001110101101111001011100001011010001001000000110111011011101101100110100100011000
```

# デコード
デコードはエンコード結果の解析作業みたいなものなので特に引っかかる点はありませんでした。
デコードの中で文字列を切り分ける作業が多かったので以下の関数を定義しました。
```typescript
// 刻みたい文字列と刻みたい位置を引数にとって刻んだ方(spliced)と刻みカス(remaining)をオブジェクトで返す
const spliceString = (string: string, divisionNumber: number): dividedObj => {
  const spliced: string = string.slice(0, divisionNumber);
  const remaining: string = string.slice(divisionNumber);
  return { spliced, remaining };
};
```

### ヘッダーを読む
```typescript
// 最初の16bitsはヘッダーの長さなので切り分けて10進数化する
const headerBits: dividedObj = spliceString(encodeResult, 16);
const headerLength: number = parseInt(headerBits.spliced, 2);
// 10進数化した長さの分だけ残りの文字列を切り分けヘッダーと平文のエンコード結果を分割する
// treeAndContents.splicedがヘッダーでtreeAndContents.remainingが平文のエンコード結果
const treeAndContents: dividedObj = spliceString( headerBits.remaining, headerLength );
```

### ハフマン木を再構築する
```typescript
const rebuildHuffmanTree = ( bits: string, resultArray: rebuiltTreeArray ): string => {
  if (bits === "") return bits;
  const firstBits: string = bits.slice(0, 1);
  bits = bits.slice(1);
  if (firstBits === "1") {
    const symbolBits: string = bits.slice(0, 8);
    bits = bits.slice(8);
    const symbol: string = convertBitsToSymbol(symbolBits);
    resultArray[0] = symbol;
    return bits;
  }
  resultArray.push([[null], [null]]);
  if (!resultArray[1]) throw new Error("resultArray has no index 1");
  const result: string = rebuildHuffmanTree( bits, resultArray[1][0] );
  return rebuildHuffmanTree(result, resultArray[1][1]);
};
// 使い方
const rebuiltTree: rebuiltTreeArray = [null];
rebuildHuffmanTree(treeAndContents.spliced, rebuiltTree);
```
第一引数の```bits```には先ほど分割したヘッダーの方を渡し、あらかじめ```[ null ]```を代入した```rebuiltTreeArray```型の配列を第二引数にとります。
ヘッダーを1文字ずつ読み、1だったらその後の8bitsを文字に変換して木の1要素目に追加し、0だったら1要素目はすでに```null```が入っているので二要素目に左と右の子を準備し、左から先に再帰的に探索を行います。
この関数では返り値を残りのビット列にすることで末尾の再帰を実現しているので先に配列を作る必要があるのですが、普通に配列返すやり方にできそうなことに今書いてて気づきました。ちょっと再考の余地ありですね。なんでこんな変態みたいな仕様にしたんだろ。
とにかく、上の処理でエンコード時に一度作ったハフマン木の再構築が完了します。

### ハフマン木から変換表を作る
ここはエンコード時とほぼ同じで、違いは引数にとる木に出現回数の値がないというだけです。

```typescript:generateBitsTable.ts
const generateBitsTableFromRebuiltTreeArray = ( tree: rebuiltTreeArray, bitsTable: bitsTable = new Array(0) as bitsTable, bit: string = "" ): bitsTable => {
  if (tree[0] !== null) {
    bitsTable.push([tree[0], bit]);
    return bitsTable;
  }
  // 出現回数がないので子要素が格納されるインデックスは1になる
  if (!tree[1]) {
    throw new Error("You assigned wrong tree as argument");
  }
  const nextBitsTable: bitsTable = generateBitsTableFromRebuiltTreeArray(tree[1][0], bitsTable, bit + "0");
  return generateBitsTableFromRebuiltTreeArray(tree[1][1], nextBitsTable, bit + "1");
};
```
この場面で出現回数は全く必要ないのでエンコード時のハフマン木から出現回数の値を取り除けば上と全く同じ関数がエンコードにも使えます。

### ビット列をデコードする
ヘッダーを読む際にヘッダーと平文のエンコード結果の切り分けが完了し、変換表もできたのであとはエンコード結果を元の平文に戻す作業だけです。
```typescript
const parseBits = (bits: string, bitsTable: bitsTable): string => {
  bitsTable.sort((a, b) => {
    return a[1].length - b[1].length;
  });
  let result: string = "";
  let queueString: string = "";
  let remainingBits: string = bits;
  while (remainingBits !== "") {
    queueString += remainingBits[0];
    remainingBits = remainingBits.slice(1);
    for (let i = 0; i < bitsTable.length; i++) {
      if (queueString.length < bitsTable[i][1].length) break;
      if (queueString.length > bitsTable[i][1].length) continue;
      if (queueString === bitsTable[i][1]) {
        result += bitsTable[i][0];
        queueString = "";
        break;
      }
    }
  }
  return result;
};
```
なぜ今まで再帰で書いていたのに突然ループにするかというと、30000文字くらいのデータで試したところこの部分は流石にスタックオーバーフローしたからです。まあJavaScriptですし仕方ないと言えば仕方ないですね。
この部分、エンコード時と同じように```bitsTable```を文字列の配列とビット列の配列に分割する方法もあるのですが、ビット列を最初から最後まで走査するわけで、indexOfで愚直に探索していては処理が遅くなるわけです（indexOfの中身は普通に線形探索）。それを避けるために、上のコードでは最初にビット列の長さでソートし、キューのビット列の長さと等しい部分でのみ値を比較することでちょっとでも速くしようと試みています。多分意味ある。
```typescript
// 昇順ソート
bitsTable.sort((a, b) => {
  return a[1].length - b[1].length;
});
```
ここはエンコード時のようにクイックソートにしても良し。
```typescript
while (remainingBits !== "") {
  // 最初のビットをキューのビット列に追加
  queueString += remainingBits[0];
  // ビット列から最初の文字を削除する
  remainingBits = remainingBits.slice(1);
  ...
}
```
残りのビットが空でない場合、キューに最初のビットを追加します。remainingBitsは関数内で共通なのでここを減らしていけばwhileループは勝手に判断してくれます。
```typescript
for (let i = 0; i < bitsTable.length; i++) {
  if (queueString.length < bitsTable[i][1].length) break; // これ以上探索しても符号の長さが長いものとしか当たらないのでループを抜ける
  if (queueString.length > bitsTable[i][1].length) continue; // まだ長さがたりてないので次のループにスキップ
  if (queueString === bitsTable[i][1]) { // 一致!!
    result += bitsTable[i][0];
    queueString = "";
    break;
  }
}
```
キューの文字数よりイテレート中の変換表の符号の長さが長い場合は、ソート済みなのでこれ以上探索しても意味がないため親のwhileループに戻ります。変換表の符号の長さが短い場合はまだキューの文字列と等しい符号たちにたどり着いていないだけなので```continue```で次のループにスキップします。
キューの文字数よりイテレート中の変換表の符号の長さが等しい場合のみ互いの値を比較し、晴れて一致した場合は結果に変換表の文字を追加し、キューをクリアして親のwhileループに戻ります。
最終的にwhileループから抜ける際の```result```には「go go gophers」が格納されているはずです。

# 圧縮の結果
以下が「go go gophers」をハフマン符号化した際の結果です。
![image](https://storage.googleapis.com/zenn-user-upload/xljbq6dbmsh30kvzr4jjsqvuujzq)
お分かりいただけただろうか。全然successfullじゃありませんね。
「go go gophers」のような短い文字列の場合、ヘッダーがオーバーヘッドになってむしろエンコード後のサイズの方が大きくなることがあります。実際にこんな短い文字列を圧縮することはないので気にしなくても良いと思いますがサイズが大きくなったら元のデータを返すみたいな処理を加えておいても良さげです。

ちなみにかの有名な「Lorem ipsum...」のテキストをエンコードした結果は以下の通りです。
![image](https://storage.googleapis.com/zenn-user-upload/0s923xjodsxkxlu9k0vbk6e4rd6y)
文字数は450文字くらいですが、60%なのでまあまあ良いんじゃないでしょうか。

# おわりに
Macの予測変換でハフマン木が全然出てこなくて辛かったです。
Qiitaにはゴミ箱のような記事を上げてますがZennは真面目に書きたいので間違っている点やベストプラクティスでない実装があればコメントで教えていただければ幸いです。
では

# 参考文献
##### デイビッド兄貴が書いた論文
https://ieeexplore.ieee.org/document/4051119
##### purdue大学の文献
https://engineering.purdue.edu/ece264/17au/hw/HW13?alt=huffman
##### すごくわかりやすかった日本語文献（Algoful）
https://algoful.com/Archive/Algorithm/HaffmanEncoding
##### UUUM攻殻機動隊
https://system.blog.uuum.jp/entry/2016/03/01/110000
