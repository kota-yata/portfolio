<script>
  import AboutMe from '../components/sections/AboutMe.svelte';
  import Header from '../components/sections/Header.svelte';
  import MySkills from '../components/sections/MySkills.svelte';
  import MyWorks from '../components/sections/MyWorks.svelte';
  import Profile from '../components/sections/Profile.svelte';
  import { onMount } from 'svelte';
  import Posts from '../components/sections/Posts.svelte';
  import Footer from '../components/sections/Footer.svelte';
  import Extra from '../components/sections/Extra.svelte';

  onMount(() => {
    lazyload();
  });
</script>

<main>
  <Header />
  <div class="contents">
    <div class="contents-right">
      <Profile />
      <Posts />
    </div>
    <div class="contents-left">
      <AboutMe />
      <!--<MySkills />-->
      <MyWorks />
      <Extra />
      <Footer />
    </div>
  </div>
</main>

<style lang="scss">
  @import '../assets/definition.scss';
  main {
    width: 100vw;

    .contents {
      display: flex;
      padding-top: 60px;
      &-right {
        position: fixed;
        right: 0;
        width: 25vw;
        height: calc(100vh - 60px);
      }
      &-left {
        padding: 0 20px;
        width: calc(75vw - 40px);
      }
    }
  }

  @media screen and (max-width: 800px) {
    .contents {
      flex-direction: column;
      &-right {
        position: relative !important;
        width: 100vw !important;
      }
      &-left {
        padding: 0 5px !important;
        width: calc(100vw - 10px) !important;
      }
    }
  }
</style>
