import type { I18N } from './i18n';

export const JP: I18N = {
  biography: [
    { text: '慶應義塾大学 環境情報学部1年' },
    { text: '村井研究室 Arch研究グループ', url: 'https://arch.sfc.wide.ad.jp/' },
    { text: 'Code for Japan エンジニア' },
    { text: 'blog.kota-yata.com', url: 'https://blog.kota-yata.com' },
  ],
  qualifications: [
    { text: '基本情報技術者' },
    { text: 'EPSON HackTrek 2021 優勝', url: 'https://openinnovation.epson.com/topics/20210331_1/' },
    { text: 'EFC Award プロダクト開発部門 / GMOペパボ賞', url: 'https://efc.fukuoka.jp/edd2022/award' }
  ],
  communication: [
    { text: 'Email: kota@yatagai.com' },
    { text: '日本語、英語対応可' },
  ],
  interests: `
  主に分散システム、P2P通信、ネットワークプロトコルの実装に興味があり、研究や趣味での開発を行っています。ネットワークプロトコルについては特にQUICやHTTP/3を取り巻く新しい仕様を追うことに興味を持っています。
  業務経験としてはNuxtやSvelteなど各種フレームワークを用いたWebフロントエンド開発、GCPを用いたインフラ構築や<a href="https://tech.plaid.co.jp/mongo-atlas-to-bigquery">データベースのレプリケーション機構開発</a>などの経験があります。
  個人制作物としてはWebアプリが多いですが、今後は主にプロトコルやサーバーの実装に力を入れていきます。
  `,
  works: {
    algorithmImplementations: [
      { text: 'SHA-256', url: 'https://github.com/kota-yata/organic-sha256' },
      { text: 'ハフマン符号', url: 'https://github.com/kota-yata/deno-huffman' },
      { text: 'Base64', url: 'https://github.com/kota-yata/ky_base64' },
      { text: 'RSA', url: 'https://github.com/kota-yata/rsa' },
    ],
    webApps: [
      { text: 'WebRTCを用いたファイル転送アプリ (Instant Drop)', url: 'https://github.com/kota-yata/instant-drop' },
      { text: 'マークダウンエディタ', url: 'https://github.com/kota-yata/editor.kota-yata.com' },
      { text: '笑顔の点数をつけるアプリ', url: 'https://github.com/kota-yata/SmileScore' },
    ],
    others: [
      { text: 'シグナリングサーバー', url: 'https://github.com/kota-yata/instant-drop-server' },
      { text: 'Webページのmetaタグを取得するサーバー', url: 'https://github.com/kota-yata/meta-getter' },
      { text: 'TCP Simultaneous Open実装', url: 'https://github.com/kota-yata/tcp-simultaneous-open' },
      { text: 'STUNサーバーのフルスクラッチRUST実装', url: 'https://github.com/kota-yata/organic-stun' }
    ]
  },
  news: [
    {
      date: '2022/03/27',
      thumbnail: '/news/badgerbots.webp',
      url: 'https://www.code4japan.org/news/nhkhackathon2022',
      title: 'NHK防災ハッカソンに出場しました',
      text: '所属するロボットクラブTeam1306がFRC Wisconsin Regionalにて予選、Draft Pick、Quarter Finalsを通過して準決勝に進出しました。'
    },
    {
      date: '2022/03/27',
      thumbnail: '/news/badgerbots.webp',
      url: 'https://www.team1306.com/2022/03/27/wisconsin-regional-2/',
      title: 'FRC Wisconsin Regional準決勝進出',
      text: '所属するロボットクラブTeam1306がFRC Wisconsin Regionalにて予選、Draft Pick、Quarter Finalsを通過して準決勝に進出しました。'
    },
    {
      date: '2021/02/27',
      thumbnail: '/news/catenary.webp',
      url: 'https://openinnovation.epson.com/topics/20210826_2/',
      title: 'HackTrek 2021にて大賞を受賞',
      text: 'EPSONが主催するハッカソン「HackTrek 2021」にて、Canvas、WebRTC、CRDTを組み合わせたアプリケーション「Catenary」が大賞を受賞しました。'
    }
  ]
};
