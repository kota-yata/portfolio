<script lang="ts" context="module">
  export const load = async ({ page, fetch }) => {
    const url = `/posts/${page.params.path}.json`;
    const res: Response = await fetch(url);
    if (!res.ok) return;
    const post = await res.json();
    return { props: { post } };
  };
</script>

<script lang="ts">
  import Page from '$lib/page.svelte';
  import { getClassName } from '$lib/posts/className';
import { onMount } from 'svelte';
  export let post: post;
  const className = getClassName(post.meta.category);
  let twitterText: string;
  onMount(() => {
    twitterText = `
  https://twitter.com/intent/tweet?url=${window.location.href}&text=${post.meta.title}｜Kota Yatagai&related=kota_yata
  `
  })
</script>

<svelte:head>
  <title>{post.meta.title}</title>
  <meta name="description" content="{post.meta.description}">
  <meta property="og:url" content="https://kota-yata.com" />
  <meta property="og:title" content="{post.meta.title}" />
  <meta property="og:image" content="https://kota-yata.com{post.meta.ogp}" />
  <meta property="og:description" content="{post.meta.description}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@kota_yata" />
</svelte:head>

<Page>
  <div class="info">
    <h1 class="info-title">{post.meta.title}</h1>
    <span class="info-date">{post.meta.date}</span>
    <span class="info-category {className}">{post.meta.category}</span>
  </div>
  {@html post.body}
  <div class="share">
    <a class="share-twitter" href="{twitterText}" target="blank"><img alt="Twitter share button" src="/twitter.svg" width="25px" height="25px" /></a>
  </div>
</Page>

<style lang="scss">
  @import '../../styles/variable.scss';

  .info {
    padding-bottom: 50px;
    font-weight: 600;
    &-title {
      padding: 0 0 10px 0;
      font-size: 48px;
    }
    &-date {
      color: $gray;
      padding-right: 10px;
    }
  }
  .share {
    width: 100%;
    margin-top: 50px;
    & > a {
      cursor: pointer;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
    }
    &-twitter {
      background: $twitter;
    }
  }

  @media screen and (max-width: 700px) {
    .info {
      &-title {
        font-size: 35px;
      }
    }
  }
</style>
