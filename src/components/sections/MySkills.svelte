<script>
  import SkillCard from '../SkillCard.svelte';
  import { _ } from 'svelte-i18n';
  import '../../localization/i18n.js';

  const skills = [
    {
      name: '☕️ JS & TS',
      desc: $_('skills.jsts')
    },
    {
      name: '🔬 Svelte',
      desc: $_('skills.svelte')
    },
    {
      name: '⛑ Nuxt',
      desc: $_('skills.nuxt')
    },
    {
      name: '🔥️ Firebase',
      desc: $_('skills.firebase')
    },
    {
      name: '🍓️ Rasberry Pi',
      desc: $_('skills.ras')
    },
    {
      name: '🎙 Go',
      desc: $_('skills.go')
    }
  ];
</script>

<div class="myskills">
  {#each skills as { name, desc }, i}
    <SkillCard {name} {desc} order={i} />
  {/each}
</div>

<style lang="scss">
  @import '../../assets/definition.scss';
  .myskills {
    width: 100%;
    margin: 30px 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
</style>
