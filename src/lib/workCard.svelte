<script lang="ts">
  import { localization } from '$lib/localization/index';
  import type { workBodyContents, localization as localizationObject } from '$lib/localization/type';
  import { countryCode } from '$lib/getCountry';
  export let work: workBodyContents;
  export let color: string;

  const local: localizationObject = localization[$countryCode];
</script>

<div class="work">
  <div class="basic" style="border-bottom: 1px {color} solid;">
    <h3>{work.title}</h3>
    <a href="https://github.com/kota-yata/{work.github}"
      ><img alt="github link" src="/github.svg" width="30px" height="30px" /></a
    >
  </div>
  <p>{local.works.th.lang} : {work.lang}</p>
  <p>{local.works.th.date} : {work.date}</p>
  <p>{local.works.th.note} : {work.note}</p>
  {#if work.articles}
    {#each work.articles as article}
      <p><a href={article.url}>{article.text}</a></p>
    {/each}
  {/if}
</div>

<style lang="scss">
  .work {
    margin-bottom: 30px;
    & > .basic {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      padding-bottom: 5px;
      margin-bottom: 15px;
      & > h3 {
        margin: 0;
        padding: 0;
      }
    }
    & > p {
      padding: 2px 0;
    }
  }
</style>
