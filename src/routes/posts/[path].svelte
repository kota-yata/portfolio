<script lang="ts" context="module">
  export const load = async ({ page, fetch }) => {
    const url = `/posts/${page.params.path}.json`;
    const res: Response = await fetch(url);
    if (!res.ok) return;
    const post = await res.json();
    return { props: { post } };
  };
</script>

<script lang="ts">
  import Page from '$lib/page.svelte';
  import { getClassName } from '$lib/posts/className';
  export let post: post;
  const className = getClassName(post.meta.category);
</script>

<svelte:head>
  <title>{post.meta.title}</title>
</svelte:head>

<Page>
  <div class="info">
    <h1 class="info-title">{post.meta.title}</h1>
    <span class="info-date">{post.meta.date}</span>
    <span class="info-category {className}">{post.meta.category}</span>
  </div>
  {@html post.body}
</Page>

<style lang="scss">
  @import '../../styles/variable.scss';

  .info {
    padding-bottom: 50px;
    font-weight: 600;
    &-title {
      padding: 0 0 10px 0;
      font-size: 48px;
    }
    &-date {
      color: $gray;
      padding-right: 10px;
    }
  }
</style>
