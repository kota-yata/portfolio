<script>
  import NeumoTitle from '../NeumoTitle.svelte';
  import Icon from 'svelte-awesome';
  import { github, twitter } from 'svelte-awesome/icons';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import '../../assets/arrow.scss';

  let isVisible = false;

  onMount(() => {
    isVisible = true;
  });
</script>

{#if isVisible}
  <div id="top_page">
    <span transition:fade={{ delay: 300, duration: 2000 }}>
      <NeumoTitle name="KOTA YATAGAI" />
    </span>
    <div id="icon_container">
      <span transition:fade={{ delay: 3000, duration: 1000 }}>
        <a id="github" href="https://github.com/kota-yata">
          <Icon data={github} scale="3" />
        </a>
      </span>
      <span transition:fade={{ delay: 4000, duration: 1000 }}>
        <a id="twitter" href="https://twitter.com/kota_yata">
          <Icon data={twitter} scale="3" />
        </a>
      </span>
    </div>

    <span transition:fade={{ delay: 5000, duration: 2000 }}>
      <div class="arrow-container">
        <div class="chevron" />
        <div class="chevron" />
        <div class="chevron" />
      </div>
    </span>
  </div>
{/if}

<style lang="scss">
  @import '../../assets/definition.scss';

  #top_page {
    height: 100vh;
    .arrow-container {
      @extend %completely-center;
      top: 95%;
    }
    #icon_container {
      @extend %completely-center;
      top: 50%;
      span {
        a {
          color: $shadow-white1;
          transition: 0.3s;
          &:hover {
            transition: 0.3s;
          }
        }
        #github:hover {
          color: $black;
        }
        #twitter:hover {
          color: $twitter;
        }
        margin-left: 15px;
        margin-right: 15px;
      }
    }
  }
</style>
