<script>
  export let url;
  export let imgPath;
</script>

<a href={url}>
  <div class="blog-container"><img alt="blog" class="lazyload" data-src={imgPath} /></div>
</a>

<style lang="scss">
  @import '../assets/definition.scss';

  .blog-container {
    @extend %center;
    margin-left: 5px;
    margin-right: 5px;
    display: inline-block;
    position: relative;
    border-radius: 50%;
    width: 15vw;
    height: 15vw;
    background: $light-black;
    box-shadow: inset $neumorphismic-shadow;
    transition: 0.3s;
    img {
      position: absolute;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      width: 10vw;
      height: 10vw;
      object-fit: contain;
    }
    &:hover {
      background: $sentence-white;
      transition: 0.3s;
    }
  }

  @media screen and (max-width: 750px) {
    .blog-container {
      width: 40vw;
      height: 40vw;
      img {
        width: 25vw;
        height: 25vw;
      }
    }
  }
</style>
