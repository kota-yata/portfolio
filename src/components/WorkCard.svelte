<script>
  export let url;
  export let alt;
  export let src;
  export let className;
  export let desc;
</script>

<div class="workcard {className}">
  <div class="workcard-image"><a href={url}><img {alt} {src} /></a></div>
  <div class="workcard-desc"><span>{desc}</span></div>
</div>

<style lang="scss">
  @import '../assets/definition.scss';

  .workcard {
    margin: 0 auto;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
    border: 2px $red solid;
    flex-direction: column;
    width: 90vw;
    max-width: 400px;
    height: 380px;
    pointer-events: none;
    transition: 0.2s;
    &-image {
      width: 100%;
      pointer-events: auto;
      img {
        width: 100%;
      }
    }
    &-desc {
      text-align: left;
      padding: 10px 10px 15px 10px;
      font-family: 'inter';
      font-weight: 300;
      color: $white;
      line-height: 25px;
      letter-spacing: 2%;
    }
    &:hover {
      box-shadow: 6px 7px 0px 0px $red;
      transition: 0.2s;
    }
  }
</style>
