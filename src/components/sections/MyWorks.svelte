<script>
  import WorkCard from '../WorkCard.svelte';

  const workCardAlgorithm = [
    {
      url: 'https://github.com/kota-yata/organic-sha256',
      alt: 'Organic-SHA256',
      src: '../img/sha256.webp',
      className: 'scroll-reveal',
      desc:
        'SHA-256 implementation from scratch in TypeScript. It was really hard to deal with full-width symbols like Japanese and emoji.'
    }
  ];

  const workCardWeb = [
    {
      url: 'https://slouch.dev',
      alt: 'SLOUCH',
      src: '../img/slouch.webp',
      className: 'scroll-reveal-slide-left',
      desc:
        'Markdown editor which enables to edit local document from browser and overwrite them. You can also save the documents in cloud database.'
    },
    {
      url: 'https://pics.kota-yata.com',
      alt: 'Photo Gallery',
      src: '../img/pics.webp',
      className: 'scroll-reveal',
      desc:
        'My personal photo gallery. You can search tags from the upper right search box. Though not every photo was taken by DSLR, my good old days are in this place :)'
    },
    {
      url: 'https://summarizy.vercel.app',
      alt: 'Summarizy',
      src: '../img/summarizy.webp',
      className: 'scroll-reveal-slide-right',
      desc:
        'Markdown memo app which make it easy to summarize while reading the paper or tech document. Memo area on left side is WYSIWYG editor so that there’s no preview.'
    }
  ];

  const workCardNpm = [
    {
      url: 'https://www.npmjs.com/package/percom',
      alt: 'Percom',
      src: '../img/percom.webp',
      className: 'scroll-reveal-slide-left',
      desc:
        'Permutation & Combination library. Since it’s little backbreaking to implement permutation or combination, I recommend to use this library instead.'
    },
    {
      url: 'https://www.npmjs.com/package/neornd',
      alt: 'neornd',
      src: '../img/neornd.webp',
      className: 'scroll-reveal',
      desc:
        'A library which do boring random stuff instead of you. Random sorting, generating random number/string are availble on this library. Don’t use Math.random() for essential contents.'
    },
    {
      url: 'https://www.npmjs.com/package/iso-639-1-jp',
      alt: 'ISO-639-1-JP',
      src: '../img/iso.webp',
      className: 'scroll-reveal-slide-right',
      desc: 'ISO’s country code to country name in Japanese converter. Original repository is meikidd/iso-639-1.'
    }
  ];
</script>

<div class="works">
  <div class="works-title titles">
    <h2>My Works</h2>
  </div>
  <div class="works-section">
    <h3>Algorithm</h3>
    <div class="works-section-card">
      {#each workCardAlgorithm as { url, alt, src, className, desc }}
        <span class="works-section-card-contents">
          <WorkCard {url} {alt} {src} {className} {desc} />
        </span>
      {/each}
    </div>
  </div>
  <div class="works-section">
    <h3>Web Apps</h3>
    <div class="works-section-card">
      {#each workCardWeb as { url, alt, src, className, desc }}
        <span class="works-section-card-contents">
          <WorkCard {url} {alt} {src} {className} {desc} />
        </span>
      {/each}
    </div>
  </div>
  <div class="works-section">
    <h3>npm packages</h3>
    <div class="works-section-card">
      {#each workCardNpm as { url, alt, src, className, desc }}
        <span class="works-section-card-contents">
          <WorkCard {url} {alt} {src} {className} {desc} />
        </span>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  @import '../../assets/definition.scss';

  .works {
    padding-bottom: 40px;
    &-section {
      padding: 20px 0;
      h3 {
        margin: 0;
        font-size: 24px;
        color: $red;
      }
      &-card {
        @extend %center-flex;
        display: flex;
        flex-wrap: wrap;
        &-contents {
          margin: 0 10px;
        }
      }
    }
  }
</style>
