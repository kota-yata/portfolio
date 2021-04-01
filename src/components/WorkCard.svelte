<script>
  export let url;
  export let alt;
  export let src;
  export let desc;
</script>

<div class="workcard">
  <div class="workcard-image"><a href={url}><img {alt} class="lazyload" data-src={src} /></a></div>
  <div class="workcard-desc">{desc}</div>
</div>

<style lang="scss">
  @import '../assets/definition.scss';
  .workcard {
    margin: 10px 20px 10px 0;
    background: $black;
    width: 300px;
    min-width: 250px;
    border: 1px $border-gray solid;
    border-radius: 10px;
    &-image {
      a {
        width: 100%;
        img {
          width: 100%;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        }
      }
    }
    &-desc {
      font-family: $generic-fonts-jp;
      font-weight: 300;
      font-size: 14px;
      padding: 10px 10px 20px 10px;
      min-height: 100px;
      line-height: 20px;
      letter-spacing: 2%;
    }
  }
</style>
