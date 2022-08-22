import type { localization } from '$lib/localization/type';
export const EN: localization = {
  ipfs: 'This website is now available on <a href="https://ipfs.io/">IPFS</a>! => ipns://kota-yata.com',
  profile: {
    name: 'Kota Yatagai',
    bio: '18yo / Software Developer'
  },
  topics: [
    {
      category: 'Algorithm',
      description: `Posts about the implementation of existing algorithms or algorithms for my original libraries. \
      Feel free to create an issue or a pull request for those implementations; most of the implemetation, \
      if not all, are on GitHub.`
    },
    {
      category: 'Cryptography',
      description:
        `Posts about cryptography. Some posts might be categolized in a different topic if it is related \
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
        'Posts about web development and programming. Mostly explanation of the Web APIs.'
    },
    {
      category: 'Decentralization',
      description: `Posts about P2P network or DHT (Decentralization Hash Table), which I have been researching. \
      There might be posts about other kinds of decentralized systems such as Self-Sovereign Identity or NFT.`
    },
    {
      category: 'Non-Tech',
      description:
        'Posts not related to technology.'
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
          // {
          //   title: 'Slouch',
          //   github: 'Slouch',
          //   lang: 'TypeScript, Svelte.js',
          //   date: 'Jan 2021',
          //   note: 'Markdown editor on which you can rewrite your local files',
          //   articles: [
          //     { text: 'Explanation Article (Japanese)', url: '/posts/slouch' },
          //     { text: 'URL (Japanese)', url: 'https://slouch.kota-yata.com' }
          //   ]
          // },
          {
            title: 'Instant Drop',
            github: 'instant-drop',
            lang: 'TypeScript, Sveltekit',
            date: 'Jul 2022',
            note: 'File transfer application using WebRTC Data Channel',
          },
          {
            title: 'SmileScore',
            github: 'SmileScore',
            lang: 'TypeScript, Sveltekit',
            date: 'Jun 2021',
            note: 'Depressing web app scoring your smile',
            articles: [
              { text: 'URL', url: 'https://smilescore.vercel.app' }
            ]
          },
          {
            title: 'Research Editor',
            github: 'editor.kota-yata.com',
            lang: 'TypeScript, NuxtJS',
            date: 'Mar 2021',
            note: 'Markdown editor with PDF preview on the right side so that you can take a note while reading a paper',
            articles: [
              { text: 'URL', url: 'https://editor.kota-yata.com' }
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
            note: 'permutaion & combination',
            articles: [
              { text: 'Implementation Article (Japanese)', url: '/posts/permutation' },
              { text: 'npm', url: 'https://www.npmjs.com/package/percom' }
            ]
          },
          {
            title: 'Neornd',
            github: 'neornd',
            lang: 'JavaScript',
            date: 'July 2020',
            note: 'neornd generates random number/bigint/string, and sort given string randomly',
            articles: [
              { text: 'npm', url: 'https://www.npmjs.com/package/neornd' }
            ]
          },
          {
            title: 'ISO-639-1-JP',
            github: 'iso-639-1-jp',
            lang: 'TypeScript',
            date: 'Oct 2020',
            note: 'ISO-639-1-JP translates ISO country code into Japanese',
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
          },
          {
            title: 'Meta Getter',
            github: 'meta-getter',
            lang: 'Rust',
            date: 'March 2022',
            note: 'Multithread web server serving meta tags of a given url',
          }
        ]
      }
    ]
  },
  trip: [
    {
      location: 'New York City',
      short: 'nyc',
      date: 'June 2022',
      description: `Trip to NYC at the end of my exchange year. My main plan was just walking around and buying stuff spontaneously, \
      although it had been changed for the last half of the trip as my leg was dying. While people there are really different, the skyscrapers and the subway reminded me of Tokyo.`,
      image: 37
    },
    {
      location: 'Badger BOTS',
      short: 'badgerbots',
      date: 'November 2021 ~ June 2022',
      description: `A robotics team I was on throughout my exchange year. We made a robot named Phoenix in 3 months, and made it to semi-final at both \
      Wisconsin Regional at Milwaukee and Seven Rivers Regional at LaCrosse. They literally have made my year.`,
      image: 14
    },
    {
      location: 'Washington D.C.',
      short: 'dc',
      date: 'December 2021',
      description: `The first visit to the east coast in my life. Although we stayed on the northside of the city and visited some of the famous museums,\
      I mainly walked around the southside to see the difference from the fancier area. As a man selling newspapers on a road told me,\
      there were barely white people on the southside in the first place. I felt like that city symbolized the US both in a good way and in a bad way.`,
      image: 35
    },
    {
      location: 'Chicago',
      short: 'chicago',
      date: 'November 2021',
      description: `The first overnight trip since I came to the US as an exchange student. \
      We stayed at my host grandparents' house, a skyscraper in the downtown. It was so much fun walking the downtown,\
      looking at the view of Lake Michigan. There was already an ice skating rink despite November.`,
      image: 12
    },
    {
      location: 'Universal Studio Japan',
      short: 'usj',
      date: 'August 2021',
      description: `The last trip before studying abroad. \
      Though I and my friends had already been to Universal Studio Hollywood, we had so much fun the original rides in Osaka. \
      I was exhausted when we leave there because of motion sickness, but was also satisfied with that we could make a great memory.`,
      image: 9
    },
    {
      location: 'Izu',
      short: 'izu',
      date: 'July 2021',
      description: `Traveled to Izu, a summer resort in Japan with my family. \
      I tried surfing for the first time, and it was really fun. Since typhoon was coming close, \
      the sea raged and swimming was banned few days after we got back home. \
      But the weather was great while we stay.`,
      image: 8
    },
    {
      location: 'Los Angels',
      short: 'la',
      date: 'February 2020',
      description: `The last trip before quarantine. \
      Traveled around Redondo Beach, Citadel, Beverly Hills, Santa Monica, Hollywood, San Diego with my friends as a school trip. \
      Also we visited UCLA. The locker room of UCLA basketball team was like that of NBA. \
      This is definitely the best trip of my life, and I frequently look back this nostalgic, good old days.`,
      image: 32
    },
    {
      location: 'Bali',
      short: 'bali',
      date: 'July 2018',
      description: `Stayed at RIMBA Jimbaran, a great resort hotel with tons of pool and restaurant, with my family. \
      We've enjoyed the beauty of the beaches, and deliciousness of the local foods for 4 days. Nothing can spare this wonderful time.`,
      image: 12
    },
  ],
  dialog: `Most of, if not all, the posts are in Japanese and those are not going to be translated. \
  About/Contact/Works page and the description for each topic are translated.`
};
