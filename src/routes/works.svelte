<script lang="ts">
  import Page from '$lib/page.svelte';
  import WorkCard from '$lib/workCard.svelte';
  import { localization } from '$lib/localization/index';
  import { countryCode } from '$lib/localization/getCountry';
  $: works = localization[$countryCode].works.body;
</script>

<svelte:head>
  <meta property="og:url" content="https://kota-yata.com/works" />
  <meta property="og:title" content="KOTA YATAGAI - 八谷航太" />
  <meta property="og:image" content="https://kota-yata.com/ogp.webp" />
  <meta property="og:description" content="Kota Yatagai, a high school student" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:site" content="@kota_yata" />
</svelte:head>

<Page>
  {#each works as category}
    <h2>{category.name}</h2>
    <div class="work-container">
      {#each category.contents as work}
        <WorkCard {work} color={category.color} />
      {/each}
    </div>
  {/each}
</Page>

<style lang="scss">
  .work-container {
    padding-left: 10px;
  }
</style>
