<script lang="ts">
import Card from "$lib/home/card.svelte";

  const books: { image: string, url: string }[] = [
    { image: 'software-design', url: 'https://gihyo.jp/magazine/SD/archive/2021/202102' }
  ];
  const interviews: { title: string, url: string }[] = [
    {
      title: 'Creating a service to close the “rift in after-school studies during the COVID-19 pandemic”',
      url: 'https://openinnovation.epson.com/en/topics/20210826_2/'
    }
  ]
</script>

<section>
  <div class="books">
    <h2>Books</h2>
    {#each books as book}
    <a href={book.url}><img alt="book" src="/books/{book.image}.webp" width="250px" /></a>
    {/each}
  </div>
  <Card className="interview" bg="#ffdcbc" title="Interview">
    <ul>
      {#each interviews as interview}
      <li><a href={interview.url}>{interview.title}</a></li>
      {/each}
    </ul>
  </Card>
</section>

<style lang="scss">
  section {
    padding: 8vh 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .books {
      width: 50%;
    }
  }
</style>
