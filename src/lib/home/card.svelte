<script lang="ts">
  export let bg: string;
  export let title: string = '';
  export let className = '';
</script>

<div class="square {className}" style="background-color: {bg}; ">
  {#if title}
    <h2>{title}</h2>
  {/if}
  <slot />
</div>

<style lang="scss">
  .square {
    position: relative;
    border-radius: 20px;
    padding: 60px;
    h2 {
      position: absolute;
      top: -37px;
      left: 30px;
    }
  }
</style>
