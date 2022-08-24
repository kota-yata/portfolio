<script lang="ts">
import { onMount } from 'svelte';

  import '../styles/app.scss';
  import { countryCode } from '../utils/store';

  onMount(() => {
    const storedCountryCode = sessionStorage.getItem('countryCode');
    if (storedCountryCode) {
      $countryCode = storedCountryCode;
    } else {
      const lang = window.navigator.language;
      $countryCode = lang === 'ja' ? 'JP' : 'EN';
    }
  })
</script>

<header>
  <select
    name="language"
    bind:value={$countryCode}
    on:change={() => {
      sessionStorage.setItem('countryCode', $countryCode);
    }}
  >
    <option value="JP">Japanese</option>
    <option value="EN">English</option>
  </select>
</header>

<main>
  <slot />
</main>

<footer>@ 2021 Kota Yatagai</footer>

<style lang="scss">
  @import '../styles/variable.scss';
  header {
    position: absolute;
    top: 0;
    right: 0;
    padding: 15px;
  }
  main {
    margin: 0 auto;
    width: 85%;
    max-width: 1500px;
  }
  footer {
    width: 100vw;
    text-align: center;
    padding-bottom: 10px;
  }
</style>
