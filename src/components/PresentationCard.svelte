<script>
  export let id;
</script>

<div class="presentation">
  <iframe
    defer
    width="400px"
    height="225px"
    class="speakerdeck-embed"
    src="https://speakerdeck.com/player/{id}"
    title="Speaker Deck"
    frameborder="0"
    allowfullscreen
    scrolling="no"
    allow="encrypted-media" />
</div>

<style lang="scss">
  @import '../assets/definition.scss';
  .presentation {
    margin: 10px 10px 10px 0;
    iframe {
      border-radius: 5px;
      border: 1px $border-gray solid;
    }
  }
</style>
