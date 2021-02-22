<script>
  import Description from '../Description.svelte';
  import MemberCard from '../MemberCard.svelte';
  import SkillCard from '../SkillCard.svelte';
  import { isMobile } from '../../../scripts/isMobile.js';
  import { _ } from 'svelte-i18n';
  import '../../localization/i18n.js';
  import InfraCard from '../InfraCard.svelte';

  const isTouchable = isMobile();

  document.addEventListener('DOMContentLoaded', () => {
    const parsedInterests = $_('interests');
    const sentenceContainer = document.getElementById('interests_container_sentence');
    sentenceContainer.innerHTML = parsedInterests;
  });

  const languageCardList = [
    { imgPath: './img/javascript.webp', title: 'JavaScript', description: $_('description.javascript') },
    { imgPath: './img/typescript.webp', title: 'TypeScript', description: $_('description.typescript') },
    { imgPath: './img/svelte.webp', title: 'Svelte', description: $_('description.svelte') },
    { imgPath: './img/html5.webp', title: 'HTML', description: $_('description.html') },
    { imgPath: './img/css3.webp', title: 'CSS', description: $_('description.css') },
    { imgPath: './img/scss.webp', title: 'SCSS', description: $_('description.scss') },
    { imgPath: './img/python.webp', title: 'Python', description: $_('description.python') }
  ];

  const toolCardList = [
    { imgPath: './img/firebase.webp', title: 'Firebase' },
    { imgPath: './img/git.webp', title: 'Git' },
    { imgPath: './img/vagrant.webp', title: 'Vagrant' },
    { imgPath: './img/heroku.webp', title: 'Heroku' },
    { imgPath: './img/netlify.webp', title: 'Netlify' },
    { imgPath: './img/vercel.webp', title: 'Vercel' }
  ];

  const memberCardList = [
    {
      imgPath: './img/C4J.webp',
      title: 'Code for Japan',
      description: $_('memberof.code_for_japan'),
      url: 'https://www.code4japan.org/'
    },
    {
      imgPath: './img/sgg.webp',
      title: 'SGG',
      description: $_('memberof.sgg'),
      url: 'https://qiita.com/organizations/sgg'
    }
  ];
</script>

<div id="about">
  {#if isTouchable}
    <Description words="About Me" size="50px" paddingTop="20px" />
    <h3>High school student, Front-end Developer</h3>
  {:else}
    <Description words="About Me" size="100px" paddingTop="20px" />
    <h2>High school student, Front-end Developer</h2>
  {/if}
  <div id="me_container" class="aboutme-containers">
    <img id="me_img" alt="profile" class="lazyload" data-src="./img/me.webp" />
  </div>
  <div id="interests_container_wrap" class="aboutme-containers">
    <div id="interests_container">
      <h2>Study & Interests</h2>
      <div id="interests_container_sentence" />
    </div>
  </div>
  <h2>Development</h2>
  <div id="languages_container" class="aboutme-containers">
    {#each languageCardList as { imgPath, title, description }, i}
      <SkillCard {imgPath} {title} {description} />
    {/each}
  </div>
  <h2>Infrastructure</h2>
  <div id="infra_container" class="aboutme-containers">
    {#each toolCardList as { imgPath, title }, i}
      <InfraCard {imgPath} {title} />
    {/each}
  </div>
  <h2>Member of...</h2>
  <div id="member_container" class="aboutme-containers">
    {#each memberCardList as { imgPath, title, description, url }, i}
      <MemberCard {imgPath} {title} {description} {url} />
    {/each}
  </div>
</div>

<style lang="scss">
  @import '../../assets/definition.scss';
  #about {
    margin-bottom: 1em;
    .aboutme-containers {
      @extend %center;
      margin-bottom: 1em;
      padding-bottom: 1em;
    }
    #me_img {
      @extend %gradient-border;
      padding: 10px;
      width: 200px;
      border-radius: 50%;
      box-shadow: $neumorphismic-shadow;
    }
    #languages_container,
    #infra_container {
      width: 100vw;
    }
    #interests_container_wrap {
      padding-bottom: 15px;
      margin-bottom: 2em;
      background: $fusion-gradient;
      width: 50vw;
      #interests_container {
        background: $black;
        padding: 2px 0px;
        font-weight: bold;
        h2 {
          margin-top: 10px;
        }
        div {
          text-align: left;
        }
      }
    }
    #member_container {
      padding-bottom: 6em;
    }
  }

  @media screen and (max-width: 1000px) {
    #interests_container_wrap {
      width: 70vw !important;
    }
  }
  @media screen and (max-width: 750px) {
    #interests_container_wrap {
      width: 80vw !important;
    }
  }
</style>
