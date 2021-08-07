<script lang="ts">
  import '../../styles/app.scss';
</script>

<header>
  <div>Trip Scrap</div>
  <div>
    <a href="/">Home</a>
    <a href="/trip">Trip</a>
  </div>
</header>

<main>
  <slot />
</main>

<footer>@ 2021 Kota Yatagai</footer>

<style lang="scss">
  @import '../../styles/variable.scss';

  header {
    margin: 0;
    width: calc(100vw - 40px);
    height: 40px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    a {
      text-decoration: none;
      font-size: 15px;
      color: $gray;
    }
  }
  main {
    margin: 0 auto;
    width: 100%;
  }
  footer {
    width: 100vw;
    text-align: center;
    padding: 40px 0 10px 0;
  }
</style>
