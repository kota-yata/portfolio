<script lang="ts">
  interface work {
    name: string;
    url: string;
    desc: string[];
  }
  interface works {
    title: string;
    contents: work[];
  }

  const myWorks: works[] = [
    {
      title: 'Algorithm implementation',
      contents: [
        { name: 'SHA-256', url: 'https://github.com/kota-yata/organic-sha256', desc: ['Written in TypeScript'] },
        {
          name: 'Huffman coding',
          url: 'https://github.com/kota-yata/deno-huffman',
          desc: ['Written in TypeScript', 'Running on Deno']
        }
      ]
    },
    {
      title: 'Web app',
      contents: [
        {
          name: 'Slouch',
          url: 'https://github.com/kota-yata/Slouch',
          desc: ['Markdown editor', 'Save & overwrite to local files', 'Written with Svelte.js']
        },
        { name: 'Photo gallery', url: 'https://pics.kota-yata.com/', desc: ['Written with Svelte.js'] }
      ]
    },
    {
      title: 'npm module',
      contents: [
        { name: 'Percom', url: 'https://www.npmjs.com/package/percom', desc: ['Permutation & Combination'] },
        {
          name: 'ISO-639-1-JP',
          url: 'https://www.npmjs.com/package/iso-639-1-jp',
          desc: ['Translate ISO country code into Japanese']
        }
      ]
    },
    {
      title: 'Others',
      contents: [
        { name: 'Blog RSS feed', url: 'https://github.com/kota-yata/integrated-rss', desc: ['Written in Golang'] },
        {
          name: 'KEC',
          url: 'https://github.com/kota-yata/kec',
          desc: ['jpg/png/gif extension converter CLI', 'Written in Golang']
        }
      ]
    }
  ];
</script>

<div class="section">
  <h2>Works</h2>
  {#each myWorks as works}
    <section>
      <h3>{works.title}</h3>
      <div class="works">
        {#each works.contents as work}
          <a href={work.url}>
            <div>
              <h4>{work.name}</h4>
              {#each work.desc as desc}
                <p>> {desc}</p>
              {/each}
            </div>
          </a>
        {/each}
      </div>
    </section>
  {/each}
</div>

<style lang="scss">
  @import '../../styles/variable.scss';
  .section {
    padding: 50px 0 30px 0;
    justify-content: flex-start;
    section {
      padding-bottom: 40px;
      .works {
        display: flex;
        flex-wrap: wrap;
        & > a {
          text-decoration: none;
          div {
            padding: 0 20px;
            p {
              font-size: 16px;
              line-height: 25px;
            }
          }
        }
      }
    }
  }
</style>
