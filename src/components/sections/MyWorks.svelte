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
          url: 'https://summarizy.vercel.app',
          alt: 'Summarizy',
          src: '../img/summarizy.webp',
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

  const presentations = ['BcaPCnWZuvY', '-JLTdhtyDGc', 'UYZw55-2kGQ', '1WOFGFyNl4k'];
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
    margin-bottom: 30px;
    &-works {
      overflow-x: scroll;
      margin-top: 25px;
      display: flex;
      flex-wrap: nowrap;
    }
  }
</style>
