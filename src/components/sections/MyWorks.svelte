<script>
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
          desc:
            'SHA-256 implementation from scratch in TypeScript. It was really hard to deal with full-width symbols like Japanese and emoji.'
        },
        {
          url: 'https://github.com/kota-yata/deno-huffman',
          alt: 'Deno-Huffman',
          src: '../img/huffman.webp',
          desc: 'Huffman Coding Algorithm written in TypeScript. You can encode/decode ASCII string.'
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
          desc:
            'Markdown editor which enables to edit local document from browser and overwrite them. You can also save the documents in cloud database.'
        },
        {
          url: 'https://pics.kota-yata.com',
          alt: 'Photo Gallery',
          src: '../img/pics.webp',
          desc:
            'My personal photo gallery. You can search tags from the upper right search box. Though not every photo was taken by DSLR, my good old days are in this place :)'
        },
        {
          url: 'https://summarizy.vercel.app',
          alt: 'Summarizy',
          src: '../img/summarizy.webp',
          desc:
            'Markdown memo app which make it easy to summarize while reading the paper or tech document. Memo area on left side is WYSIWYG editor so that there’s no preview.'
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
          desc:
            'Permutation & Combination library. Since it’s little backbreaking to implement permutation or combination, I recommend to use this library instead.'
        },
        {
          url: 'https://www.npmjs.com/package/neornd',
          alt: 'neornd',
          src: '../img/neornd.webp',
          desc:
            'A library which do boring random stuff instead of you. Random sorting, generating random number/string are availble on this library. Don’t use Math.random() for essential contents.'
        },
        {
          url: 'https://www.npmjs.com/package/iso-639-1-jp',
          alt: 'ISO-639-1-JP',
          src: '../img/iso.webp',
          desc: 'ISO’s country code to country name in Japanese converter. Original repository is meikidd/iso-639-1.'
        }
      ]
    }
  ];

  const presentations = ['1WOFGFyNl4k', '-JLTdhtyDGc', 'UYZw55-2kGQ'];
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
