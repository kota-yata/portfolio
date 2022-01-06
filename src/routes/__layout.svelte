<script lang="ts">
  import { countryCode } from '$lib/localization/getCountry';
  import { localization } from '$lib/localization/index';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  $: dialog = localization[$countryCode].dialog;

  onMount(() => {
    const countryCodeFromSessionStorage = sessionStorage.getItem('countryCode');
    if (countryCodeFromSessionStorage) $countryCode = countryCodeFromSessionStorage;
  });

  const triggerDialog = () => {
    isDialogVisible = true;
    setTimeout(() => { isDialogVisible = false; }, 6000);
  };

  let isDialogVisible = false;

  import '../styles/app.scss';
</script>

<header>
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
  <a href="/trip" sveltekit:prefetch><img alt="to trip page" src="/airplane.svg" width="50px" height="50px" /></a>
</header>

<main>
  {#if isDialogVisible}
  <div class="dialog" transition:fade>{dialog}</div>
  {/if}
  <slot />
</main>

<footer>@ 2021 Kota Yatagai</footer>

<style lang="scss">
  @import '../styles/variable.scss';

  header {
    width: calc(100vw - 40px);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 40px;
    padding: 20px;
    & > a {
      text-decoration: none;
      font-size: 15px;
    }
  }
  main {
    margin: 0 auto;
    width: 85%;
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
