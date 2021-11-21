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

  @media screen and (max-width: 700px) {
    .container {
      display: block;
      .profile {
        width: 100%;
        text-align: center;
        border: none;
        height: auto;
        padding-bottom: 20px;
        margin-bottom: 20px;
        border-bottom: 1px $dark-gray solid;
      }
      .slot {
        width: 100%;
        padding: 0;
      }
    }
  }
</style>
