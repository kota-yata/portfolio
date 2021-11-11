<script lang="ts">
  import '../styles/app.scss';
</script>

<header>
  <a href="/">Home</a>
  <a href="/trip" sveltekit:prefetch>Trip</a>
</header>

<main>
  <slot />
</main>

<footer>@ 2021 Kota Yatagai</footer>

<style lang="scss">
  @import '../styles/variable.scss';

  header {
    position: fixed;
    width: calc(100vw - 40px);
    text-align: right;
    height: 40px;
    padding: 20px;
    & > a {
      text-decoration: none;
      font-size: 15px;
      color: $gray;
    }
  }
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    width: 100vw;
  }
  footer {
    width: 100vw;
    text-align: center;
    padding-bottom: 10px;
  }
</style>
