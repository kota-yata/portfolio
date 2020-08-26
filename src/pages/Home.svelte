<script>
  import '../assets/main.scss';
  import Button from '../components/Button.svelte';
  import Description from '../components/Description.svelte';
  import TopPage from '../components/TopPage.svelte';
  import WorksGallery from '../components/WorksGallery.svelte';
</script>

<main>
  <TopPage />
  <div id="second_page">
    <Description words="About Me" size="70px" />
  </div>
  <WorksGallery />
</main>
