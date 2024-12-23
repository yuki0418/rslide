<script lang="ts">
  import { type OutputBlockData } from "@editorjs/editorjs";

  type Props = {
    blocks: OutputBlockData[];
  };

  let { blocks }: Props = $props();
</script>

<div class="container">
  {#each blocks as block}
    <section class="slide">
      {@html block.data.text}
    </section>
  {/each}
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    overflow-y: scroll;
  }

  .slide {
    border: 1px solid black;
    border-radius: 3px;
    padding: 1rem;
    aspect-ratio: 16/9;
    background-color: white;
  }
</style>
