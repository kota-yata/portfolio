<script>
  import Icon from 'svelte-awesome';
  import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
  import Reaction from './Reaction.svelte';
</script>

<div role="button" id="back_to_top">
  <h3>Back to top</h3>
</div>
<Reaction />
<div id="footer">
  <div class="email-address">
    <Icon data={faPaperPlane} />
    kota@yatagai.com
  </div>
  <span class="licence">© 2020 Kota Yatagai</span>
</div>

<style lang="scss">
  @import '../assets/definition.scss';

  #back_to_top {
    cursor: pointer;
    position: relative;
    @extend %center;
    margin-top: 3em;
    margin-bottom: 5em;
    width: 200px;
    height: 80px;
    border-radius: 20px;
    background: $white;
    box-shadow: 5px 5px 7px $shadow-white1, -5px -5px 7px $shadow-white2;
    h3 {
      width: 100%;
      margin: 0;
      position: absolute;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
    }
    &:hover {
      box-shadow: 3px 3px 5px $shadow-white1, -3px -3px 7px $shadow-white2;
    }
  }
  #footer {
    @extend %center;
    padding: 2em 0em;
    border-top: 0.5px $h-color solid;
    .email-address {
      color: $h-color;
      text-shadow: -1px -1px 3px rgba(255, 255, 255, 0.4), 1px 1px 5px rgba(0, 0, 0, 0.08);
      caret-color: #262626;
      margin-bottom: 20px;
      font-size: 20px;
    }
    .licence {
      color: $h-color;
      text-shadow: -1px -1px 3px rgba(255, 255, 255, 0.4), 1px 1px 5px rgba(0, 0, 0, 0.08);
      caret-color: #262626;
      font-size: 30px;
      user-select: none;
      font-weight: bold;
    }
  }
</style>
