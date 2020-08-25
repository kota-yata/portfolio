<script>
  export let href;
  export let name;
</script>

<a {href}>
  <div class="btn_intr">{name}</div>
</a>

<style lang="scss">
  @import '../assets/definition.scss';

  a {
    color: $white;
    font-size: 20px;
    text-align: center;
    margin: 0 auto;
    .btn_intr {
      @extend %button;
      width: 20vw;
      height: 10vh;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
    }
    &:hover {
      text-decoration: none;
    }
  }
</style>
