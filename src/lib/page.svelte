<script lang="ts">
  import Profile from './profile.svelte';
</script>

<div class="container">
  <div class="profile"><Profile /></div>
  <div class="slot"><slot /></div>
</div>

<style lang="scss">
  @import '../styles/variable.scss';

  .container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .profile {
      width: 280px;
      height: 400px;
      border-right: 1px $dark-gray solid;
    }
    .slot {
      width: calc(100% - 280px - 100px);
      padding-left: 100px;
    }
  }
</style>
