<script>
  import { _ } from 'svelte-i18n';
  import '../../localization/i18n.js';

  const paragraph = $_('intro').split('\n');
</script>

<div class="container container-large container-info aboutme">
  <div class="container-title">About Me</div>
  <div class="container-desc aboutme-desc">
    {#each paragraph as words}<span>{words}</span><br /><br />{/each}
  </div>
</div>

<style lang="scss">
  @import '../../assets/definition.scss';

  .aboutme {
    margin-top: 25px;
    &-desc {
      line-height: 30px;
      font-size: 16px;
    }
  }
</style>
