<script>
  import { Swiper, SwiperSlide } from 'svelte-swiper';

  const options = {
    centeredSlides: true,
    effect: 'coverflow',
    slidesPerView: 1,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: false
    },
    speed: 1000,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false
    },
    loop: true,
    // effect: 'fade',
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      767: {
        slidesPerView: 3,
        spaceBetween: 0
      }
    }
  };

  const IMG_SRC_NPM = './img/npm.jpg';
  const IMG_SRC_MULTIMD = './img/multimd 13.14.44.png';
  const IMG_SRC_NEORND = './img/neornd.jpg';
  const IMG_SRC_SYNCMOVIE = './img/syncmovie.jpg';
  const IMG_SRC_HIYOWC = './img/HIYOWC.png';
</script>

<div class="slide-div">
  <Swiper {options}>
    <SwiperSlide>
      <div class="slide-div">
        <a href="https://www.npmjs.com/settings/kota-yata/packages" target="blank">
          <img class="swiper-img" src={IMG_SRC_NPM} alt="" />
        </a>
      </div>
    </SwiperSlide>
    <SwiperSlide>
      <div class="slide-div">
        <a href="https://multimd.cf" target="blank">
          <img class="swiper-img" src={IMG_SRC_MULTIMD} alt="" />
        </a>
      </div>
    </SwiperSlide>
    <SwiperSlide>
      <div class="slide-div">
        <a href="https://www.npmjs.com/settings/kota-yata/packages" target="blank">
          <img class="swiper-img" src={IMG_SRC_NEORND} alt="" />
        </a>
      </div>
    </SwiperSlide>
    <SwiperSlide>
      <div class="slide-div">
        <a href="https://syncmovie.herokuapp.com" target="blank">
          <img class="swiper-img" src={IMG_SRC_SYNCMOVIE} alt="" />
        </a>
      </div>
    </SwiperSlide>

    <div class="swiper-pagination" slot="pagination" />
    <div class="swiper-button-next" slot="button-next" />
    <div class="swiper-button-prev" slot="button-prev" />
  </Swiper>
</div>

<style lang="scss">
  .slide-div {
    height: 42vh !important;
    display: flex;
    align-items: center;
  }
  .swiper-img {
    margin: 0 auto;
    text-align: center;
    width: 33.3vw;
  }
  @media screen and (max-width: 767px) {
    .slide-div {
      height: 32vh !important;
    }
    .swiper-img {
      width: 100vw;
    }
  }
</style>
