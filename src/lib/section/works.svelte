<script lang="ts">
  import ListSection from "$lib/components/listSection.svelte";
  import type { TextLinks } from '$lib/types';
  import { i18n } from '../../i18n/index';
  import { countryCode } from '../../utils/store';

  $: algorithmImplementations = i18n[$countryCode].works.algorithmImplementations as TextLinks[];
  $: webApps = i18n[$countryCode].works.webApps as TextLinks[];
  $: others = i18n[$countryCode].works.others as TextLinks[];
</script>

<div class="section">
  <h2>Works</h2>
  <div class="section-works">
    <div><ListSection title="Algorithm Implementation" texts={algorithmImplementations}/></div>
    <div><ListSection title="Web Apps" texts={webApps}/></div>
    <div><ListSection title="Others" texts={others}/></div>
  </div>
</div>

<style lang="scss">
  .section {
    &-works {
      display: flex;
      flex-wrap: wrap;
      & > div {
        margin: 25px;
      }
    }
  }
</style>
