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
    <div class="top-inner">
      <div class="top-inner-name" transition:fade={{ delay: 1500, duration: 1500 }}>
        <h1>Kota Yatagai</h1>
        <span class="top-inner-name-desc">High school student && Front-end Developer</span>
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  @import '../../assets/definition.scss';

  .top {
    width: 100vw;
    height: 100vh;
    background-image: url('../img/bg.webp');
    background-size: cover;
    position: relative;
    &-inner {
      width: 100%;
      height: 100%;
      backdrop-filter: blur(20px);
      &-name {
        @extend %center;

        padding-top: 20vh;
        h1 {
          color: $light-white;
          opacity: 0.5;
          font-size: 100px;
          font-family: 'Poppins', Arial, Helvetica, sans-serif;
        }
        &-desc {
          color: $black;
          opacity: 0.8;
          font-size: 30px;
          font-family: 'Poppins', Arial, Helvetica, sans-serif;
        }
      }
    }
  }

  @media screen and (max-width: 1000px) {
    .top {
      &-inner-name {
        h1 {
          font-size: 30px;
        }
        &-desc {
          font-size: 15px;
        }
      }
    }
  }
</style>
