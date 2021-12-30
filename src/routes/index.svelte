<script context="module" lang="ts">
  export const load = async ({ fetch }): Promise<postsProps> => {
    const posts = await getPosts(fetch, 3);
    return { props: { posts } };
  };
</script>

<script lang="ts">
  import { getPosts } from '$lib/posts/getPosts';
  import Page from '$lib/page.svelte';
  import PostCard from '$lib/posts/postCard.svelte';
  import TopicSection from '$lib/topicSection.svelte';
  import { localization } from '$lib/localization/index';
  import { countryCode } from '$lib/localization/getCountry';

  $: topics = localization[$countryCode].topics;

  export let posts;
</script>

<Page>
  <h2 class="slot-h2">Latest 3 Posts</h2>
  {#each posts as post}
    <div class="slot-post"><PostCard meta={post} /></div>
  {/each}
</Page>
<div class="to-posts"><a href="/posts">View All Posts</a></div>
{#each topics as topic}
  <TopicSection category={topic.category} description={topic.description} />
{/each}

<style lang="scss">
  @import '../styles/variable.scss';
  .slot-h2 {
    padding-top: 0;
  }
  .slot-post {
    margin-bottom: 40px;
  }
  .to-posts {
    margin-top: 30px;
    width: 100%;
    text-align: center;
    & > a {
      padding: 15px 40px;
      border-radius: 500px;
      background: $white;
      color: $black;
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
    }
  }
</style>
