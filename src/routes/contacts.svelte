<script context="module" lang="ts">
  import { getPage } from '$lib/pages/getPage';

  export const load = async ({ fetch }): Promise<{ props: { html: localizedProps } }> => {
    const [jp, en] = ['/contacts-jp.json', '/contacts-en.json'];
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

<Page>
  <div class="pages">{@html content}</div>
</Page>
