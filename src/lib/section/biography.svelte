<script lang="ts">
  import ListSection from '$lib/components/listSection.svelte';
  import type { TextLinks } from '$lib/types';
  import { isMobile } from '../../utils/isMobile';
  import { i18n } from '../../i18n/index';
  import { countryCode } from '../../utils/store';
import { onMount } from 'svelte';
  const links = [
    { name: 'github', url: 'https://github.com/kota-yata' },
    { name: 'spotify', url: 'https://open.spotify.com/user/jgm80x9h1j84hnk4nv3hozlaf?si=149aa7cf000b4948' },
    { name: 'twitter', url: 'https://twitter.com/kota_yata' },
    { name: 'speakerdeck', url: 'https://speakerdeck.com/kota_yata' }
  ];

  let isMobileDevice = true;
  onMount(() => {
    isMobileDevice = isMobile();
  })

  $: bio = i18n[$countryCode].biography as TextLinks[];
  $: qualifications = i18n[$countryCode].qualifications as TextLinks[];
  $: communication = i18n[$countryCode].communication as TextLinks[];
  $: interests = i18n[$countryCode].interests as string;
</script>

<div class="section">
  {#if !isMobileDevice}
  <h2>Biography</h2>
  {/if}
  <div class="main">
    <ListSection texts={bio} />
    <img alt="profile" src="/me.webp" />
  </div>
  <div class="links">
    {#each links as link}
      <a href={link.url}><img alt={link.name} src="/{link.name}.svg" width="30px" height="30px" /></a>
    {/each}
  </div>
  <div class="bios">
    <div class="bios-left">
      <div><ListSection title="Qualifications" texts={qualifications} /></div>
      <div><ListSection title="Communication" texts={communication} /></div>
    </div>
    <div class="bios-right">
      <h3>Interests</h3>
      <div>{@html interests}</div>
    </div>
  </div>
</div>

<style lang="scss">
  .section {
    .main {
      display: flex;
      align-items: center;
      justify-content: space-between;
      img {
        border-radius: 50%;
        filter: contrast(0.9);
        width: 200px;
        height: 200px;
      }
    }
    .links {
      img {
        margin-right: 30px;
      }
    }
    .bios {
      display: flex;
      justify-content: space-between;
      &-left {
        width: 30%;
      }
      &-right {
        width: 60%;
      }
    }
    & > div {
      padding-bottom: 20px;
    }
  }
  @media screen and (max-width: 600px) {
    .section {
      .main {
        flex-direction: column-reverse;
        justify-content: center;
        img {
          width: 150px;
          height: 150px;
          margin-bottom: 30px;
        }
      }
      .links {
        margin-top: 20px;
        text-align: center;
        img {
          margin: 0 15px;
        }
      }
      .bios {
        display: block;
        &-left {
          & > div {
            margin-bottom: 40px;
          }
        }
        &-right {
          font-size: 15px;
        }
        & > div {
          width: 100%;
          margin-bottom: 50px;
        }
      }
    }
  }
</style>
