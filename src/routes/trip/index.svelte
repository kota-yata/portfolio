<script lang="ts">
  import Card from '$lib/trip/card.svelte';
  import { thumbnails } from './_data';
</script>

<svelte:head>
  <title>Trip Scrap | KOTA YATAGAI</title>
</svelte:head>

<div class="container">
  {#each thumbnails as thumbnail}
    <a href={`/trip/${thumbnail.short}`} class="card" sveltekit:prefetch
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
