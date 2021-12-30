<script lang="ts">
import { countryCode } from '$lib/localization/getCountry';
import { onMount } from 'svelte';

  import '../../styles/app.scss';

  onMount(() => {
    const countryCodeFromSessionStorage = sessionStorage.getItem('countryCode');
    if (countryCodeFromSessionStorage) $countryCode = countryCodeFromSessionStorage;
  });
</script>

<header>
  <div class="title">Trip Scrap | KOTA YATAGAI</div>
  <div>
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
    <a href="/">Home</a>
  </div>
</header>

<main>
  <slot />
</main>

<footer>@ 2021 Kota Yatagai</footer>

<style lang="scss">
  @import '../../styles/variable.scss';

  header {
    margin: 0;
    width: calc(100vw - 40px);
    height: 40px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    .title {
      font-weight: 600;
    }
    a {
      text-decoration: none;
      font-size: 15px;
      color: $gray;
    }
  }
  main {
    margin: 0 auto;
    width: 100%;
  }
  footer {
    width: 100vw;
    text-align: center;
    padding: 40px 0 10px 0;
  }
</style>
