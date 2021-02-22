<script>
  export let name;
  import { init } from 'ityped';
  window.addEventListener('DOMContentLoaded', () => {
    init(document.querySelector('#ityped_title'), {
      strings: [name],
      startDelay: 2500,
      typeSpeed: 200,
      loop: false,
      backSpeed: 80,
      backDelay: 2000,
      showCursor: true,
      cursorChar: '|'
    });
  });
</script>

<div><span id="ityped_title" /></div>

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
