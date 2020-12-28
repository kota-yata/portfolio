<script>
  import Description from '../Description.svelte';
  import { Swiper, SwiperSlide } from 'svelte-swiper';
  import MediaCard from '../MediaCard.svelte';
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

  const workCardList = [
    {
      imgPath: './img/neornd.png',
      title: 'neornd',
      description: $_('mywork.neornd'),
      url: 'https://neornd.kota-yata.com',
      urlMessage: 'Document'
    },
    {
      imgPath: './img/multimd.png',
      title: 'Multi-MD',
      description: $_('mywork.multimd'),
      url: 'https://multimd.cf',
      urlMessage: 'Web app'
    },
    {
      imgPath: './img/percom.png',
      title: 'Percom',
      description: $_('mywork.percom'),
      url: 'https://percom.kota-yata.com',
      urlMessage: 'Document'
    },
    {
      imgPath: './img/syncmovie.png',
      title: 'Syncmovie',
      description: $_('mywork.syncmovie'),
      url: 'https://syncmovie.herokuapp.com',
      urlMessage: 'Web app'
    },
    {
      imgPath: './img/iso.png',
      title: 'iso-639-1-jp',
      description: $_('mywork.iso-639-1-jp'),
      url: 'https://iso-639-1-jp.kota-yata.com',
      urlMessage: 'Document'
    },
    {
      imgPath: './img/bs.png',
      title: 'Bullshit-Trivia',
      description: $_('mywork.bullshit-trivia'),
      url: 'https://bullshit-trivia.com',
      urlMessage: 'Website'
    },
    {
      imgPath: './img/kec.png',
      title: 'KEC',
      description: $_('mywork.kec'),
      url: 'https://github.com/kota-yata/kec',
      urlMessage: 'Repository'
    }
  ];

  const mediaCardList = [
    {
      imgPath: './img/g0v.png',
      title: 'g0v Summit 2020',
      description: $_('media.g0v'),
      url: 'https://summit.g0v.tw/2020/en/agenda/2020-12-04/5f02d14ee88a4948daf87fb7',
      urlMessage: 'My session page'
    }
    /* {
      imgPath: './img/ccc.png',
      title: 'CCC U-22',
      description: $_('media.g0v'),
      url: 'https://summit.g0v.tw/2020/en/agenda/2020-12-04/5f02d14ee88a4948daf87fb7',
      urlMessage: 'My session page'
    },*/
  ];

  const blogCardList = [
    { url: 'https://blog.kota-yata.com', imgPath: './img/innout.png' },
    { url: 'https://qiita.com/kota-yata', imgPath: './img/qiita.png' },
    { url: 'https://zenn.dev/kota_yata', imgPath: './img/zenn.png' },
    { url: 'https://note.com/kotay', imgPath: './img/note.png' }
  ];
</script>

<div id="works">
  {#if isTouchable}
    <Description words="My Works" size="50px" paddingTop="20px" />
  {:else}
    <Description words="My Works" size="100px" paddingTop="20px" />
  {/if}
  <div class="slide-div">
    <Swiper {options}>
      {#each workCardList as { imgPath, title, description, url, urlMessage }}
        <SwiperSlide>
          <WorkCard {imgPath} {title} {description} {url} {urlMessage} />
        </SwiperSlide>
      {/each}
      <div class="swiper-pagination" slot="pagination" />
      <div class="swiper-button-next" slot="button-next" />
      <div class="swiper-button-prev" slot="button-prev" />
    </Swiper>
  </div>
  <h1 class="works-title">Media</h1>
  <div class="works-container" id="media_container">
    {#each mediaCardList as { imgPath, title, description, url, urlMessage }}
      <MediaCard {imgPath} {title} {description} {url} {urlMessage} />
    {/each}
  </div>
  <h1 class="works-title">Tech Blogs</h1>
  <div class="works-container">
    {#each blogCardList as { url, imgPath }}
      <BlogCard {url} {imgPath} />
    {/each}
  </div>
</div>

<style lang="scss">
  @import '../../assets/definition.scss';

  #works {
    padding-bottom: 5em;
    .works-title {
      font-size: 30px;
    }
    .works-container {
      @extend %center;
      margin-bottom: 5em;
    }
  }

  /* #media_container {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-x: scroll;
    height: 300px;
  } */
</style>
