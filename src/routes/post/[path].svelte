<script lang="ts" context="module">
  export const load = async ({ page, fetch }) => {
    const url = `/post/${page.params.path}.json`;
    const res: Response = await fetch(url);
    if (!res.ok) return;
    const post = await res.json();
    return {
      props: { post }
    };
  }
</script>

<script lang="ts">
import { onMount } from 'svelte';

  onMount(() => {
    import('zenn-embed-elements');
  })
  import 'zenn-content-css';
  export let post;
  console.log(post.body);
</script>

<svelte:head>
  <title>{post.meta.title}</title>
</svelte:head>

<h1>{post.meta}</h1>
{@html post.body}
