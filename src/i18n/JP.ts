import type { I18N } from './i18n';

export const JP: I18N = {
  biography: [
    { text: '慶應義塾高校在学中' },
    { text: 'Code for Japanのフロントエンド開発者' },
    { text: 'ウィスコンシンに1年間いました' },
    { text: '技術記事 : blog.kota-yata.com', url: 'https://blog.kota-yata.com' },
  ],
  qualifications: [
    { text: '基本情報技術者' },
    { text: 'EPSON HackTrek 2021 優勝', url: 'https://openinnovation.epson.com/topics/20210331_1/' },
  ],
  communication: [
    { text: 'Email: kota@yatagai.com' },
    { text: '日本語、英語対応可' },
  ],
  interests: `
  詳しくどの分野を専攻、研究するかは大学入学時に決める予定ですが、暗号理論やP2Pネットワークに非常に興味を持っています。
  暗号に関して言えばSHA256やRSAを実際に実装してみて安全性に関する知識を得たり、現在では楕円曲線を用いた暗号、署名アルゴリズムや
  安全性のレベル分け、検証方法を独学で学んでいます。P2Pネットワークについては構造化オーバーレイにおける分散型ハッシュテーブル (DHT)
  を実装してみたくて論文を読み進めています。
  その他の分野に関しても興味の向くままに勉強しているので<a href="https://blog.kota-yata.com">技術ブログ</a>や
  <a href="https://scrapbox.io/senior/">Scrapbox</a>も見ていってください。
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
  }
};
