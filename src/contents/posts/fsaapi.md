---
title: ブラウザでファイルの上書き保存ができるぞぉぉ
date: 2020-11-07
category: プログラミング
description: File System Access APIを使ってみる
ogp: /ogp.jpeg
---

<div class="message">
ほとんどのChromiumベースブラウザではこのAPIを使うことができますが、Braveではセキュリティの懸念より利用できない状態になっています。畜生め
</div>

↑ https://github.com/brave/brave-browser/issues/11407

以前までChromeのOrigin TrialsにNative File System APIとして実装されていたローカルファイルへアクセスするAPIが、ついにChrome86から標準機能として搭載され、名前も実装もだいぶ変わっていたので記事に残しておきます。

[Can I Use](https://caniuse.com/?search=file%20system%20access%20api)を確認した上での実装をお勧めします

# File System Access API
File System Access APIは主にローカルファイルの読み取り、書き取りを目的としたAPIです。実はファイルだけでなくフォルダの読み取り/書き取りもできますが、今回はファイルの読み取り/書き取りの方法を紹介します。

## ファイルを読み取る
これまでローカルファイルを読み取るには[この記事](https://www.html5rocks.com/ja/tutorials/file/dndfiles//)みたいに自分でHTMLタグを足したり、ファイル内容を切ったり貼ったりする必要があり、かなり面倒くさい実装が不可欠でした。
一方File System Access APIではたった３行で読み込みが完了します。

```javascript
[fileHandle] = await window.showOpenFilePicker();
const file = await fileHandle.getFile();
const fileContents = await file.text();
```

このfileContentsをtextareaに代入すれば手軽にファイルの読み取りが完了します。
#### 読み取りオプション
１行目の```showOpenFilePicker```は引数でオプションの設定も可能です。

```javascript
// 複数ファイルの選択を可能にする
[fileHandle] = await window.showOpenFilePicker({multiple: true});
// 複数ファイルの選択を不可能にする
[fileHandle] = await window.showOpenFilePicker({multiple: false});
```
[参考](https://wicg.github.io/file-system-access/#api-showopenfilepicker)

#### fileHandleの中身

```javascript
{
  lastModified: 1587625257478 // ファイル最終更新日時(UNIXタイム)
  lastModifiedDate: Thu Apr 23 2020 16:00:57 GMT+0900 (日本標準時) {} // ファイル最終更新日時
  name: "sample.pdf" // ファイル名
  size: 85488 // ファイルサイズ (単位はバイト)
  type: "application/pdf" // ファイルタイプ （記述のない場合もある）
  webkitRelativePath: "" // フォルダを選択した際に内部のファイル数などを表示できる
}
```

## ファイルに書き込む
従来のブラウザではそもそも上書きすることが不可能だったのですが、こちらもFile System Access APIでは簡単に書けちゃうんです。

```javascript
const writable = await fileHandle.createWritable();
await writable.write(contents/*⇦書き込む内容*/);
await writable.close();
```

さっきファイル情報を代入した```fileHandle```にcreateWritableメソッドで[FileSystemWritableFileStream](https://wicg.github.io/file-system-access/#api-filesystemwritablefilestream)オブジェクトを呼び出します。その後書き込んで、終了するだけ。非常に簡潔な仕様です。

この時ブラウザでは
![image](https://user-images.githubusercontent.com/51294895/98450827-64c50d00-2183-11eb-8d55-e9eb95bcf73d.png)
こんな感じのダイアログが表示され、「変更を保存」ボタンを押すとローカルファイルの上書きが完了します

これ以降、新たなファイルを読み込むかリロードや手動でfileHandleをリセットするまでは上書き処理を行うと自動でこのファイルが上書きされます。便利な反面、実装を間違えると取り返しのつかないことになりますのでご注意ください。

## その他の機能
FileSystemAccess APIは基本は読み取り/書き込みのみですが、深掘りしていけば色々応用できそうです。[Chromeのブログ](https://web.dev/file-system-access/)にはBlob型（画像や音声を取り扱える）の読み取りと書き込みをHTTPリクエストで可能にする方法も少し書いてあるので興味のある方は見てみてください。他にも上書きするファイルを再度ファイルピッカーを起動して選ぶ方法もあったりします。

# おわりに
このAPIはこれまで試験的機能だったこともあってまだ枯れていない段階です。実際、[ドラッグ&ドロップ機能](https://wicg.github.io/file-system-access/#drag-and-drop)なども実装はされていますが問題も多く議論が行われている最中です。

APIの性質上セキュリティがおざなりになるとChromeの脆弱性になり得るので議論中の機能は使うべきではありませんが、今後の動向には注目していきたいです。

# 参考文献
WICG仕様書...https://wicg.github.io/file-system-access/
WebDevチームブログ...https://web.dev/file-system-access/

