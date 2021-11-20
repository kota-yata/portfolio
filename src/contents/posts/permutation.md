---
title: 久々に順列列挙アルゴリズムを書いた
date: 2021-03-30
category: アルゴリズム
description: Percomのリファクタリングと末尾呼び出し最適化の話
ogp: /ogp.jpeg
---

去年の夏頃に趣味で作った[Percom](https://github.com/kota-yata/Percom)なる、順列と組み合わせ列挙をやってくれるnpmパッケージを久々にリファクタリングした時の記録です。Node.js使ってて「順列/組み合わせ列挙してぇなぁ」とか思ったことないのでしばらく前にリポジトリ見てUsed by 5になってた時は不思議な気分でした。

![謎のユーザーたち](https://user-images.githubusercontent.com/51294895/113145292-3a2a3c80-9269-11eb-9df4-9d5f74f92f57.png)

今までのアルゴリズムはほぼQiitaのコピペみたいなもんで、パッケージ作者が書いてないアルゴリズム使うのは流石によくないだろと思ったので書き換えることにしました。なぜ書けもしないパッケージを作ろうとしたのかは謎です。

前の順列列挙のアルゴリズムがこちら

```js
const per = (array, num) => {
  const result = [];
  if (array.length < num) return [];
  if (num === 1) {
      for (let i = 0; i < array.length; i++) {
          result[i] = [array[i]];
      }
  } else {
      for (let i = 0; i < array.length; i++) {
          const parts = array.slice(0);
          parts.splice(i, 1)[0];
          const row = per(parts, num - 1);
          for (let j = 0; j < row.length; j++) {
              result.push([array[i]].concat(row[j]));
          }
      }
  }
  return result;
};
```

まあQiitaに書くくらいなので悪くはないと思いますが、ネスト深いしこの関数だけで完結させていて引数のエラーハンドリングとかしてないので普通に書き直しがいはありそう。

## 書いていく
もう一つ悲しいお知らせをすると、組み合わせ列挙の方もほぼQiitaのコピペなんですよね。しばくぞ。

組み合わせの方はまた今度書き直すとして順列の方をどうにか効率的にできないかと考えていたのですが、組み合わせとかと比べるとひたすら列挙していく感じが強いのでよっぽどひどい実装しない限り速度はそこまで変わらないのでは、という気づきを経て、思いついたものをよく考えずに書くことにしました。

```js
const filterArray = (array, index) => {
  const newArray = array.filter((_, i) => i !== index);
  return newArray;
};

const calcPer = (array, num, current = [], result = []) => {
  if (current.length >= num) return null;
  let tempCurrent = current.slice(0, current.length);
  for (let i = 0; i < array.length; i++) {
    tempCurrent.push(array[i]);
    const slicedArray = filterArray(array, i);
    const returned = calcPer(slicedArray, num, tempCurrent, result);
    if (returned === null) result.push(tempCurrent);
    tempCurrent = current.slice(0, current.length);
  }
  return result;
};

const per = (array, num) => {
  if (array.length < num) throw new Error('Number of elements of array must be greater than number to choose');
  const result = calcPer(array, num);
  return result;
};
```
速度は置いといて、個人的には割と可読性の高いコードが書けたんじゃないかなと思ってます。実際に再帰的に演算をする関数と、エラーハンドリングだけ先にするメインの関数に分けて、条件分岐を減らしてネストも浅くしたので割と満足しています。詰まった点としては、配列を代入すると参照渡しになるというJavaScriptの仕様を知らずに```tempCurrent```に引数```current```を代入して訳分からん返り値をゲットしてたところくらいです。まあただハマったおかげで配列操作のどの関数が破壊的でどの関数が非破壊的なのかの区別もついたしJavaScript力も上がったので全然無駄ではなかった。

一つ気になっている点として、例外処理の返り値に```null```を使うのが適切なのかどうかは疑問です。文字列で返すのも気持ち悪いので```null```にしてますが、```returned```に値が入らなかった時に```undefined```が入るだろうという僕の認識が間違っていた場合バグの温床になるので少し怖いです。

## JSにおけるTail Call Optimization (おまけ)
アルゴリズム考える段階でJavaScriptにおける[末尾呼び出し最適化(Tail Call Optimization)](https://qiita.com/badpingpong/items/6b5035ab80850ae88a0a)(以下TCO)についてちょっと調べてたところ、SafariでしかTCOが実装されてないことに気づきました。なんでだろと思って色々調べていると、Stack Overflowにこんな記事が。
https://stackoverflow.com/questions/54719548/tail-call-optimization-implementation-in-javascript-engines

どうやら、TC39のミーティングで分裂が起きていて、一時はES6に実装され、ChromeもOrigin TrialsでTCOを実装していたにも関わらずEdgeチームはWindows ABI云々、Mozillaはなんだか分からんがES6策定時の議論を掘り返して反対し、最終的にはChromeもUnshippingしてしまったという経緯があったらしい。他の記事でBabelはトランスパイル時にTCOしてくれると知ってBabel使ったるわいと思っていたのですが、Babelもver.6で無効にされたらしく、現在のJavaScript環境ではTCOはされていないと認識した方が良さそうでした。Babelが無効にした経緯とかTC39で議論が起きた細かい理由とかは調べていませんが、特にTCOを実装することでスループットに逆効果とかそういう問題がないのであれば実装して欲しい感が強いですね。速度には期待していませんが現実的な範囲でスタックオーバーフローが出ることが多いのでもうちょっと耐えてくれよと思うことは多いです。

## おわりに
次に暇な日ができたら組み合わせ列挙の方も書き直したいと思います。あとTypeScript移行とかもやりたい
