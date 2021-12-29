import type { localization } from '$lib/localization/type';
export const EN: localization = {
  profile: {
    name: 'Kota Yatagai',
    bio: '18yo / Software Developer'
  },
  topics: [
    {
      category: 'Research',
      description: `Currently I am researching blockchain system, especially DHT, \
      which is the protocol for non-structual overlay P2P network. Although I have not published any \
      implementation or paper on the basis of this research yet, I have been reading the paper of DHT \
      algorithms and implementation code.`
    },
    {
      category: 'Algorithm',
      description: `Posts about the implementation of existing algorithms or algorithms for my original library. \
      Feel free to create an issue or pull request for those implementations; most of the implemetation, \
      if not all, are on GitHub.`
    },
    {
      category: 'Cryptography',
      description:
        `Posts about cryptography. Some posts might be categolized in different topic if it is related \
        to the topic more than cryptography. (e.g. Implementation of cipher might be tagged as Algorithm)`
    },
    {
      category: 'Computer Science',
      description:
        'Posts about computer science which are not related to any of the topic above.'
    },
    {
      category: 'Programming',
      description:
        'Posts about web development and programming. Mostly explanation of a web api.'
    },
    {
      category: 'Non-Tech',
      description:
        'Posts not related to any technology.'
    }
  ],
  works: {
    th: {
      lang: 'Lang',
      date: 'Date',
      note: 'Note'
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
            date: 'Aug 2021',
            note: 'Base64 encoding & decoding algorithm supporting UTF-8',
            articles: [
              { text: 'Implementation Article (Japanese)', url: '/posts/base64' }
            ]
          },
          {
            title: 'Huffman Coding',
            github: 'deno-huffman',
            lang: 'TypeScript',
            date: 'Mar 2021',
            note: 'Huffman coding encoding & decoding algorithm',
            articles: [
              { text: 'Implementation Article (Japanese)', url: '/posts/huffman' }
            ]
          },
          {
            title: 'SHA-256',
            github: 'oraganic-sha256',
            lang: 'TypeScript',
            date: 'Jan 2021',
            note: 'Pure implementation referencing NIST paper',
            articles: [
              { text: 'Implementation Article (Japanese)', url: '/posts/sha256' }
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
            date: 'Jan 2021',
            note: 'Markdown editor on which you can rewrite your local files',
            articles: [
              { text: 'Explanation Article (Japanese)', url: '/posts/slouch' },
              { text: 'URL (Japanese)', url: 'https://slouch.dev' }
            ]
          },
          {
            title: 'SmileScore',
            github: 'SmileScore',
            lang: 'TypeScript, Sveltekit',
            date: 'Jun 2021',
            note: 'Depressing web app scoring your smile',
            articles: [
              { text: 'URL (English)', url: 'https://smilescore.vercel.app' }
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
            date: 'Aug 2020',
            note: 'npm package calculating and listing permutaion & combination',
            articles: [
              { text: 'Implementation Article (Japanese)', url: '/posts/permutation' },
              { text: 'npm', url: 'https://www.npmjs.com/package/percom' }
            ]
          },
          {
            title: 'ISO-639-1-JP',
            github: 'iso-639-1-jp',
            lang: 'TypeScript',
            date: 'Oct 2020',
            note: 'npm package translating ISO country code into Japanese',
            articles: [
              { text: 'npm', url: 'https://www.npmjs.com/package/iso-639-1-jp' }
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
            date: 'Nov 2020',
            note: 'File extension converter for png/jpg/gif',
          }
        ]
      }
    ]
  }
};
