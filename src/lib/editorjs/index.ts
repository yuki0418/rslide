import type {
  API,
  BlockToolConstructorOptions,
  ToolConfig,
} from "@editorjs/editorjs";

export type SongLyricsData = {
  name: string;
  text: string;
};

export type SongLyricsConfig = {
  namePlaceholder?: string;
  textPlaceholder?: string;
};

interface JobBlockToolConstructorOptions extends BlockToolConstructorOptions {
  api: API;
  data: SongLyricsData;
  config?: ToolConfig<SongLyricsConfig>;
}

export class SongLyrics {
  data: SongLyricsData;
  api: API;
  config: SongLyricsConfig;

  constructor({ data, api, config }: JobBlockToolConstructorOptions) {
    this.data = data;
    this.api = api;
    this.config = config || {};
  }

  static get toolbox() {
    return {
      title: "Lyrics",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M4 18q-.425 0-.712-.288T3 17t.288-.712T4 16h10q.425 0 .713.288T15 17t-.288.713T14 18zm0-5q-.425 0-.712-.288T3 12t.288-.712T4 11h16q.425 0 .713.288T21 12t-.288.713T20 13zm0-5q-.425 0-.712-.288T3 7t.288-.712T4 6h16q.425 0 .713.288T21 7t-.288.713T20 8z" />
            </svg>`,
    };
  }

  render() {
    let wrapper = document.createElement("div");
    const { data } = this;

    const name = data.name || "";
    const text = data.text || "";

    const inputElement = document.createElement("div");
    inputElement.setAttribute("data-name", "name");
    inputElement.setAttribute(
      "placeholder",
      this.config.namePlaceholder || "Name of the block such as Verse 1"
    );
    inputElement.contentEditable = "true";
    inputElement.className = "editor-song_lyrics--name";
    inputElement.innerHTML = name;

    inputElement.addEventListener("click", () => {
      this._toggleEditable(inputElement, true);
    });

    inputElement.addEventListener("blur", () => {
      this._toggleEditable(inputElement, false);
    });

    const contentElement = document.createElement("div");
    contentElement.setAttribute("data-name", "text");
    contentElement.setAttribute(
      "placeholder",
      this.config.textPlaceholder || "Lyrics here"
    );
    contentElement.contentEditable = "true";
    contentElement.className = "editor-song_lyrics--content";
    contentElement.innerHTML = text;

    // Note: not need at the moment
    // wrapper.appendChild(inputElement);
    wrapper.appendChild(contentElement);

    return wrapper;
  }

  /**
   * Automatic sanitize config
   */
  static get sanitize() {
    return {
      name: false,
      text: true,
    };
  }

  save(blockContent: HTMLDivElement) {
    console.log("blockContent", blockContent);

    const input = blockContent.querySelector("[data-name='name']");
    const content = blockContent.querySelector("[data-name='text']");

    return Object.assign(this.data, {
      name: input?.innerHTML || "",
      text: content?.innerHTML || "",
    });
  }

  /**
   * @private
   */
  _toggleEditable(element: HTMLDivElement, editable: boolean) {
    element.contentEditable = editable.toString();
  }
}
