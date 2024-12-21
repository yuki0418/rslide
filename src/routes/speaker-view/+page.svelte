<script lang="ts">
  import { emitTo } from "@tauri-apps/api/event";

  const prev = async () => {
    await emitTo("liveViewWindow", "live", {
      event: "prev",
      payload: null,
    });
  };

  const next = async () => {
    emitTo("liveViewWindow", "live", {
      event: "next",
      payload: null,
    });
  };
</script>

<main>
  <div>
    <h1>Speaker View</h1>
    <button onclick={prev}>prev</button>
    <button onclick={next}>next</button>
  </div>
</main>

<style></style>
