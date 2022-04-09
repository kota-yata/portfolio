<script context="module" lang="ts">
  export const load = async ({ fetch }): Promise<{ props: { posts: postMeta[] } }> => {
    const posts = await getPostsClient(fetch);
    return { props: { posts } };
  };
</script>

<svelte:head>
  <meta name="description" content="All posts by Kota Yatagai" />
  <meta property="og:url" content="https://kota-yata.com/posts" />
  <meta property="og:title" content="All Posts - KOTA YATAGAI" />
  <meta property="og:image" content="https://kota-yata.com/ogp.webp" />
  <meta property="og:description" content="All posts by Kota Yatagai" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:site" content="@kota_yata" />
</svelte:head>

<script lang="ts">
  import Page from '$lib/page.svelte';
  import { getPostsClient } from '$lib/posts/getPosts';
  import PostCard from '$lib/posts/postCard.svelte';
  export let posts: postMeta[] = [];
</script>

<Page>
  {#each posts as post}
    <div class="post-container"><PostCard meta={post} /></div>
  {/each}
</Page>

<style lang="scss">
  .post-container {
    margin-bottom: 40px;
  }
</style>
