<script lang="ts">
  import { getClassName } from './className';

  export let meta: postMeta = {} as postMeta;
  export let displayEyecatch = false;
  const className = getClassName(meta.meta.category);
</script>

<div class="container">
  {#if displayEyecatch}
    <picture width="100%" height="200px">
      <source srcset={`/media/optimized-mobile/${meta.meta.ogp}.webp`} media="(max-width: 500px)" type="image/webp">
      <source srcset={`/media/optimized/${meta.meta.ogp}.webp`} type="image/webp">
      <img alt="eyecatch" src={`/media/optimized/${meta.meta.ogp}`} width="100%" height="200px" />
    </picture>
  {/if}
  <div class="info">
    <span class="info-category {className}">{meta.meta.category}</span>
    <span class="info-date">{meta.meta.date}</span>
  </div>
  <h3><a href="/posts/{meta.path}/">{meta.meta.title}</a></h3>
  <p>{meta.meta.description}</p>
</div>

<style lang="scss">
  @import '../../styles/variable.scss';
  .container {
    width: 100%;
    & > picture > img {
      object-fit: cover;
    }
    .info {
      padding: 10px 0 0 0;
      font-size: 14px;
      font-weight: 600;
      &-category {
        padding-right: 5px;
      }
      &-date {
        color: $gray;
      }
    }
    & > h3 {
      padding: 5px 0 10px 0;
      & > a {
        text-decoration: none;
      }
    }
    & > p {
      padding: 0;
    }
  }
</style>
