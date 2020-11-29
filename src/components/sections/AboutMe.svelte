<script>
  import Description from '../Description.svelte';
  import MemberCard from '../MemberCard.svelte';
  import SkillCard from '../SkillCard.svelte';
  import { isMobile } from '../../../scripts/isMobile.js';
  import { _ } from 'svelte-i18n';
  import '../../localization/i18n.js';

  const isTouchable = isMobile();

  document.addEventListener('DOMContentLoaded', () => {
    const parsedInterests = $_('interests');
    const sentenceContainer = document.getElementById('interests_container_sentence');
    sentenceContainer.innerHTML = parsedInterests;
  });

  const languageCardList = [
    { imgPath: './img/javascript.png', title: 'JavaScript', description: $_('description.javascript') },
    { imgPath: './img/typescript.png', title: 'TypeScript', description: $_('description.typescript') },
    { imgPath: './img/svelte.png', title: 'Svelte', description: $_('description.svelte') },
    { imgPath: './img/html5.png', title: 'HTML', description: $_('description.html') },
    { imgPath: './img/css3.png', title: 'CSS', description: $_('description.css') },
    { imgPath: './img/python.png', title: 'Python', description: $_('description.python') }
  ];

  const toolCardList = [
    { imgPath: './img/firebase.png', title: 'Firebase', description: $_('description.firebase') },
    { imgPath: './img/docker.png', title: 'Docker', description: $_('description.docker') },
    { imgPath: './img/git.png', title: 'Git & GitHub', description: $_('description.git') },
    { imgPath: './img/vagrant.png', title: 'Vagrant', description: $_('description.vagrant') },
    { imgPath: './img/heroku.png', title: 'Heroku', description: $_('description.heroku') }
  ];

  const memberCardList = [
    {
      imgPath: './img/C4J.png',
      title: 'Code for Japan',
      description: $_('memberof.code_for_japan'),
      url: 'https://www.code4japan.org/'
    },
    {
      imgPath: './img/sgg.png',
      title: 'SGG',
      description: $_('memberof.sgg'),
      url: 'https://qiita.com/organizations/sgg'
    },
    {
      imgPath: './img/keio.png',
      title: 'Keio High',
      description: $_('education.keio'),
      url: 'https://www.hs.keio.ac.jp/'
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
    <img id="me_img" alt="" src="./img/me.jpeg" />
  </div>
  <div id="interests_container" class="aboutme-containers">
    <h2>Study & Interests</h2>
    <div id="interests_container_sentence" />
  </div>
  <h2>Languages</h2>
  <div id="languages_container" class="aboutme-containers">
    {#each languageCardList as { imgPath, title, description }, i}
      <SkillCard {imgPath} {title} {description} />
    {/each}
  </div>
  <h2>Tools</h2>
  <div id="tools_container" class="aboutme-containers">
    {#each toolCardList as { imgPath, title, description }, i}
      <SkillCard {imgPath} {title} {description} />
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
    padding-bottom: 8em;
    margin-bottom: 2em;
    .aboutme-containers {
      @extend %center;
      padding-bottom: 10px;
    }
    #me_img {
      padding: 10px;
      width: 200px;
      border-radius: 50%;
      box-shadow: -8px -8px 12px rgba(255, 255, 255, 0.4), 8px 8px 12px rgba(0, 0, 0, 0.08);
    }
    #languages_container {
      width: 100vw;
    }
    #interests_container {
      margin-top: 1em;
      margin-bottom: 3em;
      border-bottom: 3px $h-color solid;
      border-top: 3px $h-color solid;
      width: 50vw;
      font-weight: bold;
      color: $light-black;
      h2 {
        margin-top: 10px;
      }
      div {
        text-align: left;
      }
    }
    #member_container {
      padding-bottom: 6em;
    }
  }

  @media screen and (max-width: 1000px) {
    #interests_container {
      width: 70vw !important;
    }
  }
  @media screen and (max-width: 750px) {
    #interests_container {
      width: 80vw !important;
    }
  }
</style>
