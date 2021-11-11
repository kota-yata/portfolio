<script context="module" lang="ts">
  import Slides from '$lib/home/section/slides.svelte';
import Top from '$lib/home/section/top.svelte';
  import Works from '$lib/home/section/works.svelte';
  export const prerender = true;
  export const hydrate = false;
</script>

<svelte:head>
  <title>KOTA YATAGAI - 八谷航太</title>
</svelte:head>

<Top />
<Works />
<Slides />
