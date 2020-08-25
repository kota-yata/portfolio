<script>
  import page from 'page';

  import Home from './pages/Home.svelte';
  import About from './pages/About.svelte';
  import Works from './pages/Works.svelte';

  let current;
  page('/', () => (current = Home));
  page('/about', () => (current = About));
  page('/works', () => (current = Works));
  page.start();
</script>

<svelte:component this={current} />
