<script>
  export let imgPath;
  export let title;
</script>

<span class="skill-card">
  <div class="card">
    <div class="img_and_title">
      <img alt="icon" class="lazyload" data-src={imgPath} />
      <span class="title">{title}</span>
      <br />
    </div>
  </div>
</span>

<style lang="scss">
  @import '../assets/definition.scss';

  .skill-card {
    display: inline-block;
    margin: 20px;
    .card {
      position: relative;
      width: 20em;
      padding: 0.5em;
      border-radius: 20px;
      background: $white;
      box-shadow: 5px 5px 7px $shadow-white1, -5px -5px 7px $shadow-white2;
      .img_and_title {
        display: flex;
        padding: 5px;
        img {
          margin: 10px;
          display: inline-block;
          width: 60px;
          height: 60px;
          object-fit: contain;
        }
        .title {
          display: flex;
          align-items: center;
          padding-left: 2px;
          font-size: 2em;
          font-weight: 500;
        }
      }
    }
  }

  @media screen and (max-width: 750px) {
    .skill-card {
      margin: 10px 0px;
      .card {
        .img_and_title {
          padding: 0px;
          img {
            margin: 5px;
            width: 50px;
            height: 50px;
          }
          .title {
            font-size: 1.7em;
          }
        }
      }
    }
  }
</style>
