<script>
  import SkillCard from '../SkillCard.svelte';

  const skills = [
    {
      name: '☕️ JS & TS',
      desc:
        'My main language. I usually use them for front-end, and also when learning algorithm in order not to make it hard to learn because of language.'
    },
    {
      name: '🔬 Svelte',
      desc:
        'Since the ecosystem is not expanded as much as Nuxt.js, I usually use Svelte for small website such as this portfolio website.'
    },
    {
      name: '⛑ Nuxt',
      desc:
        'I used Nuxt.js for the first time at the hackathon held this spring, means I’m not familiar with this framwork yet, but I like to use this as the main framework.'
    },
    {
      name: '🔥️ Firebase',
      desc:
        'Firestore is totally suitable for me since I like KVS. Currently I’m working on the project which use AWS cognito, but I usually use Firebase Authentication for authentication backend.'
    },
    {
      name: '🍓️ Rasberry Pi',
      desc:
        'As a hobby, I’ve set up my own NAS server on Rasberry Pi 4. I’m going to set up VPN server to connect to NAS outside my house.'
    },
    {
      name: '🎙 Go',
      desc:
        'I made integrated RSS feed of my blogs (note, Zenn, blog.kota-yata.com), and image file extension converter in Go. I’m using Go just as a hobby, but I hope I can use this language as my main one someday.'
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
