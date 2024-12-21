<script lang="ts">
  type Props = {
    onGoToLiveClick: () => void;
    onOpenSpeakerViewClick: () => void;
  };

  let { onGoToLiveClick, onOpenSpeakerViewClick }: Props = $props();
</script>

<header>
  <span> This is a header </span>

  <div class="actions">
    <button onclick={onGoToLiveClick}>Go to live</button>
    <button onclick={onOpenSpeakerViewClick}>Open speaker view</button>
  </div>
</header>

<style>
  header {
    height: var(--header-height);
    background-color: darkgray;
    display: flex;
    align-items: center;
    padding: 0 1rem;
  }

  .actions {
    margin-left: auto;
  }
</style>
