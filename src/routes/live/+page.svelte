<script lang="ts">
  import "reveal.js/dist/reveal.css";
  import "reveal.js/dist/theme/beige.css";
  import "reveal.js/plugin/highlight/monokai.css";

  import { onMount } from "svelte";
  import Reveal from "reveal.js";
  import Markdown from "reveal.js/plugin/markdown/markdown.esm.js";
  import RevealNotes from "reveal.js/plugin/notes/notes.esm.js";
  import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";

  let deck: Reveal.Api | undefined = $state();

  onMount(() => {
    deck = new Reveal({
      plugins: [Markdown, RevealNotes],
      embedded: false,
    });

    deck.initialize();
  });

  getCurrentWebviewWindow().listen<{
    event: string;
    payload: any;
  }>("live", ({ event, payload }) => {
    switch (payload.event) {
      case "next":
        deck?.next();
        break;
      case "prev":
        deck?.prev();
        break;
    }
  });
</script>

<main>
  <div class="reveal">
    <div class="slides">
      <section>
        <section>Slide v 1</section>
        <section>Slide v 2</section>
        <section>Slide v 3</section>
      </section>
      <section>
        Slide 2

        <aside class="notes">Shhh, these are your private notes 📝</aside>
      </section>
      <section>Slide 3</section>
    </div>
  </div>
</main>

<style>
  .reveal {
    height: 100dvh;
    background-color: wheat;
  }
</style>
