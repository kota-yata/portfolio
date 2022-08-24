<script lang="ts">
  import type { TextLinks } from "$lib/types";

  export let title: string = '';
  export let texts: TextLinks[];
</script>

<div class="root">
  {#if title}
  <h3>{title}</h3>
  {/if}
  <p>
    {#each texts as textLink}
    {#if textLink.url}
    &gt; <a href="{textLink.url}">{textLink.text}</a><br />
    {:else}
    &gt; {textLink.text}<br />
    {/if}
    {/each}
  </p>
</div>

<style lang="scss">
  .root {
    & > p {
      line-height: 30px;
      font-weight: 500;
    }
  }
</style>
