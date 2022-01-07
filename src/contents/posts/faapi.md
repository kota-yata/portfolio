---
title: ブラウザからローカルフォントを取得する
date: 2020-11-25
category: Programming
description: Font Access APIでローカルにアクセス
ogp: /ogp.webp
---

Chrome87よりブラウザ上でインストール済みのフォントを調べるFont Access APIがOrigin Trialsに公開されました。正直このAPIで何か作ろうとは思っていませんが、このAPIを欲するいつの日かのために少し調べたので書き残しておきます。
<div class="message">
先述の通りこのAPIはChrome87~以外の環境下では動作しません。本番環境で使って怒られても知りません
</div>

# Quick Start
## Origin Trialsでトークンを取得する
Origin Trialsを利用したことがある方は飛ばして大丈夫です。
まずは[Chrome FlagsのFont Access API](chrome://flags/#font-access)をenableに変更します。その後[Origin TrialsページのLocal Font Access](https://developers.chrome.com/origintrials/#/view_trial/-7289075996899147775)をRegisterします。するとトークンが発行されますので
```html
<meta http-equiv="origin-trial" content="ここにトークンを貼る">
```
このmetaタグをソースコードに挿入します。

## APIが使えるかどうか
まずこのAPIが使用できるかどうかを確認しておきましょう。
```javascript
if(!'fonts' in navigator) return;
const status = await navigator.permissions.query({ name: "font-access" });
  if (status.state === "granted")
    console.log("permission was granted 👍");
  else if (status.state === "prompt")
    console.log("permission will be requested");
  else
    console.log("permission was denied 👎");
```
Chrome87以上であれば問題ありませんがそうでないブラウザの場合は他の処理で代用するしかないでしょう。

## フォントオブジェクトを取得する
```javascript
const iterableFontObject = navigator.fonts.query();
```
この変数には非同期イテレータ([Asynchronous Iterator](https://ja.javascript.info/async-iterators-generators))が代入されます。つまり```for await of```でイテレート処理ができるわけです。

## メタデータを取得する
```javascript
for await (const metadata of iterableFontObject) {
  const fontFamily = metadata.family; // e.g.ComicSansMS
  const postscriptName = metadata.postscriptName; // e.g.Comic Sans MS
  const fullName = metadata.fullName; // e.g.Comic Sans MS
  console.log(fontFamily, postscriptName, fullName);
}
```
現状文字列として取得できるデータはこの3つのようです。postscriptNameは確実にユニークで、OpenTypeフォーマットでなくてもUserAgentがよしなに導出してくれるようです。
非同期イテレータは```Object.keys().length```ではフォント数の算出はできないので、イテレートついでに数えておくのが一番手っ取り早いかと。

# SFNTデータにアクセスする
```blob()```メソッドを使用すればsfntにフルアクセスすることが可能です。sfntデータにアクセスして何が嬉しいのかというとフォントのフォーマット、PostScript, TrueType, OpenType, WOFFなどが得られるというわけです。これに関してはまじで使い道が分からん。とりあえず実装していきます。
## SFNTバージョンを取得する
```javascript
const fonts = navigator.fonts.query();
for await (const metadata of fonts) {
  const sfnt = await metadata.blob();
  const sfntVersion = (new TextDecoder).decode(
    await sfnt.slice(0, 4).arrayBuffer()
  );
}
```
```blob()```メソッドでBlob型のバイナリーデータを取得します。どうやらこのデータをデコードして、最初の4バイトを取得するとSFNTバージョンを取得できるらしいです。すげー。詳しくは[MSの仕様書](https://docs.microsoft.com/en-us/typography/opentype/spec/otff#organization-of-an-opentype-font)をご覧ください。

ただこのままではなんのデータか分からないので拡張子形式に変換していきましょう。
```javascript
for await (const metadata of fonts) {
  let outlineFormat = 'UNKNOWN';
  switch (sfntVersion) {
    case '\x00\x01\x00\x00':
    case 'true':
    case 'typ1':
      outlineFormat = '.ttf';
      break;
    case 'OTTO':
      outlineFormat = '.cff';
      break;
  }
  console.log('Format Extension:', outlineFormat, metadata.family);
}
```
現在AppleでサポートされているフォントはTrueType(.ttf)かPostscript(.cff)のどちらかなので、それに合わせてSFNTバージョンを絞っていきます。これまじで何に使うんだろうか。

# セキュリティの懸念と対策
最近[File System Access API](https://zenn.dev/kota_yata/articles/6baecf59f0b3a39ea5a6)などローカルのシステムにアクセスするAPIが増えていますが、やはり怖いのはセキュリティです。
## フィンガープリント対策
Font Access APIは取得したフォントをアルファベット順にソートして返します。これは、システムにインストールされた順番のままフォントのリストを返してしまうと、フィンガープリントに利用され、ユーザーの識別に使われる可能性が高いからです。数百のフォントを全く同じ順番でインストールする複数のユーザーなどそういないですからね。
## リクエストシステム
最初の方のパーミッションリクエストの部分がこれです。メタタグを使用してリクエストを送信しない限り使用できないようにすることでAPIの濫用を防いでいます。
https://chromium.googlesource.com/chromium/src/+/lkgr/docs/security/permissions-for-powerful-web-platform-features.md

(この記事でも先述のFile System Access APIがケーススタディとして紹介されています)
ただ、最初にメタタグなしでパーミッション確認もなしで実行してみたところ普通に動いてしまったので、筆者も???となっているところです。
## ユーザーの実行動作
実はこのAPIは今までのコードを非同期即時関数に入れただけでは動きません。ロードしたら自動的に動作することを許可すると大抵良いことはないので、ボタンをクリックする、何かのキーを打つなどユーザーが自ら実行することでしか動かないような仕様になっています。(e.g.```~.addEventListner()```)
## 確認ダイアログの表示
このAPIを実行する動作をユーザーが行うと、
![dialog](https://storage.googleapis.com/zenn-user-upload/m5dz76ntrrdeq4zio8x31iyt8xao)
このダイアログが表示されます。これは他のローカルにアクセスするAPIでも同様の仕様のものが多いです。

# デモとソースコード
ChromeのWebDevチームがGlitchにデモサイトとコードを公開しています。

https://local-font-access.glitch.me/demo/

ほぼ似たようなものですが僕の書いたソースコードも投げておきます。

#### Quick Startの方
```javascript
const AccessFont = async () => {
  const status = await navigator.permissions.query({ name: "font-access" });
  if (status.state === "granted"){
    console.log("permission was granted 👍");
  } else if (status.state === "prompt") {
    console.log("permission will be requested");
  } else {
    console.log("permission was denied 👎");
  }
  const iterableFontObject = navigator.fonts.query();
  let total = 0;
  for await (const metadata of iterableFontObject) {
    console.log(metadata.fullName);
    total++;
  }
  console.log(`Total number of local fonts : ${total}`);
}
const button = document.getElementById("test");
button.addEventListener("click", AccessFont); // ユーザーの動作がないと動かせない
```
#### SFNTアクセスの方
```javascript
const AccessSFNT = async () => {
  const fonts = navigator.fonts.query();
  for await (const metadata of fonts) {
    const sfnt = await metadata.blob();
    const sfntVersion = (new TextDecoder).decode(
      await sfnt.slice(0, 4).arrayBuffer()
    );
    let outlineFormat = 'UNKNOWN';
    switch (sfntVersion) {
      case '\x00\x01\x00\x00':
      case 'true':
      case 'typ1':
        outlineFormat = '.ttf';
	break;
      case 'OTTO':
        outlineFormat = '.cff';
        break;
    }
    console.log('Format Extension:', outlineFormat, metadata.family);
  }
}
const access = document.getElementById("access");
access.addEventListener("click", AccessSFNT); // ユーザーの動作がないと動かせない
```

# 終わりに
最初に記事を書いたときは本気で何に使うのか分からないAPIでしたが、どうやらFigmaとかその他デザインアプリケーション、CADに特化したフォントをWebで使う際に役立つようです。

> Bringing design apps like Figma, Gravit, and Photopea, to the web is great.
> For example, corporate logo fonts, or specialized fonts for CAD and other design applications.

https://developers.google.com/web/updates/2020/11/nic87#font-access

### 参考文献
[WICG仕様書](https://wicg.github.io/local-font-access/#current-language)

[Web.devチームブログ(最初に読むならこれ)](https://web.dev/local-fonts/)

[Web.devチームGlitchデモ](https://glitch.com/~local-font-access)

[Chrome87の新機能まとめ(公式)](https://developers.google.com/web/updates/2020/11/nic87)

[Chrome Platform Status](https://www.chromestatus.com/feature/6234451761692672)

[APIのパーミッションに関するChromeの文献](https://chromium.googlesource.com/chromium/src/+/lkgr/docs/security/permissions-for-powerful-web-platform-features.md)

https://nixeneko.hatenablog.com/entry/2018/06/20/000000
