import type { I18N } from './i18n';

export const JP: I18N = {
  biography: [
    { text: '慶應義塾大学環境情報学部1年' },
    { text: 'PLAID Inc. セキュリティエンジニアインターン' },
    { text: 'Civictech Challenge Cup U-22 運営スタッフ' },
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
  詳しくどの分野を専攻、研究するかは大学入学時に決める予定ですが、暗号理論やネットワークなどに興味を持っています。
  暗号に関して言えばSHA256やRSAを実際に実装してみて安全性に関する知識を得たり、最近は署名アルゴリズムや安全性のレベル分け、検証方法を独学で学んでいます。
  ネットワークについてはWebRTCやWebTransportなど、アプリケーションレイヤーでネットワーク通信をいじることに面白みを感じていて、最近はHTTP/3周りの新しい技術に興味があります。
  上記の興味を実装に移すという意味でWebアプリの開発もしていて、シグナリングサーバーとはProtocol Buffer on WebSocketで、ピア同士はWebRTCで通信を行うファイル共有アプリを作ったりしています。<br><br>
  エンジニアリングやコーディング以外では、本を読むことに時間を費やしています。「1984」や「私を離さないで」などのディストピア系の小説が特に好きですが、
  最近は社会契約論などの古典も読み進めています。
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
      { text: 'Instant Drop用シグナリングサーバー', url: 'https://github.com/kota-yata/instant-drop-server' },
      { text: 'npmパッケージ一覧', url: 'https://www.npmjs.com/~kota-yata' },
      { text: 'Webページのmetaタグを取得するサーバー', url: 'https://github.com/kota-yata/meta-getter' },
      { text: 'TCP Simultaneous Open実装', url: 'https://github.com/kota-yata/tcp-simultaneous-open' }
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
