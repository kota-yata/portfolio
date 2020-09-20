<script>
  import Description from '../Description.svelte';
  import { Swiper, SwiperSlide } from 'svelte-swiper';
  import WorkCard from '../WorkCard.svelte';
  import { isMobile } from '../../../scripts/isMobile.js';
  import BlogCard from '../BlogCard.svelte';
  import { _ } from 'svelte-i18n';
  import '../../localization/i18n.js';

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
        slidesPerView: 3,
        spaceBetween: 10
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
          description={$_('mywork.neornd')}
          url="https://neornd.kota-yata.com/"
          urlMessage="Document" />
      </SwiperSlide>
      <SwiperSlide>
        <WorkCard
          imgPath="./img/multimd 13.14.44.png"
          title="Multi-MD"
          description={$_('mywork.multimd')}
          url="https://multimd.cf"
          urlMessage="Web app" />
      </SwiperSlide>
      <SwiperSlide>
        <WorkCard
          imgPath="./img/percom.jpg"
          title="Percom"
          description={$_('mywork.percom')}
          url="https://percom.kota-yata.com/"
          urlMessage="Document" />
      </SwiperSlide>
      <SwiperSlide>
        <WorkCard
          imgPath="./img/syncmovie.jpg"
          title="Syncmovie"
          description={$_('mywork.syncmovie')}
          url="https://syncmovie.herokuapp.com"
          urlMessage="Web app" />
      </SwiperSlide>
      <SwiperSlide>
        <WorkCard
          imgPath="./img/iso.png"
          title="iso-639-1-jp"
          description={$_('mywork.iso-639-1-jp')}
          url="https://iso-639-1-jp.kota-yata.com"
          urlMessage="Document" />
      </SwiperSlide>
      <SwiperSlide>
        <WorkCard
          imgPath="./img/bs.png"
          title="Bullshit-Trivia"
          description={$_('mywork.bullshit-trivia')}
          url="https://bullshit-trivia.com"
          urlMessage="Website" />
      </SwiperSlide>

      <div class="swiper-pagination" slot="pagination" />
      <div class="swiper-button-next" slot="button-next" />
      <div class="swiper-button-prev" slot="button-prev" />
    </Swiper>
  </div>
  <h1 id="tech_blog">Tech Blog</h1>
  <div id="blog_container">
    <BlogCard url="https://blog.kota-yata.com" imgPath="./img/innout.png" />
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
