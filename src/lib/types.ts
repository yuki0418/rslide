type SlideType = "song" | "scripture";

type SongSlideData = {
  title: string;
  contents: string;
};

type ScriptureSlideData = {
  reference: string;
  contents: string;
};

type DataType<T extends SlideType> = T extends "song"
  ? SongSlideData
  : T extends "scripture"
  ? ScriptureSlideData
  : never;

export type Slide<T extends SlideType> = {
  type: T;
  data: DataType<T>;
};
