<script lang="ts">
  import { countryCode } from '$lib/getCountry';
import { onMount } from 'svelte';

  onMount(() => {
    const countryCodeFromSessionStorage = sessionStorage.getItem('countryCode');
    if (countryCodeFromSessionStorage) $countryCode = countryCodeFromSessionStorage;
  })

  import '../styles/app.scss';
</script>

<header>
  <select name="language" bind:value={$countryCode} on:change={() => { sessionStorage.setItem('countryCode', $countryCode) }}>
    <option value="JP">Japanese</option>
    <option value="EN">English</option>
  </select>
  <a href="/trip" sveltekit:prefetch><img alt="to trip page" src="/aircraft.svg" width="30px" height="30px" /></a>
</header>

<main>
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
    & > select {
      background: transparent;
      color: $dark-gray;
      font-weight: 700;
      border: none;
      margin-right: 20px;
    }
    & > a {
      text-decoration: none;
      font-size: 15px;
      color: $gray;
    }
  }
  main {
    margin: 0 auto;
    width: 85%;
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
