<script>
  const snsList = [
    {
      name: 'github',
      url: 'https://github.com/kota-yata',
      username: '@kota-yata'
    },
    {
      name: 'twitter',
      url: 'https://twitter.com/kota_yata',
      username: '@kota_yata'
    },
    {
      name: 'zenn',
      url: 'https://zenn.dev/kota_yata',
      username: '@kota-yata'
    },
    {
      name: 'qiita',
      url: 'https://qiita.com/kota-yata',
      username: '@kota-yata'
    }
  ];

  const socialDataList = [
    {
      title: 'My Own Blog',
      sentence: 'https://blog.kota-yata.com'
    },
    {
      title: 'Email',
      sentence: 'kota@yatagai.com'
    }
  ];
</script>

<div class="social">
  <div class="social-title titles">
    <h2>Social Identities</h2>
  </div>
  <div class="social-container">
    <div class="social-container-type">
      {#each snsList as { name, url, username }}
        <div class="social-container-type-icons">
          <a href={url}><img alt={name} src="../svg/{name}.svg" /> {username}</a>
        </div>
      {/each}
    </div>
  </div>
  <div class="data-center data social-data">
    {#each socialDataList as { title, sentence }}
      <div><span class="data-red">{title} : </span>{sentence}</div>
    {/each}
  </div>
</div>

<style lang="scss">
  @import '../../assets/definition.scss';

  .social {
    padding-bottom: 70px;
    &-container {
      width: 100vw;
      padding: 40px 0;
      background: $white;
      &-type {
        display: flex;
        justify-content: center;
        padding: 20px 10px;
        flex-wrap: wrap;
        &-icons {
          a {
            @extend %center-flex;

            font-size: 34px;
            font-weight: bold;
            color: $gray;
            padding: 15px 20px;
            margin: 0 15px;
            transition: 0.2s;
            img {
              width: 50px;
              margin-right: 10px;
            }
            &:hover {
              background: $light-white;
              text-decoration: none;
              transition: 0.2s;
            }
          }
        }
      }
    }
    &-data {
      text-align: center;
      width: auto;
    }
  }
</style>
