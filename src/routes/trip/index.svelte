<script context="module" lang="ts">
  import { Image } from '$lib/trip/image';
  import type { LoadInput, LoadOutput } from '@sveltejs/kit';
  
  export const load = async ({ page }: LoadInput): Promise<LoadOutput> => {
    const dirs = Image.getDirsInDir('./static/trip');
    await Promise.all(dirs.map(async (dir) => {
      await Image.optimizeDirectory(`./static/trip/${dir}`);
    })).finally(async () => {
      await Image.closePool();
    });
    return { props: { dummy: 'dummy' } };
  };
</script>

<script lang="ts">
  import Card from '$lib/trip/card.svelte';
  import { localization } from '$lib/localization/index';
  import { countryCode } from '$lib/localization/getCountry';
</script>

<svelte:head>
  <title>Trip Scrap - KOTA YATAGAI</title>
  <meta name="description" content="Photos taken while on trips" />
  <meta property="og:url" content="https://kota-yata.com/trip" />
  <meta property="og:title" content="Trip Scrap - KOTA YATAGAI" />
  <meta property="og:image" content="https://kota-yata.com/ogp.webp" />
  <meta property="og:description" content="Photo gallery by Kota Yatagai" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:site" content="@kota_yata" />
</svelte:head>

<div class="container">
  {#each localization[$countryCode].trip as thumbnail}
    <a href={`/trip/${thumbnail.short}/`} class="card" sveltekit:prefetch
      ><Card
        location={thumbnail.location}
        image={`/trip/${thumbnail.short}/thumbnail.webp`}
        date={thumbnail.date}
        description={thumbnail.description}
      /></a
    >
  {/each}
</div>

<style lang="scss">
  @import '../../styles/variable.scss';

  .container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    .card {
      padding: 40px 0;
      text-decoration: none;
      &:hover {
        opacity: 0.9;
      }
    }
  }
</style>
