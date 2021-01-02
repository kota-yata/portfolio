<script>
  import '../assets/main.scss';
  import AboutMe from '../components/sections/AboutMe.svelte';
  import TopPage from '../components/sections/TopPage.svelte';
  import MyWorks from '../components/sections/MyWorks.svelte';
  import Footer from '../components/Footer.svelte';

  window.addEventListener('DOMContentLoaded', () => {
    const scroll = new SmoothScroll('a[href*="#"]', {
      speed: 100,
      speedAsDuration: true
    });
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
    <MyWorks />
  </section>
  <Footer />
</main>
