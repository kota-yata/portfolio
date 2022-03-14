<script lang="ts">
  import { localization } from '$lib/localization/index';
  import { countryCode } from '$lib/localization/getCountry';
  $: profile = localization[$countryCode].profile;
  const icons: { image: string; link: string }[] = [
    { image: '/github.svg', link: 'https://github.com/kota-yata' },
    { image: '/twitter.svg', link: 'https://twitter.com/kota_yata' },
    { image: '/speakerdeck.svg', link: 'https://speakerdeck.com/kota_yata/' },
    { image: '/rss.svg', link: '/rss.xml' }
  ];
  const pages: { name: string; path: string }[] = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about/' },
    { name: 'Works', path: '/works/' },
    { name: 'Contacts', path: '/contacts/' }
  ];
</script>

<div class="container">
  <img alt="myself" src="/me.webp" width="150px" height="150px" />
  <div class="bio">
    <h4>{profile.name}</h4>
    <p>{profile.bio}</p>
  </div>
  <ul>
    {#each pages as page}
      <li><a href={page.path}>{page.name}</a></li>
    {/each}
  </ul>
  <div class="icons">
    {#each icons as icon}
      <a href={icon.link} sveltekit:prefetch><img alt="icon" src={icon.image} width="20px" height="20px" /></a>
    {/each}
  </div>
</div>

<style lang="scss">
  @import '../styles/variable.scss';

  .container {
    min-width: 280px;
    overflow-y: visible;
    & > img {
      border-radius: 50%;
    }
    .bio {
      & > h4 {
        padding: 10px 0 5px 0;
        font-weight: 500;
      }
      & > p {
        font-size: 14px;
        color: $gray;
        width: 100%;
        padding: 0;
      }
    }
    .icons {
      margin-top: 20px;
      & > a {
        padding-right: 15px;
      }
    }
    & > ul {
      list-style-type: none;
      margin: 0;
      padding: 10px 0 0 0;
      & > li {
        padding: 10px 0;
        font-size: 16px;
        font-weight: 600;
        a {
          text-decoration: none;
        }
      }
    }
  }
</style>
