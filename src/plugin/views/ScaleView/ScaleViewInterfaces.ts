export type drawMarkSettings = {
  markText: number;
  markIndent: number;
};

export type drawScaleSettings = {
  stepSize: number;
  minValue: number;
  maxValue: number;
};

export type ScaleViewOptions = {
  $element?: JQuery,
  $parent: JQuery,
  orientation: string,
};

export interface IScaleView {
  drawScale({}: drawScaleSettings): void;
}
