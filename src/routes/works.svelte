<script lang="ts">
  import Page from '$lib/page.svelte';
  import WorkCard from '$lib/workCard.svelte';
  import { onMount } from 'svelte';
  import { getCountry } from '$lib/getCountry';
  import { works as enWorks } from '$lib/pages/works/en';
  import { works as jpWorks } from '$lib/pages/works/jp';
  let works = enWorks;
  onMount(async () => {
    const countryCode = await getCountry();
    if (countryCode === 'JP') works = jpWorks;
  });
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
