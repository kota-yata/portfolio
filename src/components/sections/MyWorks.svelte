<script>
  import { _ } from 'svelte-i18n';
  import '../../localization/i18n.js';

  import PresentationCard from '../PresentationCard.svelte';
  import WorkCard from '../WorkCard.svelte';

  const works = [
    {
      title: 'Algorithms',
      contents: [
        {
          url: 'https://github.com/kota-yata/organic-sha256',
          alt: 'Organic-SHA256',
          src: '../img/sha256.webp',
          desc: $_('works.sha256')
        },
        {
          url: 'https://github.com/kota-yata/deno-huffman',
          alt: 'Deno-Huffman',
          src: '../img/huffman.webp',
          desc: $_('works.huffman')
        }
      ]
    },
    {
      title: 'Web apps',
      contents: [
        {
          url: 'https://slouch.dev',
          alt: 'SLOUCH',
          src: '../img/slouch.webp',
          desc: $_('works.slouch')
        },
        {
          url: 'https://pics.kota-yata.com',
          alt: 'Photo Gallery',
          src: '../img/pics.webp',
          desc: $_('works.pics')
        },
        {
          url: 'https://editor.kota-yata.com',
          alt: 'Editor',
          src: '../img/ogp.webp',
          desc: $_('works.summarizy')
        }
      ]
    },
    {
      title: 'npm packages',
      contents: [
        {
          url: 'https://www.npmjs.com/package/percom',
          alt: 'Percom',
          src: '../img/percom.webp',
          desc: $_('works.percom')
        },
        {
          url: 'https://www.npmjs.com/package/neornd',
          alt: 'neornd',
          src: '../img/neornd.webp',
          desc: $_('works.neornd')
        },
        {
          url: 'https://www.npmjs.com/package/iso-639-1-jp',
          alt: 'ISO-639-1-JP',
          src: '../img/iso.webp',
          desc: $_('works.iso')
        }
      ]
    },
    {
      title: 'Others',
      contents: [
        {
          url: 'https://sgg-feed.appspot.com/',
          alt: 'sgg feed',
          src: '../img/sgg-feed.webp',
          desc: $_('works.sgg-feed')
        },
        {
          url: 'https://github.com/kota-yata/integrated-rss',
          alt: 'integrated rss',
          src: '../img/rss.webp',
          desc: $_('works.rss')
        },
        {
          url: 'https://github.com/kota-yata/kec',
          alt: 'kec',
          src: '../img/kec.webp',
          desc: $_('works.kec')
        }
      ]
    }
  ];

  const presentations = [
    'b7efe2f944a84c468b77d28f094a3085',
    'd86317a929784054a1a80e9c79ff50c5',
    'e7a66d512fe24fcbb57c0ba5dcce42d8',
    '3101a4f8ee9a49c693d3b6f82e32a451',
    '3021690019cf457f9139d13466c3037e'
  ];
</script>

{#each works as { title, contents }}
  <div class="container container-large container-info myworks">
    <div class="container-title">{title}</div>
    <div class="myworks-works">
      {#each contents as { url, alt, src, desc }}
        <WorkCard {url} {alt} {src} {desc} />
      {/each}
    </div>
  </div>
{/each}
<div class="container container-large container-info myworks">
  <div class="container-title">Presentations</div>
  <div class="myworks-works">
    {#each presentations as id}
      <PresentationCard {id} />
    {/each}
  </div>
</div>

<style lang="scss">
  .myworks {
    margin: 15px 0;
    background: transparent;
    border: none;
    box-shadow: none;
    &-works {
      overflow-x: scroll;
      margin-top: 25px;
      display: flex;
      flex-wrap: nowrap;
    }
  }
</style>
