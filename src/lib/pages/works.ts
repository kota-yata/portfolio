export const works: { name: string, color: string, contents: work[] }[] = [
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
          { text: 'Webサイト', url: 'https://slouch.dev' }
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
      }
    ]
  }
];
