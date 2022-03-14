<script context="module" lang="ts">
  export const load = async ({ fetch }): Promise<{ props: { posts: postMeta[] } }> => {
    const posts = await getPostsClient(fetch);
    return { props: { posts } };
  };
</script>

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
