// Use this file for any custom types that aren't in the schema

declare global {
  interface Window {
    paper: paper.PaperScope;
  }
}

export interface PaperCanvasObject {
  type: string;
  [key: string]: any;
}

export interface SerializedPaperCanvas {
  objects: PaperCanvasObject[];
}
