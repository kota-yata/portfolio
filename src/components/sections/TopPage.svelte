<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';

  let isVisible = false;

  onMount(() => {
    isVisible = true;
  });
</script>

{#if isVisible}
  <div class="top">
    <div class="top-left">
      <div class="top-left-name" transition:fade={{ delay: 500, duration: 1500 }}>
        <h1>Kota Yatagai</h1>
      </div>
      <div class="top-left-desc" transition:fade={{ delay: 750, duration: 1500 }}>
        <h3>High school student & Front-end developer</h3>
      </div>
      <div class="top-left-icon" transition:fade={{ delay: 1000, duration: 1500 }}>
        <a href="https://github.com/kota-yata"><img class="github" alt="github" src="../svg/github.svg" /></a>
      </div>
    </div>
    <div class="top-right" transition:fly={{ delay: 750, duration: 2000, x: 500 }} />
  </div>
{/if}

<style lang="scss">
  @import '../../assets/definition.scss';

  .top {
    width: 100vw;
    height: 100vh;
    display: flex;
    &-left {
      @extend %center;
      width: 70vw;
      height: 100vh;
      &-name {
        padding-top: 25vh;
        h1 {
          font-size: 100px;
          margin: 0;
        }
      }
      &-desc {
        h3 {
          font-size: 24px;
        }
      }
      &-icon {
        padding-top: 5vh;
        a {
          img {
            width: 60px;
          }
        }
      }
    }
    &-right {
      width: 30vw;
      height: 100vh;
      background-image: url('../img/me.webp');
      background-size: cover;
      background-position: center;
      position: relative;
      height: 100%;
      &::before {
        background-color: rgba(17, 17, 17, 0.6);
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        content: ' ';
      }
    }
  }

  @media screen and (max-width: 1000px) {
    .top {
      flex-direction: column;
      &-left {
        width: 100vw;
        z-index: 3;
        &-name {
          padding-top: 15vh;
          h1 {
            font-size: 70px;
          }
        }
        &-desc {
          h3 {
            font-size: 20px;
            color: $gray;
          }
        }
        &-icon {
          display: none;
        }
      }
      &-right {
        position: absolute;
        width: 60vw;
        z-index: 2;
        height: 35vh;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, -40%);
        &,
        &::before {
          border-top-left-radius: 50px;
          border-bottom-right-radius: 50px;
        }
      }
    }
  }
</style>
