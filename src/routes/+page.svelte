<script lang="ts">
  import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
  import { Header } from "$lib/components/header";
  import { SongSlideEditor } from "$lib/components/song-slide-editor";
  import Quill from "quill";

  let liveViewWindow: WebviewWindow | undefined = $state();
  let webview: WebviewWindow | undefined = $state();
  let quill: Quill | undefined = $state();

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

  const onTextChange = () => {
    console.log(quill?.getContents());
  };
</script>

<main>
  <Header
    onGoToLiveClick={openLiveViewWindow}
    onOpenSpeakerViewClick={openWindow}
  />

  <div class="container">
    <div class="workspace">
      <div class="left">left</div>
      <div class="middle">
        <SongSlideEditor bind:quill {onTextChange} />
      </div>
      <div class="right">right</div>
    </div>
  </div>
</main>

<style>
  .container {
    height: calc(100dvh - var(--header-height));
  }

  .workspace {
    display: flex;
    height: 100%;
  }

  .left {
    display: flex;
    border-right: 1px solid black;
    padding: 8px;
    width: 200px;
  }

  .middle {
    display: flex;
    flex: 1;
    padding: 8px;
  }

  .right {
    display: flex;
    border-left: 1px solid black;
    padding: 8px;
    flex: 1;
  }
</style>
