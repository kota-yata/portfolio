<header>
  <div class="name">KOTA YATAGAI</div>
  <div class="quote">Getting ready to study abroad ! 🚀</div>
</header>

<style lang="scss">
  @import '../../assets/definition.scss';
  $padding-x: 20px;
  header {
    width: calc(100vw - #{$padding-x} * 2);
    background: $black;
    height: 60px;
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 $padding-x;
    font-weight: bold;
    color: $gray;
    .name {
      font-size: 24px;
    }
    .quote {
      font-size: 18px;
    }
  }
  @media screen and (max-width: 800px) {
    header {
      justify-content: center;
      .quote {
        display: none;
      }
    }
  }
</style>
