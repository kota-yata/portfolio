<script lang="ts">
import { onMount } from 'svelte';

  import { fade } from 'svelte/transition';
  export let bg: string;
  export let title: string = '';
  export let className = '';
  export let delay = 0;
  export let isVisible = false;

  onMount(() => {
    console.log('onMount');
    isVisible = true;
  })
</script>

{#if isVisible}
<div class="square {className}" transition:fade={{ delay, duration: 1000 }} style="background-color: {bg}; ">
  {#if title}
    <h2>{title}</h2>
  {/if}
  <slot />
</div>
{/if}

<style lang="scss">
  .square {
    position: relative;
    border-radius: 20px;
    padding: 60px;
    h2 {
      position: absolute;
      top: -37px;
      left: 30px;
    }
  }
</style>
