<script>
  import NeumoTitle from './NeumoTitle.svelte';
  import Icon from 'svelte-awesome';
  import { arrowDown } from 'svelte-awesome/icons';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  let isVisible = false;

  onMount(() => {
    isVisible = true;
  });
</script>

{#if isVisible}
  <div id="top_page">
    <span transition:fade={{ delay: 300, duration: 2000 }}>
      <NeumoTitle name="KOTAYATAGAI" />
    </span>
    <lottie-player
      transition:fade={{ delay: 5000, duration: 1000 }}
      src="https://assets4.lottiefiles.com/packages/lf20_CsR6jc.json"
      background="transparent"
      speed="1.5"
      style="width: 150px; height: 150px;"
      loop
      autoplay />
  </div>
{/if}

<style lang="scss">
  @import '../assets/definition.scss';

  #top_page {
    height: 100vh;
    lottie-player {
      @extend %completely-center;
      top: 95%;
    }
  }
</style>
