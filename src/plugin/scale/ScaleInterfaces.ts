export type ScaleViewOptions = {
  el?: null | JQuery,
  parentWidth: number,
  parentHeight: number,
  orientation: string,
};

export interface IDrawMarkSettings {
  markText: number;
  markIndex: number;
  marksQuantity: number;
  positionProperty: string;
}

export interface IDrawScaleSettings {
  $parent: JQuery;
  minValue: number;
  maxValue: number;
  marksQuantity: number;
}
