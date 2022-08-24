<script lang="ts">
  import { isMobile } from '../../utils/isMobile';
</script>

<div class="section">
  <h1>KOTA YATAGAI</h1>
  {#if isMobile}
  <p>I think, therefore I am.</p>
  {/if}
</div>

<style lang="scss">
  .section {
    display: block;
    h1 {
      padding-top: 35vh;
    }
    p {
      font-weight: 600;
    }
  }

  @media screen and (max-width: 600px) {
    .section {
      text-align: center;
    }
  }
</style>
