<script>
  import Icon from 'svelte-awesome';
  import { faCode, faNetworkWired, faDesktop } from '@fortawesome/free-solid-svg-icons';

  export let icon;
  export let title;
  export let className;
  export let desc;

  let specifiedIcon;
  if (icon === 'faCode') specifiedIcon = faCode;
  if (icon === 'faNetworkWired') specifiedIcon = faNetworkWired;
  if (icon === 'faDesktop') specifiedIcon = faDesktop;
</script>

<div class="skillcard {className}">
  <div class="skillcard-red">
    <div class="skillcard-red-icon">
      <Icon data={specifiedIcon} scale="4" />
    </div>
    <div class="skillcard-red-title">
      <h3>{title}</h3>
    </div>
  </div>
  <div class="skillcard-desc"><span>{desc}</span></div>
</div>

<style lang="scss">
  @import '../assets/definition.scss';

  .skillcard {
    border: 2px $red solid;
    width: 90vw;
    max-width: 400px;
    min-height: 250px;
    margin: 2vw;
    padding: 10px;
    &-red {
      padding-left: 15px;
      color: $red;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      &-title {
        padding: 35px 0 35px 30px;
        h3 {
          margin: 0;
          color: $red;
          font-size: 24px;
        }
      }
    }
    &-desc {
      padding-left: 10px;
      font-family: 'inter', Arial, Helvetica, sans-serif;
      font-size: 18px;
      font-weight: 300;
      line-height: 30px;
    }
  }

  @media screen and (max-width: 1000px) {
    .skillcard {
      &-red {
        &-title {
          padding: 30px 0 30px 15px;
        }
      }
      &-desc {
        font-size: 16px;
        line-height: 25px;
      }
    }
  }
</style>
