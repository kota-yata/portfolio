<script>
  export let words;
  export let size;
  export let paddingTop;
</script>

<div style="padding-top: {paddingTop};"><span style="font-size:{size};">{words}</span></div>

<style lang="scss">
  @import '../assets/definition.scss';

  div {
    @extend %center;
    span {
      @extend %gradient-text;
      user-select: none;
      letter-spacing: 1px;
      font-weight: bold;
      text-shadow: -3px -3px 5px rgba(255, 255, 255, 0.4), 3px 3px 7px rgba(0, 0, 0, 0.08);
      caret-color: #262626;
    }
  }
</style>
