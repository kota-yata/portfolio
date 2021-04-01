<script>
  import { _ } from 'svelte-i18n';
  import '../../localization/i18n.js';

  const extras = [
    {
      name: 'License',
      value: $_('extra.license')
    },
    {
      name: 'Award',
      value: $_('extra.award')
    },
    {
      name: 'Favorite',
      value: $_('extra.favorite')
    },
    {
      name: 'Email',
      value: $_('extra.email')
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
    margin-bottom: 30px;
    &-data {
      margin-top: 25px;
      line-height: 40px;
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 10px;
      &-title {
        color: $gray;
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
