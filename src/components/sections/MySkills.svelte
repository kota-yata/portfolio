<script>
  import SkillCard from '../SkillCard.svelte';

  const skillCardList = [
    {
      icon: 'faCode',
      title: 'Web Development',
      className: 'scroll-reveal-slide-left',
      desc:
        'I’m familiar enough with HTML/CSS, also can develop website or web app using Nuxt.js and Svelte.js with TypeScript. FYI, this website is made with Svelte.js :)'
    },
    {
      icon: 'faNetworkWired',
      title: 'Infrastructure',
      className: 'scroll-reveal',
      desc:
        'I usually use Firebase as the infrastructure of my project. Sometimes I use AWS or GCP on the team project, but I prefer Firebase.'
    },
    {
      icon: 'faDesktop',
      title: 'Other Skills',
      className: 'scroll-reveal-slide-right',
      desc:
        'As a hobby, I have set up NAS server on Rasberry Pi 4. I have been trying Go and C++ in order to develop image processing CLI and my own OS in the future.'
    }
  ];

  const skillsDataList = [
    {
      title: 'Languages',
      sentence: 'JavaScript, TypeScript, Japanese'
    },
    {
      title: 'Infrastructure',
      sentence: 'Firebase, Vagrant, Docker'
    },
    {
      title: 'OS',
      sentence: 'Mac, Windows, Ubuntu, Alpine Linux , Rasberry Pi OS'
    },
    {
      title: 'Award',
      sentence: 'EPSON HackTrek 2021 1st prize'
    },
    {
      title: 'Licenses',
      sentence: '基本情報技術者'
    }
  ];
</script>

<div class="skills">
  <div class="skills-title titles">
    <h2>My Skills</h2>
  </div>
  <div class="skills-card">
    {#each skillCardList as { icon, title, className, desc }}
      <span class="skills-card-container"><SkillCard {icon} {title} {className} {desc} /></span>
    {/each}
  </div>
  <div class="skills-data">
    {#each skillsDataList as { title, sentence }}
      <div><span class="skills-data-red">{title} : </span>{sentence}</div>
    {/each}
  </div>
</div>

<style lang="scss">
  @import '../../assets/definition.scss';

  .skills {
    width: 100vw;
    height: 100vh;
    &-card {
      @extend %center-flex;
      flex-wrap: wrap;
    }
    &-data {
      @extend %center-flex;
      width: 40vw;
      min-width: 700px;
      flex-direction: column;
      padding-top: 5vh;
      margin: 0 auto;
      line-height: 60px;
      font-size: 24px;
      font-weight: bold;
      &-red {
        color: $red;
      }
    }
  }
</style>
