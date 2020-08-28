<script>
  import Description from '../Description.svelte';
  import MemberCard from '../MemberCard.svelte';
  import SkillCard from '../SkillCard.svelte';
  import { isMobile } from '../isMobile.js';

  const isTouchable = isMobile();
</script>

<div id="about">
  {#if isTouchable}
    <Description words="About Me" size="50px" paddingTop="20px" />
    <h3>High school student; Web Developer</h3>
  {:else}
    <Description words="About Me" size="100px" paddingTop="20px" />
    <h2>High school student; Web Developer</h2>
  {/if}
  <div id="skills_container">
    <SkillCard
      imgPath="./img/javascript.png"
      title="JavaScript"
      description="I can develop npm packages and web apps with JavaScript, and understand general specifications such
      as spread syntax and type behavior." />
    <SkillCard
      imgPath="./img/typescript.png"
      title="TypeScript"
      description="I don't have works using TypeScript now, but I can develop web apps with TypeScript instead of
      JavaScript, or in Svelte project." />
    <SkillCard
      imgPath="./img/svelte.png"
      title="Svelte"
      description="I can develop websites and web apps like this portfolio website with Svelte. I'm learning Sapper now." />
    <SkillCard
      imgPath="./img/html5.png"
      title="HTML"
      description="I'm not currently use HTML to make website, but I almost understand the specifications of HTML5 such
      as SRI and API" />
    <SkillCard imgPath="./img/css3.png" title="CSS" description="I love flexbox. That's all." />
    <SkillCard
      imgPath="./img/scss.png"
      title="SCSS"
      description="I almost use SCSS for stylesheet currently. I understand general specifications like mixin and
      template." />
    <SkillCard
      imgPath="./img/ruby.png"
      title="Ruby"
      description="I can develop Web scraping system with Nokogiri on Rails." />
    <SkillCard
      imgPath="./img/python.png"
      title="Python"
      description="I can develop Web scraping system with Selenium. Automate the Boring Stuff with Python - Someone" />
    <SkillCard
      imgPath="./img/unity.jpg"
      title="Unity"
      description="I can develop 3D game with Unity. I'm not so familiar with how to develop 2D game, but I'm learning
      it now." />
    <SkillCard
      imgPath="./img/firebase.png"
      title="Firebase"
      description="I'm not currently using Firebase Authentication cuz I want to implement auth system BY MYSELF. Anyway
      I love Firebase rather than AWS." />
    <SkillCard
      imgPath="./img/aws.png"
      title="Lambda & S3"
      description="I can use Lambda for automation, S3 for storage. I'm also learning other sevices such as Cloud9." />
  </div>
  <h2>Member of...</h2>
  <div id="member_container">
    <MemberCard
      imgPath="./img/C4J.png"
      title="Code for Japan"
      description="Working as a event management intern. I'm running Civictech Challenge Cup 2020 now!"
      url="https://www.code4japan.org/" />
    <MemberCard
      imgPath="./img/sgg.png"
      title="SGG"
      description="The student organization in Japan. If you want to join SGG, contact me on Twitter!"
      url="https://qiita.com/organizations/sgg" />
  </div>
</div>

<style lang="scss">
  @import '../../assets/definition.scss';
  #about {
    #skills_container {
      @extend %center;
      width: 100vw;
      padding-bottom: 10px;
    }
    #member_container {
      @extend %center;
      padding-bottom: 3em;
    }
  }
</style>
