<script>
  import Icon from 'svelte-awesome';
  import { externalLink } from 'svelte-awesome/icons';

  export let imgPath;
  export let title;
  export let description;
  export let url;
  export let urlMessage;
</script>

<div class="media-card">
  <span> <img class="media-img" alt="img" src={imgPath} /> </span>
  <span class="media-sentences">
    <div class="media-title"><span>{title}</span></div>
    <span class="media-description">{description}</span>
    <span class="media-url">
      <a href={url} target="blank">
        <Icon data={externalLink} class="external-link" />
        {urlMessage}
      </a>
    </span>
  </span>
</div>

<style lang="scss">
  @import '../assets/definition.scss';

  .media-card {
    position: relative;
    width: 30vw;
    margin-left: 1.5vw;
    margin-right: 1.5vw;
    border-radius: 20px;
    background: $white;
    box-shadow: 5px 5px 7px $shadow-white1, -5px -5px 7px $shadow-white2;
    .media-sentences {
      padding: 1em;
    }
    .media-img {
      border-top-right-radius: 20px;
      border-top-left-radius: 20px;
      display: block;
      margin: 0 auto;
      text-align: center;
      width: 20vw;
    }
    .media-title {
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
    .media-description {
      word-wrap: break-word;
    }
    .media-url {
      position: absolute;
      bottom: 1em;
      right: 1em;
      font-size: 15px;
    }
  }
  @media screen and (max-width: 750px) {
    .media-card {
      width: 95vw !important;
      height: 60vh !important;
      .media-img {
        width: 95vw;
      }
    }
  }
</style>
