<script lang="ts">
  import Page from '$lib/page.svelte';
  import WorkCard from '$lib/workCard.svelte';
  import { localization } from '$lib/localization/index';
  import { countryCode } from '$lib/localization/getCountry';
  $: works = localization[$countryCode].works.body;
</script>

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
