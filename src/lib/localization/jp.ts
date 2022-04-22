import type { localization } from '$lib/localization/type';
export const JP: localization = {
  ipfs: '分散型ネットワークである<a href="https://ipfs.io/">IPFS</a>でこのサイトが閲覧可能になりました！ => ipns://kota-yata.com',
  profile: {
    name: '八谷航太',
    bio: '18yo / ソフトウェア開発者'
  },
  topics: [
    {
      category: 'Decentralized',
      description:
        '現在僕はブロックチェーン、特にDHTについてリサーチをしています。高校の卒研も「分散型フリマの提案」なるテーマで研究をしており、ブロックチェーンやP2Pネットワーク、非中央集権型システムに関わる技術のリサーチ記事を研究カテゴリとしてまとめています。体系化する前段階のメモはScrapboxに置いてあります。'
    },
    {
      category: 'Algorithm',
      description:
        '既存のアルゴリズム実装や自作のライブラリで使うアルゴリズムなどに関する記事はここにまとめています。ほとんどの記事内の実装はGitHubに上がってると思うので改善点や指摘がある場合はそっちでIssueを立ててもらえればなるはやで確認します。'
    },
    {
      category: 'Cryptography',
      description:
        '暗号学に関する記事はここにまとめています。暗号に関する記事でもアルゴリズムを実装しているものはアルゴリズムカテゴリーにあり、研究カテゴリーに置かれてる場合もがあります。'
    },
    {
      category: 'Computer Science',
      description:
        '上記のどのカテゴリーにも引っかからない計算機科学分野の記事はここにまとめています。プロセッサーやネットワークに関する記事がメインになる予定です。'
    },
    {
      category: 'Programming',
      description:
        'Webアプリの実装やAPIに関する記事はここにまとめています。一時期ChromeのProject Fuguを追ってた時期があり、その時に書いた記事も何個かZennから移行しています。'
    },
    {
      category: 'Non-Tech',
      description:
        'プログラミングやコンピューターサイエンスに直接関係のない記事はここにまとめています。哲学とかの話も体系化できるようになったら書いていきたいな。'
    }
  ],
  works: {
    th: {
      lang: '言語',
      date: '日付',
      note: '情報'
    },
    body: [
      {
        name: 'Algorithm Implementation',
        color: '#EA34B7',
        contents: [
          {
            title: 'Base64',
            github: 'ky_base64',
            lang: 'TypeScript',
            date: '2021年8月',
            note: 'UTF-8対応のBase64エンコーダー&デコーダーの実装',
            articles: [
              { text: '実装記事', url: '/posts/base64' }
            ]
          },
          {
            title: 'Huffman Coding',
            github: 'deno-huffman',
            lang: 'TypeScript',
            date: '2021年3月',
            note: '純粋なハフマン符号のエンコーダーとデコーダー',
            articles: [
              { text: '実装記事', url: '/posts/huffman' }
            ]
          },
          {
            title: 'SHA-256',
            github: 'oraganic-sha256',
            lang: 'TypeScript',
            date: '2021年1月',
            note: 'NISTの論文そのままに実装したアルゴリズム',
            articles: [
              { text: '実装記事', url: '/posts/sha256' }
            ]
          },
        ]
      },
      {
        name: 'Web App',
        color: '#4FE479',
        contents: [
          {
            title: 'Slouch',
            github: 'Slouch',
            lang: 'TypeScript, Svelte.js',
            date: '2021年1月',
            note: 'ローカルファイルを上書きできるマークダウンエディター',
            articles: [
              { text: '説明記事', url: '/posts/slouch' },
              { text: 'Webサイト', url: 'https://slouch.kota-yata.com' }
            ]
          },
          {
            title: 'SmileScore',
            github: 'SmileScore',
            lang: 'TypeScript, Sveltekit',
            date: '2021年6月',
            note: '笑顔に点数をつけるというディストピアWebアプリ',
            articles: [
              { text: 'Webサイト', url: 'https://smilescore.vercel.app' }
            ]
          },
        ]
      },
      {
        name: 'npm Package',
        color: '#EBF0B3',
        contents: [
          {
            title: 'Percom',
            github: 'Percom',
            lang: 'JavaScript',
            date: '2020年8月',
            note: '組み合わせと順列の数を計算したり列挙したりするライブラリ',
            articles: [
              { text: '実装記事', url: '/posts/permutation' },
              { text: 'npmページ', url: 'https://www.npmjs.com/package/percom' }
            ]
          },
          {
            title: 'ISO-639-1-JP',
            github: 'iso-639-1-jp',
            lang: 'TypeScript',
            date: '2020年10月',
            note: 'ISOの国コードと日本語名を変換するライブラリ',
            articles: [
              { text: 'npmページ', url: 'https://www.npmjs.com/package/iso-639-1-jp' }
            ]
          },
        ]
      },
      {
        name: 'Others',
        color: '#4f72e4',
        contents: [
          {
            title: 'KEC',
            github: 'kec',
            lang: 'Go',
            date: '2020年11月',
            note: 'jpg/png/gifに対応した画像の拡張子変換CLI',
          },
          {
            title: 'meta getter',
            github: 'meta-getter',
            lang: 'Rust',
            date: '2022年3月',
            note: '指定されたURLのメタタグを返すサーバー',
          }
        ]
      }
    ]
  },
  trip: [
    {
      location: 'シカゴ',
      short: 'chicago',
      date: '2021年11月',
      description: `留学中にした初めての旅行。感謝祭期間で特に大きなイベントもなかったので、\
      ホスト祖父母が住むダウンタウンの高層タワーで7日間ずっと怠けて過ごした。\
      ダウンタウンでの買い物やカレッジフットボールの試合はいかにもアメリカという感じで思い出深かった。`,
      image: 12
    },
    {
      location: 'USJ',
      short: 'usj',
      date: '2021年8月',
      description: `留学前最後の旅行。ハリウッドのユニバーサルスタジオとはまた違う雰囲気と乗り物があってなかなか良かった。\
      ホテルで友達とスマブラやって周りが寝た後に1人でずっと復帰阻止練習してたのも良い思い出。`,
      image: 9
    },
    {
      location: '伊豆',
      short: 'izu',
      date: '2021年7月',
      description: `久々に家族で行った6年ぶりの伊豆。ここでサーフィンデビューしたものの、僕らが伊豆を離れた翌日に遊泳禁止\
      になるほどの荒波だったので初心者には中々きつかった。海水飲みすぎて1日半でギブアップして18歳にして体力の限界を感じた。`,
      image: 8
    },
    {
      location: 'ロサンゼルス',
      short: 'la',
      date: '2020年2月',
      description: `コロナ直前に滑り込みで行った修学旅行。本場のユニバーサルスタジオやサンタモニカ、ビバリーヒルズ等有名\
      どころはほぼ網羅できた上に夜は勝手にホテル出て飯食ったりできたのでめちゃくちゃ楽しかった。まだ働いてない頃だったので\
      アウトレットであんま散財できなかったけどそれを除けば人生で5本の指に入るレベルで最高の思い出だった。`,
      image: 32
    },
    {
      location: 'バリ',
      short: 'bali',
      date: 'July 2018',
      description: `RIMBA Jimbaranなるリゾートホテルとその周辺の観光スポットを回った。ホテルはめちゃくちゃ綺麗で親の機嫌も割と良かったので\
      すごく楽しかった。何を思ったのかプールに浮かんでたタイルを持ち帰って今でも机に飾ってある。`,
      image: 12
    },
  ],
  dialog: `言語を日本語に変更しました。他言語記事のタイトルと本文は翻訳されません。`
};
