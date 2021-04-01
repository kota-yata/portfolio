<script>
  const extras = [
    {
      name: 'License',
      value: 'Fundamental Engineering Japan'
    },
    {
      name: 'Award',
      value: 'EPSON HackTrek 2021 First Prize 🥇'
    },
    {
      name: 'Favorite',
      value: 'Cycling, Rebuild.fm, KANDYTOWN, Eminem'
    },
    {
      name: 'Email',
      value: 'kota@yatagai.com'
    }
  ];
</script>

<div class="container container-info extra">
  <div class="container-title extra-title">Extra info</div>
  <div class="extra-data">
    {#each extras as { name, value }}
      <div><span class="extra-data-title">{name} : </span>{value}</div>
    {/each}
  </div>
</div>

<style lang="scss">
  @import '../../assets/definition.scss';

  .extra {
    background: $light-green;
    margin-bottom: 30px;
    &-title {
      color: $dark-black;
    }
    &-data {
      margin-top: 25px;
      line-height: 40px;
      color: $black;
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 10px;
      &-title {
        color: $dark-black;
      }
    }
  }

  @media screen and (max-width: 800px) {
    .extra {
      padding-left: 15px;
      padding-right: 10px;
      &-data {
        font-size: 13px;
        &-title {
          font-size: 15px;
        }
      }
    }
  }
</style>
