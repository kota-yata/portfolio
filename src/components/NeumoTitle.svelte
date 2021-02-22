<script>
  import { fade } from 'svelte/transition';
  export let name;
</script>

<div><span transition:fade={{ delay: 1000, duration: 700 }}>{name}</span></div>

<style lang="scss">
  @import '../assets/definition.scss';

  div {
    @extend %completely-center;
    @extend %center;
    width: 100vw;
    span {
      @extend %gradient-text;
      user-select: none;
      font-weight: bold;
      font-size: 10vw;
    }
  }

  @media screen and (max-width: 750px) {
    div {
      top: 30% !important;
      span {
        font-size: 20vw !important;
      }
    }
  }
</style>
