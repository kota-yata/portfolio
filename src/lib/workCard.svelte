<script lang="ts">
  export let work: work;
  export let color: string;
</script>

<div class="work">
  <div class="basic" style="border-bottom: 1px {color} solid;">
    <h3>{work.title}</h3>
    <a href="https://github.com/kota-yata/{work.github}"
      ><img alt="github link" src="/github.svg" width="30px" height="30px" /></a
    >
  </div>
  <p>言語 : {work.lang}</p>
  <p>日付 : {work.date}</p>
  <p>情報 : {work.note}</p>
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
