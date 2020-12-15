<script>
  import NeumoTitle from '../NeumoTitle.svelte';
  import Icon from 'svelte-awesome';
  import { faGithub, faTwitter, faSpeakerDeck } from '@fortawesome/free-brands-svg-icons';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { init } from 'ityped';
  import '../../assets/arrow.scss';

  window.addEventListener('DOMContentLoaded', () => {
    init(document.querySelector('#ityped'), {
      strings: ['Happy Christmas!'],
      startDelay: 2500,
      typeSpeed: 120,
      loop: false,
      backSpeed: 80,
      backDelay: 2000,
      showCursor: true,
      cursorChar: '|'
    });
  });

  let isVisible = false;

  onMount(() => {
    isVisible = true;
  });
</script>

{#if isVisible}
  <div id="top_page">
    <span transition:fade={{ delay: 300, duration: 1000 }}>
      <NeumoTitle name="KOTA YATAGAI" />
    </span>
    <div id="happy_christmas" transition:fade={{ delay: 1250, duration: 700 }}><span id="ityped" /></div>
    <div id="icon_container">
      <span transition:fade={{ delay: 300, duration: 1500 }}>
        <a id="github" href="https://github.com/kota-yata">
          <Icon data={faGithub} scale="3" />
        </a>
      </span>
      <span transition:fade={{ delay: 1500, duration: 700 }}>
        <a id="twitter" href="https://twitter.com/kota_yata">
          <Icon data={faTwitter} scale="3" />
        </a>
      </span>
      <span transition:fade={{ delay: 1750, duration: 700 }}>
        <a id="speakerdeck" href="https://speakerdeck.com/kota_yata">
          <Icon data={faSpeakerDeck} scale="3" />
        </a>
      </span>
    </div>

    <span transition:fade={{ delay: 4000, duration: 2000 }}>
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
    #happy_christmas {
      @extend %completely-center;
      color: $white;
      text-shadow: -1px -1px 2px rgba(255, 255, 255, 0.4), 1px 1px 3px rgba(0, 0, 0, 0.08);
      -webkit-text-stroke: 0.5px $christmas-green;
      font-size: 45px;
      font-family: 'Allura';
      top: 47%;
      @media screen and (max-width: 750px) {
        text-align: center;
        width: 100vw;
        font-size: 25px;
      }
    }
    #icon_container {
      @extend %completely-center;
      @extend %center;
      width: 100vw;
      top: 55%;
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
        #speakerdeck:hover {
          color: $speakerdeck;
        }
        margin-left: 15px;
        margin-right: 15px;
      }
    }
  }
</style>
