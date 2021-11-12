<script lang="ts">
  interface work {
    name: string;
    url: string;
    lang: string;
    date: string;
    note: string;
    article?: { title: string; url: string };
  }
  interface works {
    title: string;
    class: string;
    contents: work[];
  }

  const myWorks: works[] = [
    {
      title: 'Algorithm implementation',
      class: 'algo',
      contents: [
        {
          name: 'SHA-256',
          url: 'https://github.com/kota-yata/organic-sha256',
          lang: 'TypeScript',
          date: '2021/01',
          note: 'Handling binary as string',
          article: { title: 'Implementation article', url: 'https://zenn.dev/kota_yata/articles/ce45080b2e8cae' }
        },
        {
          name: 'Huffman coding',
          url: 'https://github.com/kota-yata/deno-huffman',
          lang: 'TypeScript',
          date: '2021/03',
          note: 'Both encoding and decoding are available',
          article: { title: 'Implementation article', url: 'https://zenn.dev/kota_yata/articles/97f43987efd069' }
        },
        {
          name: 'Base64',
          url: 'https://github.com/kota-yata/base64',
          lang: 'TypeScript',
          date: '2021/08',
          note: 'Handling binary with TypedArray',
          article: { title: 'Implementation article', url: 'https://zenn.dev/kota_yata/articles/89b10ac8c93b92' }
        }
      ]
    },
    {
      title: 'Web app',
      class: 'web',
      contents: [
        {
          name: 'Slouch',
          url: 'https://github.com/kota-yata/Slouch',
          lang: 'TypeScript, Svelte.js',
          date: '2020/12',
          note: 'Markdown editor with the future of overwriting local files',
          article: { title: 'Website', url: 'https://slouch.dev' }
        },
        {
          name: 'SmileScore',
          url: 'https://smilescore.vercel.app/',
          lang: 'TypeScript, Sveltekit',
          date: '2021/06',
          note: 'Using Amazon Rekognition',
          article: { title: 'Website', url: 'https://smilescore.vercel.app' }
        }
      ]
    },
    {
      title: 'npm module',
      class: 'npm',
      contents: [
        {
          name: 'Percom',
          url: 'https://www.npmjs.com/package/percom',
          lang: 'JavaScript',
          date: '2020/08',
          note: 'Permutation and combination calculation library',
          article: { title: 'Implementation article', url: 'https://zenn.dev/kota_yata/articles/89b10ac8c93b92' }
        },
        {
          name: 'ISO-639-1-JP',
          url: 'https://www.npmjs.com/package/iso-639-1-jp',
          lang: 'JavaScript',
          date: '2020/07',
          note: 'Translation of ISO country code into Japanese'
        }
      ]
    },
    {
      title: 'Other',
      class: 'others',
      contents: [
        {
          name: 'Blog RSS Feed',
          url: 'https://github.com/kota-yata/integrated-rss',
          lang: 'Go',
          date: '2020/11',
          note: 'Including RSS from zenn.dev, note.com, blog.kota-yata.com',
          article: { title: 'Website', url: 'https://feed.kota-yata.com' }
        },
        {
          name: 'KEC',
          url: 'https://github.com/kota-yata/kec',
          lang: 'Go',
          date: '2020/10',
          note: 'Image extension converter (png/jpg/gif)'
        }
      ]
    }
  ];

</script>

<div class="work">
  {#each myWorks as works}
    <section>
      <h2>{works.title}</h2>
      <div class="repositories">
        {#each works.contents as work}
          <div class={works.class}>
            <div class="name">
              <h3>{work.name}</h3>
              <a href={work.url}><img alt="github" src="/github.svg" width="30px" height="30px" /></a>
            </div>
            <div class="info">
              <p>
                <b>Lang :</b>
                {work.lang}<br />
                <b>Date :</b>
                {work.date}<br />
                <b>Note :</b>
                {work.note}<br />
              </p>
              {#if work.article}
                <a href={work.article.url}>{work.article.title}</a>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </section>
  {/each}
</div>

<style lang="scss">
  @import '../../../styles/variable.scss';
  .work {
    width: 100vw;
    padding: 50px 0 30px 0;
    margin-top: 5vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    section {
      padding-bottom: 40px;
      & > h2 {
        color: $vermilion;
        padding-bottom: 20px;
      }
      .repositories {
        display: flex;
        flex-wrap: wrap;
        & > div {
          width: 300px;
          padding: 25px 35px 35px 35px;
          margin: 15px;
          border-radius: 20px;
          .name {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
            & > h3 {
              color: $vermilion;
              margin: 0;
            }
          }
          .info {
            & > p {
              line-height: 30px;
              margin-bottom: 5px;
            }
            & > a {
              color: $vermilion;
            }
          }
        }
      }
    }
  }
</style>
