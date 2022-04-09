<script context="module" lang="ts">
  import { getPage } from '$lib/pages/getPage';

  export const load = async ({ fetch }): Promise<{ props: { html: localizedProps } }> => {
    const [jp, en] = ['/about-jp.json', '/about-en.json'];
    const jpHTML = await getPage(fetch, jp);
    const enHTML = await getPage(fetch, en);
    const html = {
      JP: jpHTML,
      EN: enHTML
    };
    return { props: { html } };
  };
</script>

<script lang="ts">
  import Page from '$lib/page.svelte';
  import { countryCode } from '$lib/localization/getCountry';
  export let html: localizedProps;

  $: content = html[$countryCode];
</script>

<svelte:head>
  <meta name="description" content="About Kota Yatagai, the author of this blog" />
  <meta property="og:url" content="https://kota-yata.com/about" />
  <meta property="og:title" content="About - KOTA YATAGAI" />
  <meta property="og:image" content="https://kota-yata.com/ogp.webp" />
  <meta property="og:description" content="About Kota Yatagai, the author of this blog" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:site" content="@kota_yata" />
</svelte:head>

<Page>
  <div class="pages">{@html content}</div>
</Page>
