<script context="module" lang="ts">
  export const load = async ({ fetch }): Promise<postsProps> => {
    const posts = await getPostsClient(fetch, 3);
    return { props: { posts } };
  };
</script>

<script lang="ts">
  import { getPostsClient } from '$lib/posts/getPosts';
  import Page from '$lib/page.svelte';
  import PostCard from '$lib/posts/postCard.svelte';
  import TopicSection from '$lib/topicSection.svelte';
  import { localization } from '$lib/localization/index';
  import { countryCode } from '$lib/localization/getCountry';

  $: topics = localization[$countryCode].topics;
  $: ipfs = localization[$countryCode].ipfs;

  export let posts;
</script>

<svelte:head>
  <meta name="description" content="Kota Yatagai, a high school student" />
  <meta property="og:url" content="https://kota-yata.com" />
  <meta property="og:title" content="KOTA YATAGAI - 八谷航太" />
  <meta property="og:image" content="https://kota-yata.com/ogp.webp" />
  <meta property="og:description" content="Personal Website & Blog by a (physically) tiny little student" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@kota_yata" />
</svelte:head>

<Page>
  <h2 class="slot-h2">Latest 3 Posts</h2>
  {#each posts as post}
    <div class="slot-post"><PostCard meta={post} /></div>
  {/each}
</Page>
<div class="to-posts"><a href="/posts/">View All Posts</a></div>
<div class="special-ipfs">
  <h4>🚀 Launched On The Future 🚀</h4>
  <p>{@html ipfs}</p>
</div>
{#each topics as topic}
  <TopicSection category={topic.category} description={topic.description} />
{/each}

<style lang="scss">
  @import '../styles/variable.scss';
  .slot-h2 {
    padding-top: 0;
  }
  .slot-post {
    margin-bottom: 40px;
  }
  .to-posts {
    margin-top: 30px;
    width: 100%;
    text-align: center;
    & > a {
      padding: 15px 40px;
      border-radius: 500px;
      background: $white;
      color: $black;
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
    }
  }
  .special-ipfs {
    margin-top: 60px;
    padding: 10px 10px 10px 20px;
    background: $ipfs-blue;
    border-left: 0.5rem solid $ipfs-dark-blue;
    & > h4 {
      padding-top: 10px;
      color: $black;
    }
    & > p {
      color: $black;
      font-weight: 500;
    }
  }

  @media screen and (max-width: 700px), screen and (orientation: portrait) {
    .special-ipfs {
      padding-left: 10px;
      & > p {
        font-size: 14px;
      }
    }
  }
</style>
