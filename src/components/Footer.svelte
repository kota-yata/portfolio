<script>
  import Icon from 'svelte-awesome';
  import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
  import Reaction from './Reaction.svelte';
</script>

<a data-scroll href="#top_page">
  <div role="button" id="back_to_top">
    <h3>Back to top</h3>
  </div>
</a>
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
    @extend %center;
    cursor: pointer;
    position: relative;
    margin-top: 3em;
    margin-bottom: 5em;
    width: 200px;
    height: 80px;
    border-radius: 20px;
    background: $fusion-gradient;
    box-shadow: $neumorphismic-shadow;
    h3 {
      width: 100%;
      margin: 0;
      position: absolute;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      color: $white;
    }
    &:hover {
      background: linear-gradient(-45deg, $deep-purple, $deep-pink);
    }
  }
  #footer {
    @extend %center;
    padding: 2em 0em;
    border-top: 0.5px $sentence-white solid;
    .email-address {
      color: $sentence-white;
      text-shadow: -1px -1px 3px rgba(255, 255, 255, 0.4), 1px 1px 5px rgba(0, 0, 0, 0.08);
      caret-color: #262626;
      margin-bottom: 20px;
      font-size: 20px;
    }
    .licence {
      @extend %gradient-text;
      caret-color: #262626;
      font-size: 30px;
      user-select: none;
      font-weight: bold;
    }
  }
</style>
