<script lang="ts">
  const pages = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Works', path: '/works' },
    { name: 'Contacts', path: '/contacts' }
  ];
</script>

<div class="container">
  <img alt="myself" src="/me.webp" width="150px" height="150px" />
  <div class="bio">
    <h4>八谷航太</h4>
    <p>18yo / ソフトウェア開発者</p>
  </div>
  <ul>
    {#each pages as page}
    <li><a href={page.path}>{page.name}</a></li>
    {/each}
  </ul>
</div>

<style lang="scss">
  @import '../styles/variable.scss';

  .container {
    min-width: 280px;
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
