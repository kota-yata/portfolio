<script lang="ts">
  import ListSection from "$lib/components/listSection.svelte";
  import type { TextLinks } from '$lib/types';
  import { i18n } from '../../i18n/index';
  import { countryCode } from '../../utils/store';

  $: algorithmImplementations = i18n[$countryCode].works.algorithmImplementations as TextLinks[];
  $: webApps = i18n[$countryCode].works.webApps as TextLinks[];
  $: others = i18n[$countryCode].works.others as TextLinks[];
</script>

<div class="container">
  <h2>Works</h2>
  <div class="works">
    <div><ListSection title="Algorithm Implementation" texts={algorithmImplementations}/></div>
    <div><ListSection title="Web Apps" texts={webApps}/></div>
    <div><ListSection title="Others" texts={others}/></div>
  </div>
</div>

<style lang="scss">
  .container {
    margin-bottom: 20vh;
    .works {
      display: flex;
      flex-wrap: wrap;
      & > div {
        margin: 25px;
        max-width: 500px;
      }
    }
  }

  @media screen and (max-width: 600px) {
    .container {
      .works {
        & > div {
          margin: 20px 0;
          max-width: 100%;
        }
      }
    }
  }
</style>
