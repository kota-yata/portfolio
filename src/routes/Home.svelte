<script>
  import '../assets/main.scss';
  import AboutMe from '../components/sections/AboutMe.svelte';
  import TopPage from '../components/sections/TopPage.svelte';
  import jquery from 'jquery';
  import scrollify from 'jquery-scrollify';
  import MyWorks from '../components/sections/MyWorks.svelte';
  import Footer from '../components/Footer.svelte';

  // IEとSafariでは全画面スクロールを無効にする
  const userAgent = window.navigator.userAgent.toLowerCase();
  const isIE = userAgent.indexOf('msie') !== -1 || userAgent.indexOf('Trident') !== -1;
  const isSafari = userAgent.indexOf('safari') !== -1 && userAgent.indexOf('chrome') === -1;

  if (!isIE && !isSafari) {
    jquery(function () {
      jquery.scrollify({
        section: '.section',
        easing: 'easeOutExpo',
        scrollSpeed: 200,
        offset: 0,
        updateHash: false,
        scrollbars: true,
        touchScroll: false
      });
    });
  }

  window.addEventListener('DOMContentLoaded', () => {
    const backToTop = document.getElementById('back_to_top');
    backToTop.addEventListener('click', () => {
      jquery.scrollify.move(0);
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
