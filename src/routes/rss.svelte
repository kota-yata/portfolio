<script context="module" lang="ts">
  import { DOMParser } from 'xmldom';

  export const load = async ({ fetch }): Promise<{ props: { xml: Document } }> => {
    const res = await fetch('/rss.xml');
    const text = res.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "application/xml");
    return { props: { xml } };
  };
</script>

<script lang="ts">
  export let xml: Document;
</script>

xml
