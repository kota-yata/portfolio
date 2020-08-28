<script>
  import Icon from 'svelte-awesome';
  import { externalLink, github } from 'svelte-awesome/icons';

  export let imgPath;
  export let title;
  export let description;
  export let url;
  export let urlMessage;
</script>

<div class="work-card">
  <div>
    <img class="work-img" alt="img" src={imgPath} />
  </div>
  <div class="work-sentences">
    <div class="work-title">
      <span>{title}</span>
      <a href="https://github.com/kota-yata/{title}">
        <Icon data={github} scale="2" />
      </a>
    </div>
    <span>{description}</span>
    <span class="work-url">
      <a href={url} target="blank">
        <Icon data={externalLink} class="external-link" />
        {urlMessage}
      </a>
    </span>
  </div>
</div>

<style lang="scss">
  @import '../assets/definition.scss';

  .work-card {
    position: relative;
    height: 55vh !important;
    width: 30vw;
    margin-left: 1.5vw;
    margin-right: 1.5vw;
    border-radius: 20px;
    background: $white;
    box-shadow: 5px 5px 7px $shadow-white1, -5px -5px 7px $shadow-white2;
    .work-sentences {
      padding: 1em;
    }
    .work-img {
      border-top-right-radius: 20px;
      border-top-left-radius: 20px;
      display: block;
      margin: 0 auto;
      text-align: center;
      width: 30vw;
    }
    .work-title {
      font-size: 30px;
      font-weight: 500;
      a {
        color: $black;
        transition: 0.3s;
        &:hover {
          color: $light-black;
          transition: 0.3s;
        }
      }
    }
    .work-url {
      position: absolute;
      bottom: 1em;
      right: 1em;
      font-size: 15px;
    }
  }
  @media screen and (max-width: 750px) {
    .work-card {
      width: 95vw !important;
      height: 60vh !important;
      .work-img {
        width: 95vw;
      }
    }
  }
</style>
