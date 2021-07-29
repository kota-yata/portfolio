<script context="module" lang="ts">
  import Biography from '$lib/section/biography.svelte';
  import Top from '$lib/section/top.svelte';
  import Works from '$lib/section/works.svelte';
  export const prerender = true;
</script>

<svelte:head>
  <title>KOTA YATAGAI - 八谷航太</title>
</svelte:head>

<div class="sections">
  <Top />
  <Biography />
  <Works />
</div>

<style lang="scss">
  .sections {
    height: 100vh;
    overflow-y: auto;
  }
</style>
