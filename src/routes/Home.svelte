<script>
  import '../assets/main.scss';
  import AboutMe from '../components/sections/AboutMe.svelte';
  import TopPage from '../components/sections/TopPage.svelte';

  import jquery from 'jquery';
  import scrollify from 'jquery-scrollify';
  import MyWorks from '../components/sections/MyWorks.svelte';
  import Footer from '../components/Footer.svelte';

  jquery(function () {
    jquery.scrollify({
      section: '.section',
      easing: 'easeOutExpo',
      scrollSpeed: 200,
      offset: 0,
      updateHash: true,
      scrollbars: true,
      touchScroll: false
    });
  });

  window.addEventListener('DOMContentLoaded', () => {
    const backToTop = document.getElementById('back_to_top');
    backToTop.addEventListener('click', () => {
      jquery.scrollify.move(0);
    });
  });
</script>

<main>
  <section class="section" id="top_page">
    <TopPage />
  </section>
  <section class="section">
    <div id="section_content">
      <AboutMe />
    </div>
  </section>
  <section class="section">
    <MyWorks />
  </section>
  <Footer />
</main>
