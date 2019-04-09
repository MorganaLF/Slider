export type TrackPoints = {
  left: number,
  top: number,
  right: number,
  bottom: number,
  [key: string]: number,
};

export type TrackViewOptions = {
  el?: null | JQuery,
  trackFull?: null | JQuery,
  _parentWidth: number,
  _parentHeight: number,
  _runnerWidth: number,
  _runnerHeight: number,
  type: string,
  orientation: string,
};

export interface IDrawTrackSettings {
  $parent: JQuery;
  startValueCoefficient: number;
  endValueCoefficient: number;
}

export interface IAnimateSingleTrackSettings {
  coefficient: number;
  sizeProperty: string;
  sizeKey: string;
  runnerSizeKey: string;
}

export interface IAnimateIntervalTrackSettings {
  coefficient: number;
  startPointName: string;
  endPointName: string;
  sizeProperty: string;
  size: number;
  runnerSizeKey: string;
  animatedPointName: string;
}
