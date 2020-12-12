<script>
  export let name;
</script>

<div><span>{name}</span></div>

<style lang="scss">
  @import '../assets/definition.scss';

  div {
    @extend %completely-center;
    @extend %center;
    width: 100vw;
    span {
      user-select: none;
      color: $white;
      font-weight: bold;
      font-size: 10vw;
      text-shadow: -8px -8px 12px rgba(255, 255, 255, 0.4), 8px 8px 12px rgba(0, 0, 0, 0.08);
      caret-color: #262626;
    }
  }

  @media screen and (max-width: 750px) {
    div {
      top: 30% !important;
      span {
        font-size: 20vw !important;
        text-shadow: -3px -3px 5px rgba(255, 255, 255, 0.4), 3px 3px 7px rgba(0, 0, 0, 0.08) !important;
      }
    }
  }
</style>
