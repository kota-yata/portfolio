<script>
  import Description from '../Description.svelte';
  import { Swiper, SwiperSlide } from 'svelte-swiper';
  import WorkCard from '../WorkCard.svelte';
  import { isMobile } from '../isMobile.js';
  import BlogCard from '../BlogCard.svelte';
  import AboutMe from './AboutMe.svelte';

  const isTouchable = isMobile();

  const options = {
    centeredSlides: true,
    slidesPerView: 1,
    speed: 4000,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      750: {
        slidesPerView: 3
      }
    }
  };
</script>

<div id="works">
  {#if isTouchable}
    <Description words="My Works" size="50px" paddingTop="20px" />
  {:else}
    <Description words="My Works" size="100px" paddingTop="20px" />
  {/if}
  <div class="slide-div">
    <Swiper {options}>
      <SwiperSlide>
        <WorkCard
          imgPath="./img/neornd.jpg"
          title="neornd"
          description="neornd makes Math.random() simple and safe by using crypto module. You can get a random number
          with number of decimal place you want easily."
          url="https://neornd.netlify.app/"
          urlMessage="Document" />
      </SwiperSlide>
      <SwiperSlide>
        <WorkCard
          imgPath="./img/multimd 13.14.44.png"
          title="Multi-MD"
          description="Multi-MD is a markdown web editor. On Chrome, you can overwrite you local markdown file. PWA is
          available."
          url="https://multimd.cf"
          urlMessage="Web app" />
      </SwiperSlide>
      <SwiperSlide>
        <WorkCard
          imgPath="./img/percom.jpg"
          title="Percom"
          description="Percom is a calculation npm module that is to simplify the calculation of permutations and
          combinations"
          url="https://percom.netlify.app/"
          urlMessage="Document" />
      </SwiperSlide>
      <SwiperSlide>
        <WorkCard
          imgPath="./img/syncmovie.jpg"
          title="Syncmovie"
          description="On Syncmovie, you can watch YouTube videos with someone, and it will sync together. Besides, You
          can see how many people are connecting."
          url="https://syncmovie.herokuapp.com"
          urlMessage="Web app" />
      </SwiperSlide>
      <SwiperSlide>
        <WorkCard
          imgPath="./img/iso.png"
          title="iso-639-1-jp"
          description="Conversion module of ISO-639 language code to Japanese name."
          url="https://iso-639-1-jp.netlify.app/"
          urlMessage="Document" />
      </SwiperSlide>

      <div class="swiper-pagination" slot="pagination" />
      <div class="swiper-button-next" slot="button-next" />
      <div class="swiper-button-prev" slot="button-prev" />
    </Swiper>
  </div>
  <h1 id="tech_blog">Tech Blog</h1>
  <div id="blog_container">
    <BlogCard url="https://blog.kotayatagai.cf" imgPath="./img/innout.png" />
    <BlogCard url="https://qiita.com/kota-yata" imgPath="./img/qiita.png" />
  </div>
</div>

<style lang="scss">
  @import '../../assets/definition.scss';

  #tech_blog {
    margin-bottom: 5px;
    font-size: 30px;
  }
  #blog_container {
    @extend %center;
    margin-bottom: 5em;
  }
</style>
