<script lang="ts">
  import { WebviewWindow } from "@tauri-apps/api/webviewWindow";

  let liveViewWindow: WebviewWindow | undefined = $state();
  let webview: WebviewWindow | undefined = $state();

  const openLiveViewWindow = () => {
    liveViewWindow = new WebviewWindow("liveViewWindow", {
      url: "/live",
      fullscreen: true,
    });
    liveViewWindow.once("tauri://created", function () {
      // webview successfully created
    });
    liveViewWindow.once("tauri://error", function (e) {
      // an error happened creating the webview
      console.log("error", e);
    });
  };

  const openWindow = () => {
    webview = new WebviewWindow("speakerView", {
      url: "/speaker-view",
      x: 0,
      y: 0,
    });
    webview.once("tauri://created", function () {
      // webview successfully created
    });
    webview.once("tauri://error", function (e) {
      // an error happened creating the webview
      console.log("error", e);
    });
  };
</script>

<h1>Welcome to Tauri + Svelte 3</h1>

<button onclick={openLiveViewWindow}>Go to live</button>
<button onclick={openWindow}>Open speaker view</button>

<style>
</style>
