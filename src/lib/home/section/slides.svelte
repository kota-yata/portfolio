<script lang="ts">
  const slides: { image: string; url: string }[] = [
    { image: 'tco', url: 'https://speakerdeck.com/kota_yata/mo-wei-hu-bichu-sizui-shi-hua-tojavascript' },
    { image: 'principle', url: 'https://speakerdeck.com/kota_yata/principle-of-ssi' },
    { image: 'history', url: 'https://speakerdeck.com/kota_yata/nian-yue-siaidenteitei' },
    { image: 'g0v', url: 'https://speakerdeck.com/kota_yata/what-are-the-interns-at-code-for-japan-doing' }
  ];
</script>

<section>
  <h2>Slides</h2>
  <div>
    {#each slides as slide}
      <a href={slide.url}><img alt="slide" src="/slides/{slide.image}.webp" width="360px" /></a>
    {/each}
  </div>
</section>

<style lang="scss">
  @import '../../../styles/variable.scss';

  section {
    width: 85%;
    & > div {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      img {
        border: 1px $light-gray solid;
        border-radius: 20px;
        margin: 20px;
      }
    }
  }
</style>
