---
title: SvelteでFullCalendarを使う
date: 2020-09-23
category: Programming
description: 今後Svelteの人気が上昇することを願って
ogp: /media/fullcalendar.webp
---

そもそもSvelteって何なんという方は[こちら](https://zenn.dev/toshitoma/articles/what-is-svelte)を見ていただければ大体わかると思います。

JavaScriptでは割と定番な(はず)のカレンダーライブラリ、[FullCalendar](https://fullcalendar.io/)。今年7月にv5もリリースされてコミュニティも活発なんですが、なぜかSvelteに対応していないという体たらく。
というわけで今回はNuxtより早いとか噂されておいて日本で全く知名度の上がらないSvelteでFull Calendarを使う方法をお伝えします。

### サードパーティーのライブラリはあります。普通に
さも1からSvelteに対応させますみたいなタイトルですが、[Svelte用のFullCalendarライブラリ](https://github.com/YogliB/svelte-fullcalendar)はだいぶ前からあります。ただ、僕の観測範囲で日本語の文献(というか英語の文献も)が全く見当たらず、エラーが出たらGitHubで直接Issueを投げる以外の解決策がなかったので、これからSvelteでカレンダー機能を使いそうな人のために備忘録を残しておくまでです。

### 開発環境
開発環境で何かが変わるわけではありませんが一応。
- Mac OS BS 11.0 Beta
- VSCode Version: 1.49.1
- Google Chrome 85.0.4183.121（Official Build）
- ビルドツール : Rollup (WebPackの場合は参考にならないかも)

# 1章 環境構築
仰々しく1章とか書きましたが2章までしかないので安心してください。
### yarn addしていく

```
yarn add svelte-fullcalendar
```

まずはベースのモジュールを追加します。ただこれだけではクソも動かないのでカレンダーを表示するためのモジュールを追加していきます。

```
yarn add @fullcalendar/common @fullcalendar/core @fullcalendar/daygrid @fullcalendar/interaction
```

各パッケージについて説明します。
- @fullcalendar/common ... このパッケージを追加しないと実質的に動作しません。
- @fullcalendar/core ... このパッケージはベースとなるCSS、ローカライゼーションの際などに必要になります
- @fullcalendar/daygrid ... 名前でわかると思いますがdaygridのパッケージです。[リストビュー](https://fullcalendar.io/docs/list-view)や[タイムグリッド](https://fullcalendar.io/docs/timegrid-view)を使いたい場合は各々追加する必要があります。
- @fullcalendar/interaction ... このパッケージはクリックイベントなどイベントハンドラーを動作させるために必要です。

svelte-fullcalendar以外のパッケージは純正のFullCalendarと同じものを追加するだけなのでハマることはなさそうですね。ハマったらごめんなさい

### rollup.config.jsの変更
rollup.config.jsに以下を追加します。

```js
...
...
export default {
...
  resolve({
    browser: true,
    dedupe: ['svelte', '@fullcalendar/common'],
  }),
}
```

この解決策に辿り着くまで5時間くらい半ベソかきながらググってたのでこれは忘れずに追加してください。答えが見つかったissueが[こちら](https://github.com/fullcalendar/fullcalendar/issues/5592#issuecomment-687671621)

# 2章 コードを書いていく
環境構築ができたらあとはコードをカキカキするだけ。カレンダーだけでComponentに分けてもよし、そんな女々しいことはせずApp.svelteに直書きする暴挙に出てもよし。

#### モジュールをimportしていく
```js
import FullCalendar from 'svelte-fullcalendar';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocal from '@fullcalendar/core/locales/ja';
```
日本語対応する必要がなければjaLocalは必要ない。

#### CSSをimportしていく
```js
import '@fullcalendar/core/main.min.css';
import '@fullcalendar/daygrid/main.min.css';
```
上のCSSを追加しないとレイアウト崩れます。下はdaygrid使う場合のみ。

#### オプションを定義する
```js
const options = {
  droppable: true,
  editable: true,
  initialView: 'dayGridMonth',
  headerToolbar: { left: 'prevYear,prev,next,nextYear', center: 'title', right: 'today' },
  locale: jaLocal,
  buttonText: { today: '今月に戻る' },
  plugins: [dayGridPlugin, interactionPlugin],
  dateClick: (event) => handleDateClick(event),
};
// ドラッグイベントなどdateClick以外のJSイベントも普通に動きます
const handleDateClick = (event) => {
  console.log(event);
};
```

ここは純正のFullCalendarのオプション表記とほぼ同じです。buttonText,initialViewなどv5で表現の変更されたフラッグもありますのでご注意ください。

[FullCalendar v5 Release Notes](https://fullcalendar.io/docs/upgrading-from-v4)

#### 表示するだけ
```html
<div class="Calendar">
  <FullCalendar {options} />
</div>
```
もちろん```options = {options}```と表記しても構いません。

## 動作確認
```
yarn run dev
```
![](https://storage.googleapis.com/zenn-user-upload/5s7cvv3bg4rgtc03jzwdte5y9crm)

適当な日付をクリックすると...

![](https://storage.googleapis.com/zenn-user-upload/u35t0wcn58zw0opsvnb5xaw6xit3)

よき。

# 終わりに
svelte-fullcalendarのリポジトリにサンプルも用意されていますのでそちらも参考になるかと思います。

[svelte-fullcalendar/examples/svelte](https://www.dropbox.com/s/xtzcyry80hhmbcc/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202020-09-24%200.04.30.png?dl=0)

まだまだ資料が少なくとっつきにくいSvelteですが、体感できるほどには高速なので一度試してると良いと思います。GitHubのIssueも飽和状態というわけではないので数日以内に返信来ると思います。

##### 参考
[svelte-fullcalendar](https://github.com/YogliB/svelte-fullcalendar)
[svelte-fullcalendarがWeb上で試せるやつ](https://svelte.dev/repl/afa33232d6914c5f9fd25e332e167a7c?version=3.12.1)
[唯一見つけた英語のsvelte-fullcalendarの記事](https://www.creative-tim.com/learning-lab/svelte/fullcalendar/argon-dashboard)