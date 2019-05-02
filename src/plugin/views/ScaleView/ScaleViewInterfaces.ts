export type drawMarkSettings = {
  markText: number;
  markIndex: number;
  marksQuantity: number;
  positionProperty: string;
};

export type drawScaleSettings = {
  minValue: number;
  maxValue: number;
};

export type ScaleViewOptions = {
  $element?: JQuery,
  $parent: JQuery,
  parentWidth: number,
  parentHeight: number,
  orientation: string,
  marksQuantity: number,
};

export interface IScaleView {
  drawScale({}: drawScaleSettings): void;
}
