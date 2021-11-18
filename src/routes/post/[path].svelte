<script lang="ts" context="module">
  export const load = async ({ page, fetch }) => {
    const url = `/post/${page.params.path}.json`;
    const res = await fetch(url);
    console.log(res);
    if (!res.ok) return;
    const post = await res.json();
    return {
      props: { post }
    };
  }
</script>

<script lang="ts">
  export let post;
</script>

<div>
  <h1>{post.title}</h1>
  <div>{@html post.body}</div>
</div>
