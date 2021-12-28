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
  import { getCountry } from '$lib/getCountry';
  import { onMount } from 'svelte';
  export let html: localizedProps;

  let content: string = html.EN;
  onMount(async () => {
    const countryCode = await getCountry();
    if (countryCode === 'JP') content = html.JP;
  });
</script>

<Page>
  <div class="pages">{@html content}</div>
</Page>
