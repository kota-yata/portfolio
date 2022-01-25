<script lang="ts">
  import { onMount } from 'svelte';
  import PostCard from './posts/postCard.svelte';
  import { getPosts } from './posts/getPosts';

  export let category: string;
  export let description: string;

  $: posts = [];

  onMount(async () => {
    posts = await getPosts(fetch, 0, category);
  });
</script>

<section>
  <h2>{category}</h2>
  <p>{description}</p>
  <div class="post-container">
    {#each posts as post}
      <div class="post"><PostCard meta={post} displayEyecatch /></div>
    {/each}
  </div>
</section>

<style lang="scss">
  section {
    margin: 40px 0;
    & > p {
      padding-bottom: 40px;
    }
    .post-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      width: calc(100% - 10px);
      padding-left: 10px;
      .post {
        width: 100%;
        max-width: 370px;
        margin: 20px 30px 20px 0;
      }
    }
  }

  @media screen and (max-width: 700px), screen and (orientation: portrait) {
    .post-container {
      width: 100% !important;
      padding-left: 0 !important;
      .post {
        margin: 0 auto !important;
      }
    }
  }
</style>
