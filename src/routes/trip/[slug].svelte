<script lang="ts">
  import { page } from '$app/stores';
  import { localization } from '$lib/localization/index';
  import { countryCode } from '$lib/localization/getCountry';

  const short = $page.params.slug;

  const found = localization[$countryCode].trip.find((thumbnail) => thumbnail.short === short);
</script>

<svelte:head>
  <title>{found.location} - Trip Scrap</title>
  <meta property="og:url" content={`https://kota-yata.com/trip/${found.short}`} />
  <meta property="og:title" content={`${found.location} - Trip Scrap`} />
  <meta property="og:image" content={`https://kota-yata.com/trip/${found.short}/thumbnail.webp`} />
  <meta property="og:description" content={found.description} />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:site" content="@kota_yata" />
</svelte:head>

<div class="container">
  <h1>{found.location}</h1>
  <div class="images">
    {#each Array(found.image) as _, index}
      <img
        loading="lazy"
        decoding="async"
        alt={`${found.short} ${index}`}
        src={`/trip/${found.short}/optimized/${index}.webp`}
      />
    {/each}
  </div>
</div>

<style lang="scss">
  @import '../../styles/variable.scss';

  .container {
    width: 85vw;
    text-align: center;
    margin: 0 auto;
    h1 {
      font-size: 2.5em;
    }
    .images {
      width: 100%;
      display: inline-block;
      break-inside: avoid;
      column-count: 3;
      column-gap: 20px;
      column-fill: balance;
      img {
        margin: 0 0 20px;
        width: 100%;
      }
    }
  }

  @media screen and (max-width: 1000px) {
    .container {
      .images {
        column-count: 2;
      }
    }
  }
  @media screen and (max-width: 500px) {
    .container {
      h1 {
        font-size: 1.2em;
      }
      .images {
        column-count: 1;
      }
    }
  }
</style>
