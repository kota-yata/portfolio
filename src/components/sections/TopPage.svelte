<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  let isVisible = false;

  onMount(() => {
    isVisible = true;
  });
</script>

{#if isVisible}
  <div class="top">
    <div class="top-name" transition:fade={{ delay: 1500, duration: 1500 }}>
      <h1>Kota Yatagai</h1>
    </div>
  </div>
{/if}

<style lang="scss">
  @import '../../assets/definition.scss';

  .top {
    width: 100vw;
    height: 100vh;
    background-image: url('../img/bg.gif');
    background-size: cover;
    position: relative;
    &-name {
      position: absolute;
      top: 20px;
      left: 20px;
      h1 {
        color: $black;
        text-align: right;
        font-size: 30px;
        font-family: 'Poppins', Arial, Helvetica, sans-serif;
        margin: 0;
      }
    }
  }

  @media screen and (max-width: 1000px) {
    .top {
      &-name {
        h1 {
          font-size: 15px;
        }
      }
    }
  }
</style>
