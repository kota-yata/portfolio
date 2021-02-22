<script>
  import Icon from 'svelte-awesome';
  import { thumbsUp, thumbsDown } from 'svelte-awesome/icons';
  import Toast from 'svelte-toast';
  import { updateData } from '../../scripts/dbController.js';

  let isUpvoteClicked = localStorage.getItem('upvote') === 'true' ? true : false;
  let isDownvoteClicked = localStorage.getItem('downvote') === 'true' ? true : false;

  const toast = new Toast();

  const clickedAction = (vote, bool, message) => {
    if (bool === false) {
      toast.success(message);
      localStorage.setItem(vote, true);
      updateData(vote, 'addition');
    } else {
      localStorage.setItem(vote, false);
      updateData(vote, 'subtraction');
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    const btn_upvote = document.getElementById('button_upvote');
    const btn_downvote = document.getElementById('button_downvote');
    btn_upvote.addEventListener('click', () => {
      clickedAction('upvote', isUpvoteClicked, 'Thank you!!');
      if (isDownvoteClicked) {
        localStorage.setItem('downvote', false);
        isDownvoteClicked = !isDownvoteClicked;
        setTimeout(() => {
          updateData('downvote', 'subtraction');
        }, 1000);
      }
      isUpvoteClicked = !isUpvoteClicked;
    });
    btn_downvote.addEventListener('click', () => {
      clickedAction('downvote', isDownvoteClicked, 'Oh..yeah..uhm..');
      if (isUpvoteClicked) {
        localStorage.setItem('upvote', false);
        isUpvoteClicked = !isUpvoteClicked;
        setTimeout(() => {
          updateData('upvote', 'subtraction');
        }, 1000);
      }
      isDownvoteClicked = !isDownvoteClicked;
    });
  });
</script>

<div class="reaction-container">
  <h2 class="reaction-question">How about my website?</h2>
  <button class="reaction-button" class:after-click={isUpvoteClicked} id="button_upvote">
    <Icon data={thumbsUp} scale="3" />
  </button>
  <button class="reaction-button" class:after-click={isDownvoteClicked} id="button_downvote">
    <Icon data={thumbsDown} scale="3" />
  </button>
</div>

<style lang="scss">
  @import '../assets/definition.scss';
  .reaction-container {
    @extend %center;
    margin-bottom: 3em;
    button {
      appearance: none !important;
      background: transparent;
      border: none;
      cursor: pointer;
      margin: 0px 20px;
      color: $sentence-white;
      transition: 0.2s;
      &:focus {
        outline: none !important;
      }
      &:hover {
        color: $light-black;
        transition: 0.2s;
      }
    }
  }
  .after-click {
    color: $deep-pink !important;
    transition: 0.2s;
  }
</style>
