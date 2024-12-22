<script lang="ts">
  import "quill/dist/quill.snow.css";

  import Quill from "quill";
  import { onMount } from "svelte";

  type Props = {
    quill: Quill | undefined;
    onTextChange: () => void;
  };

  let { quill = $bindable(), onTextChange }: Props = $props();

  onMount(() => {
    quill = new Quill("#editor", {
      theme: "snow",
      placeholder: "Compose an epic...",
      modules: {
        toolbar: true,
      },
    });

    quill.on("text-change", (delta, oldDelta, source) => {
      onTextChange();
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
