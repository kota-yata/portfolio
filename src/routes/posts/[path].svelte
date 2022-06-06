<script lang="ts" context="module">
  export const load = async ({ page, fetch }) => {
    const url = `/posts/${page.params.path}.json`;
    const res: Response = await fetch(url);
    if (!res.ok) return;
    const post: post = await res.json();
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
  let pocketText: string;
  let instaPaperText: string;
  onMount(() => {
    twitterText = `https://twitter.com/intent/tweet?url=${window.location.href}&text=${post.meta.title}｜Kota Yatagai&related=kota_yata`;
    pocketText = `https://getpocket.com/save?url=${window.location.href}`;
    instaPaperText = `https://instapaper.com/edit?url=${window.location.href}&title=${post.meta.title}`;
  });
</script>

<svelte:head>
  <title>{post.meta.title}</title>
  <meta name="description" content={post.meta.description} />
  <meta property="og:url" content="https://kota-yata.com/posts/{post.path}" />
  <meta property="og:title" content={post.meta.title} />
  <meta property="og:image" content="https://kota-yata.com/media/optimized/{post.meta.ogp}.webp" />
  <meta property="og:description" content={post.meta.description} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@kota_yata" />
</svelte:head>

<Page>
  <div class="info">
    <h1 class="info-title">{post.meta.title}</h1>
    <span class="info-date">{post.meta.date}</span>
    <span class="info-category {className}">{post.meta.category}</span>
  </div>
  <div class="post">
    {@html post.body}
  </div>
  <div class="share">
    <a class="share-twitter" href={twitterText} target="blank"
      ><img alt="Twitter share button" src="/twitter.svg" width="25px" height="25px" /></a
    >
    <a class="share-pocket" href={pocketText} target="blank"
      ><img alt="Pocket share button" src="/pocket.svg" width="25px" height="25px" /></a
    >
    <a class="share-instapaper" href={instaPaperText} target="blank"
      ><img alt="InstaPaper share button" src="/instapaper.svg" width="25px" /></a
    >
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
    text-align: center;
    & > a {
      cursor: pointer;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      padding: 17.5px;
      margin: 0 10px;
      display: inline-block;
    }
    &-twitter {
      background: $twitter;
    }
    &-pocket {
      background: $pocket;
    }
    &-instapaper {
      background: $insta-paper;
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
