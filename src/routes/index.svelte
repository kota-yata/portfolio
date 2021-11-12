<script lang="ts">
  import BookInterview from '$lib/home/section/bookInterview.svelte';
  import Slides from '$lib/home/section/slides.svelte';
  import Top from '$lib/home/section/top.svelte';
  import Works from '$lib/home/section/works.svelte';
import { onMount } from 'svelte';
  export const prerender = true;
  export const hydrate = false;
  let isVisible = false;
  onMount(() => {
    isVisible = true;
  })
</script>

<svelte:head>
  <title>KOTA YATAGAI - 八谷航太</title>
</svelte:head>

{#if isVisible}
<Top />
<Works />
<Slides />
<BookInterview />
{/if}
