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
      imgPath: './img/sha256.webp',
      title: 'Organic-SHA256',
      description: $_('mywork.sha256'),
      url: 'https://github.com/kota-yata/organic-sha256',
      urlMessage: 'Repository'
    },
    {
      imgPath: './img/pics.webp',
      title: 'photo-gallery',
      description: $_('mywork.pics'),
      url: 'https://pics.kota-yata.com',
      urlMessage: 'Gallery'
    },
    {
      imgPath: './img/neornd.webp',
      title: 'neornd',
      description: $_('mywork.neornd'),
      url: 'https://neornd.netlify.app',
      urlMessage: 'Document'
    },
    {
      imgPath: './img/multimd.webp',
      title: 'Multi-MD',
      description: $_('mywork.multimd'),
      url: 'https://multimd.cf',
      urlMessage: 'Web app'
    },
    {
      imgPath: './img/percom.webp',
      title: 'Percom',
      description: $_('mywork.percom'),
      url: 'https://percom.netlify.com',
      urlMessage: 'Document'
    },
    {
      imgPath: './img/iso.webp',
      title: 'iso-639-1-jp',
      description: $_('mywork.iso-639-1-jp'),
      url: 'https://iso-639-1-jp.netlify.com',
      urlMessage: 'Document'
    },
    {
      imgPath: './img/bs.webp',
      title: 'Bullshit-Trivia',
      description: $_('mywork.bullshit-trivia'),
      url: 'https://bullshit-trivia.com',
      urlMessage: 'Website'
    },
    {
      imgPath: './img/kec.webp',
      title: 'KEC',
      description: $_('mywork.kec'),
      url: 'https://github.com/kota-yata/kec',
      urlMessage: 'Repository'
    }
  ];

  const mediaCardList = [
    {
      imgPath: './img/g0v.webp',
      title: 'g0v Summit 2020',
      description: $_('media.g0v'),
      url: 'https://summit.g0v.tw/2020/en/agenda/2020-12-04/5f02d14ee88a4948daf87fb7',
      urlMessage: 'Session page'
    },
    {
      imgPath: './img/sgg-media.webp',
      title: 'SGG忘年LT会2020',
      description: $_('media.sgg-1226'),
      url: 'https://www.youtube.com/watch?v=UYZw55-2kGQ',
      urlMessage: 'Session video'
    },
    {
      imgPath: './img/sgg-media.webp',
      title: '年越しLT for 2021',
      description: $_('media.sgg-1231'),
      url: 'https://www.youtube.com/watch?v=-JLTdhtyDGc',
      urlMessage: 'Session video'
    },
    {
      imgPath: './img/sd.webp',
      title: 'Software Design 2月号',
      description: $_('media.sd202102'),
      url: 'https://gihyo.jp/magazine/SD/archive/2021/202102',
      urlMessage: 'Official page'
    }
  ];

  const blogCardList = [
    { url: 'https://blog.kota-yata.com', imgPath: './img/raccoon.webp' },
    { url: 'https://qiita.com/kota-yata', imgPath: './img/qiita.webp' },
    { url: 'https://zenn.dev/kota_yata', imgPath: './img/zenn.webp' },
    { url: 'https://note.com/kotay', imgPath: './img/note.webp' }
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
  <div class="works-container js-scrollable" id="media_container">
    {#each mediaCardList as { imgPath, title, description, url, urlMessage }}
      <span class="media-contents"><MediaCard {imgPath} {title} {description} {url} {urlMessage} /></span>
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
    padding-bottom: 2em;
    .works-title {
      font-size: 30px;
    }
    .works-container {
      @extend %center;
      margin-bottom: 5em;
    }
  }

  #media_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow-x: scroll;
    width: 100vw;
    height: 300px;
    .media-contents {
      padding: 0 1em;
    }
  }

  @media screen and (max-width: 750px) {
    #media_container {
      height: 55vh;
    }
  }
</style>
