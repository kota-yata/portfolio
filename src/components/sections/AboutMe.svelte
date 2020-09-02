<script>
  import Description from '../Description.svelte';
  import MemberCard from '../MemberCard.svelte';
  import SkillCard from '../SkillCard.svelte';
  import { isMobile } from '../isMobile.js';
  import { _ } from 'svelte-i18n';
  import '../../localization/i18n.js';

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
    <SkillCard imgPath="./img/javascript.png" title="JavaScript" description={$_('description.javascript')} />
    <SkillCard imgPath="./img/typescript.png" title="TypeScript" description={$_('description.typescript')} />
    <SkillCard imgPath="./img/svelte.png" title="Svelte" description={$_('description.svelte')} />
    <SkillCard imgPath="./img/html5.png" title="HTML" description={$_('description.html')} />
    <SkillCard imgPath="./img/css3.png" title="CSS" description={$_('description.css')} />
    <SkillCard imgPath="./img/scss.png" title="SCSS" description={$_('description.scss')} />
    <SkillCard imgPath="./img/python.png" title="Python" description={$_('description.python')} />
    <SkillCard imgPath="./img/unity.jpg" title="Unity" description={$_('description.unity')} />
    <SkillCard imgPath="./img/firebase.png" title="Firebase" description={$_('description.firebase')} />
  </div>
  <h2>Member of...</h2>
  <div id="member_container">
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
