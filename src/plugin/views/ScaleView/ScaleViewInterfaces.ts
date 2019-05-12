export type drawMarkSettings = {
  markText: number;
};

export type drawScaleSettings = {
  minValue: number;
  maxValue: number;
};

export type ScaleViewOptions = {
  $element?: JQuery,
  $parent: JQuery,
  orientation: string,
  marksQuantity: number,
};

export interface IScaleView {
  drawScale({}: drawScaleSettings): void;
}
