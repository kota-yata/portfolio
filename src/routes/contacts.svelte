<script context="module" lang="ts">
  import { getPage } from '$lib/pages/getPage';

  export const load = async ({ fetch }): Promise<{ props: { html: string } }> => {
    const url = '/contacts.json';
    const html = await getPage(fetch, url);
    return html;
  };
</script>

<script lang="ts">
  import Page from '$lib/page.svelte';
  export let html;
</script>

<Page>
  <div class="pages">{@html html}</div>
</Page>
