<script>
  import Icon from 'svelte-awesome';
  import { faGithub } from '@fortawesome/free-brands-svg-icons';
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
        <a href="https://github.com/kota-yata"><Icon data={faGithub} scale="3" /></a>
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
          color: $complete-black;
        }
      }
    }
    &-right {
      width: 30vw;
      height: 100vh;
      background: url('../img/me.webp');
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
</style>
