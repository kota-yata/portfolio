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
  <h2>Skills</h2>
  <div id="skills_container" class="aboutme-containers">
    <SkillCard imgPath="./img/javascript.png" title="JavaScript" description={$_('description.javascript')} />
    <SkillCard imgPath="./img/typescript.png" title="TypeScript" description={$_('description.typescript')} />
    <SkillCard imgPath="./img/svelte.png" title="Svelte" description={$_('description.svelte')} />
    <SkillCard imgPath="./img/html5.png" title="HTML" description={$_('description.html')} />
    <SkillCard imgPath="./img/css3.png" title="CSS" description={$_('description.css')} />
    <SkillCard imgPath="./img/scss.png" title="SCSS" description={$_('description.scss')} />
    <SkillCard imgPath="./img/python.png" title="Python" description={$_('description.python')} />
    <SkillCard imgPath="./img/firebase.png" title="Firebase" description={$_('description.firebase')} />
  </div>
  <h2>Member of...</h2>
  <div id="member_container" class="aboutme-containers">
    <MemberCard
      imgPath="./img/C4J.png"
      title="Code for Japan"
      description={$_('memberof.code_for_japan')}
      url="https://www.code4japan.org/" />
    <MemberCard
      imgPath="./img/sgg.png"
      title="SGG"
      description={$_('memberof.sgg')}
      url="https://qiita.com/organizations/sgg" />
  </div>
  <h2>Education</h2>
  <div id="edu_container" class="aboutme-containers">
    <MemberCard
      imgPath="./img/keio.png"
      title="Keio High"
      description={$_('education.keio')}
      url="https://www.hs.keio.ac.jp/" />
  </div>
</div>

<style lang="scss">
  @import '../../assets/definition.scss';
  #about {
    .aboutme-containers {
      @extend %center;
      padding-bottom: 10px;
    }
    #me_img {
      width: 200px;
      border-radius: 50%;
    }
    #skills_container {
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
    #edu_container {
      padding-bottom: 4em;
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
