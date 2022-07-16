<script lang="ts">
  import { countryCode } from '$lib/localization/getCountry';
  import { localization } from '$lib/localization/index';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  $: dialog = localization[$countryCode].dialog;

  onMount(() => {
    const countryCodeFromSessionStorage = sessionStorage.getItem('countryCode');
    if (countryCodeFromSessionStorage) {
      $countryCode = countryCodeFromSessionStorage;
    } else {
      const lang = window.navigator.language;
      $countryCode = lang === 'ja' ? 'JP' : 'EN';
    }
  });

  const triggerDialog = () => {
    isDialogVisible = true;
    setTimeout(() => {
      isDialogVisible = false;
    }, 6000);
  };

  let isDialogVisible = false;

  import '../../styles/app.scss';
  import '../../styles/fonts.scss';
</script>

<header>
  <div class="left">
    <a href="/">KOTA YATAGAI</a>
  </div>
  <div class="right">
    <select
      name="language"
      bind:value={$countryCode}
      on:change={() => {
        sessionStorage.setItem('countryCode', $countryCode);
        triggerDialog();
      }}
    >
      <option value="JP">Japanese</option>
      <option value="EN">English</option>
    </select>
    <a href="/trip" sveltekit:prefetch><img alt="to trip page" src="/airplane.svg" width="30px" height="30px" /></a>
  </div>
</header>

<main>
  {#if isDialogVisible}
    <div class="dialog" transition:fade>{dialog}</div>
  {/if}
  <slot />
</main>

<footer>@ 2021 Kota Yatagai</footer>

<style lang="scss">
  @import '../../styles/variable.scss';

  header {
    width: calc(100vw - 40px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    padding: 20px;
    & > .left {
      & > a {
        text-decoration: none;
        font-weight: 600;
        font-size: 20px;
        color: $gray;
      }
    }
    & > .right {
      display: flex;
      align-items: center;
      & > a {
        text-decoration: none;
        font-size: 15px;
      }
    }
  }
  main {
    margin: 0 auto;
    width: 100%;
    .dialog {
      width: calc(100vw - 20px);
      padding: 20px 10px;
      position: fixed;
      bottom: 0;
      left: 0;
      background: $orange;
      color: $black;
    }
  }
  footer {
    width: 100vw;
    text-align: center;
    padding: 100px 0 10px 0;
  }

  @media screen and (max-width: 600px) {
    main {
      width: 95%;
    }
  }
</style>
