<script lang="ts">
import { page } from '$app/stores';
import { thumbnails } from './_data';

const short = $page.params.slug;

const found = thumbnails.find((thumbnail) => thumbnail.short === short);
</script>

<div class="container">
  <h1>{found.location}</h1>
  <div class="images">
    {#each Array(found.image) as _, index}
    <img alt={`${found.short} ${index}`} src={`/trip/${found.short}/${index}.webp`} />
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
