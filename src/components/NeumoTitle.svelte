<script>
  export let name;
</script>

<div>
  <span>{name}</span>
</div>

<style lang="scss">
  @import '../assets/definition.scss';

  div {
    @extend %completely-center;
    span {
      user-select: none;
      color: $white;
      font-weight: bold;
      font-size: 150px;
      text-shadow: -8px -8px 12px rgba(255, 255, 255, 0.4), 8px 8px 12px rgba(0, 0, 0, 0.08);
      caret-color: #262626;
    }
  }
</style>
