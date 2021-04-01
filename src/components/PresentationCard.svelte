<script>
  export let id;
</script>

<div class="presentation">
  <iframe
    defer
    width="400px"
    height="225px"
    src="https://www.youtube.com/embed/{id}"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen />
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
