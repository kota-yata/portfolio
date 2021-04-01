<div class="profile">
  <div class="profile-face" oncontextmenu="return false;">
    <img alt="my face" class="lazyload" data-src="../img/me.webp" />
  </div>
  <div class="profile-social">
    <div><a href="https://zenn.dev/kota_yata"><img alt="zenn" src="../svg/zenn.svg" /></a></div>
    <div><a href="https://t.me/kota_yata"><img alt="telegram" src="../svg/telegram.svg" /></a></div>
    <div><a href="https://github.com/kota-yata"><img alt="github" src="../svg/github.svg" /></a></div>
    <div><a href="https://www.twitter.com/kota_yata"><img alt="twitter" src="../svg/twitter.svg" /></a></div>
  </div>
</div>

<style lang="scss">
  @import '../../assets/definition.scss';
  .profile {
    @extend %center;

    padding-top: 25px;
    width: 100%;
    box-sizing: border-box;
    height: 30vh;
    &-face {
      @extend %center;

      width: 100%;
      img {
        border-radius: 50%;
        height: calc(30vh - 40px - 20px - 25px);
        filter: contrast(0.8);
        border: 1px $green solid;
        box-shadow: 0 0 10px 2px rgba($color: $green, $alpha: 0.25);
        pointer-events: none;
      }
    }
    &-social {
      @extend %center;

      width: 40%;
      height: 40px;
      min-width: 150px;
      background: $white;
      text-align: center;
      padding: 0 10px;
      margin-top: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50px;
      div {
        margin: 0 10px;
        a {
          display: flex;
          align-items: center;
          img {
            width: 20px;
            height: 20px;
          }
        }
      }
    }
  }
</style>
