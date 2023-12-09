import type { I18N } from './i18n';

export const EN: I18N = {
  biography: [
    { text: 'Undergraduate at Keio Univ. The Faculty of Environment and Information Studies' },
    { text: 'Murai Lab, Arch Research Group', url: 'https://arch.sfc.wide.ad.jp/' },
    { text: 'Software Engineer at Code for Japan'},
  ],
  qualifications: [
    { text: 'Fundamental of Engineering (Japanese)' },
    { text: '1st prize at EPSON HackTrek 2021', url: 'https://openinnovation.epson.com/en/topics/20210826_2/' },
    { text: 'Product Development & GMO Pepabo Prize at EFC Award', url: 'https://efc.fukuoka.jp/edd2022/award' }
  ],
  communication: [
    { text: 'Email: kota[at]yatagai.com' },
    { text: 'English available' },
  ],
  interests: `
  Although my field of interest is quite diverse that I don't come up with the primary field, I enjoy implementing protocols on papers or specifications.
  One of my recent work is <a href="https://github.com/kota-yata/tcp-simultaneous-open">an implementation of TCP Simultaneous Open</a>,
  where you can establish TCP connection without having the conventional three-way handshake. I've also written SHA-256 in TypeScript,
  and have been working on implementing Media over QUIC Transport, a live streaming protocol on HTTP/3.<br>
  I also write web apps for fun and research purpose sometimes. As I like tinkering network connection on an application layer WebRTC, WebSocket and WebTransport are what I usually code with
  (e.g. <a href="https://github.com/kota-yata/instant-drop">Instant Drop</a>).<br><br>
  Besides computer science and software engineering, I spend a great deal of time reading.
  Sometimes it's just for fun, sometimes for learning English or for self enlightenment. I enjoy reading dystopian novels the most, such as "1984", "Don't let me go" or "Atlas Shrugged".
  I've even created a dystopian app once that scores smiles using image recognition, inspired by 1984.
  `,
  works: {
    algorithmImplementations: [
      { text: 'SHA-256', url: 'https://github.com/kota-yata/organic-sha256' },
      { text: 'Huffman Coding', url: 'https://github.com/kota-yata/deno-huffman' },
      { text: 'Base64', url: 'https://github.com/kota-yata/ky_base64' },
      { text: 'RSA', url: 'https://github.com/kota-yata/rsa' },
    ],
    webApps: [
      { text: 'Instant Drop - File Transfer App on WebRTC', url: 'https://github.com/kota-yata/instant-drop' },
      { text: 'Markdown Editor', url: 'https://github.com/kota-yata/editor.kota-yata.com' },
      { text: 'Smile Score', url: 'https://github.com/kota-yata/SmileScore' },
    ],
    others: [
      { text: 'Signaling Server', url: 'https://github.com/kota-yata/instant-drop-server' },
      { text: 'Meta Getter', url: 'https://github.com/kota-yata/meta-getter' },
      { text: 'TCP Simultaneous Open', url: 'https://github.com/kota-yata/tcp-simultaneous-open' },
      { text: 'STUN Server from scratch in Rust', url: 'https://github.com/kota-yata/organic-stun' }
    ]
  },
  news: []
};
