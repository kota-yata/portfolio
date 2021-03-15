<div class="aboutlogo">
  <div class="titles">
    <h2>About My Logo</h2>
  </div>
  <div class="aboutlogo-logo scroll-reveal"><img alt="sql logo" src="../svg/sql.svg" /></div>
  <div class="aboutlogo-desc">
    <span>This logo is made by <a href="https://www.fiverr.com/tnhs_project">tnhs_project</a>. Thanks!</span>
  </div>
  <div class="aboutlogo-goodbye">
    <h3>Have a nice day! 👍</h3>
  </div>
</div>

<style lang="scss">
  @import '../../assets/definition.scss';

  .aboutlogo {
    padding: 40px 0;
    &-logo {
      @extend %center-flex;
      margin-top: 10px;
      img {
        width: 150px;
        margin-bottom: 20px;
      }
    }
    &-desc {
      @extend %center-flex;
    }
    &-goodbye {
      margin-top: 10vh;
      h3 {
        font-size: 25px;
      }
    }
  }
</style>
