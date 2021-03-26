<script>
  import '../assets/main.scss';
  import AboutMe from '../components/sections/AboutMe.svelte';
  import TopPage from '../components/sections/TopPage.svelte';
  import MyWorks from '../components/sections/MyWorks.svelte';
  import MySkills from '../components/sections/MySkills.svelte';
  import Social from '../components/sections/Social.svelte';
  import AboutMyLogo from '../components/sections/AboutMyLogo.svelte';
  import Footer from '../components/sections/Footer.svelte';

  const optsForNormal = {
    delay: 50,
    duration: 2000,
    useDelay: 'once',
    mobile: false
  };

  const optsForSlideLeft = {
    delay: 100,
    distance: '100px',
    duration: 2000,
    origin: 'left',
    useDelay: 'once',
    mobile: false
  };

  const optsForSlideRight = {
    delay: 100,
    distance: '100px',
    duration: 2000,
    origin: 'right',
    useDelay: 'once',
    mobile: false
  };

  window.addEventListener('DOMContentLoaded', () => {
    ScrollReveal().reveal('.scroll-reveal-slide-left', optsForSlideLeft);
    ScrollReveal().reveal('.scroll-reveal-slide-right', optsForSlideRight);
    ScrollReveal().reveal('.scroll-reveal', optsForNormal);
    lazyload();
  });
</script>

<main>
  <section class="section" id="top_page">
    <TopPage />
  </section>
  <section class="section">
    <AboutMe />
  </section>
  <section class="section">
    <MySkills />
  </section>
  <section class="section">
    <MyWorks />
  </section>
  <section class="section">
    <Social />
  </section>
  <section class="section">
    <AboutMyLogo />
  </section>
  <section class="section">
    <Footer />
  </section>
</main>

<style lang="scss">
  main {
    backdrop-filter: blur(5px);
  }
</style>
