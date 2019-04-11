type PrivateScaleViewOptions = {
  parentWidth: number,
  parentHeight: number,
  orientation: string,
};

type PublicScaleViewOptions = {
  $element?: null | JQuery,
  $parent?: null | JQuery,
  marksQuantity: number,
};

export type ScaleViewOptions = PrivateScaleViewOptions & PublicScaleViewOptions;

export interface IScaleView extends PublicScaleViewOptions {
  drawScale ({}: IDrawScaleSettings): void;
}

export interface IDrawMarkSettings {
  markText: number;
  markIndex: number;
  marksQuantity: number;
  positionProperty: string;
}

export interface IDrawScaleSettings {
  minValue: number;
  maxValue: number;
}
