<script lang="ts">
  import "$lib/editorjs/style.css";

  import { SongLyrics, type SongLyricsConfig } from "$lib/editorjs";
  import EditorJS, { type OutputBlockData } from "@editorjs/editorjs";
  import { onMount } from "svelte";

  type Props = {
    blocks: OutputBlockData[];
  };

  let { blocks = $bindable([]) }: Props = $props();

  const songLyricsConfig: SongLyricsConfig = {
    namePlaceholder: "Enter the name of the section such as Verse 1",
    textPlaceholder: "Enter your lyrics here",
  };

  onMount(() => {
    const editor = new EditorJS({
      holder: "editor",
      inlineToolbar: true,
      tools: {
        songLyrics: {
          class: SongLyrics,
          inlineToolbar: true,
          config: songLyricsConfig,
        },
      },
      data: {
        blocks: [
          {
            type: "songLyrics",
            data: {
              name: "Verse 1",
              text: "Hello, world!",
            },
          },
        ],
      },
      defaultBlock: "songLyrics",
      async onChange(api, event) {
        const data = await api.saver.save();
        const outputBlockData = data.blocks;
        blocks = outputBlockData;
      },
    });
  });
</script>

<div class="container">
  <div>
    <label for="title">Title</label>
    <input type="text" id="title" />
  </div>

  <div>
    <div id="editor" class="editor"></div>
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }

  input {
    width: 100%;
    border: 1px solid black;
    border-radius: 3px;
  }
</style>
