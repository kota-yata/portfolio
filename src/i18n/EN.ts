import type { I18N } from './i18n';

export const EN: I18N = {
  biography: [
    { text: 'Student at Keio High School' },
    { text: 'Front-end Engineer at Code for Japan' },
    { text: 'Experience of studying abroad (1 year in Wisconsin)' },
  ],
  qualifications: [
    { text: 'Fundamental of Engineering (Japanese)' },
    { text: '1st prize at EPSON HackTrek 2021', url: 'https://openinnovation.epson.com/en/topics/20210826_2/' },
    { text: 'Product Development & GMO Pepabo Prize at EFC Award', url: 'https://efc.fukuoka.jp/edd2022/award' }
  ],
  communication: [
    { text: 'Email: kota@yatagai.com' },
    { text: 'English available although my native toungue is Japanese' },
  ],
  interests: `
  Although I have not decided which field specifically to reasearch in computer science as I'm not required, 
  I have strong interest in cryptography and decentralized networks. For cryptography I have been implementing 
  popular algorithms such as RSA-OAEP, ECDSA or SHA256. For decentralized networks I have read several papers 
  and white papers about DHT (Decentralized Hash Table), and have been reading the implementation in actual 
  applications such as IPFS or Ethereum.
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
      { text: 'Signaling Server for Instant Drop', url: 'https://github.com/kota-yata/instant-drop-server' },
      { text: 'npm Packages', url: 'https://www.npmjs.com/~kota-yata' },
      { text: 'Meta Getter', url: 'https://github.com/kota-yata/meta-getter' },
      { text: 'TCP Simultaneous Open', url: 'https://github.com/kota-yata/tcp-simultaneous-open' }
    ]
  },
  news: []
};
