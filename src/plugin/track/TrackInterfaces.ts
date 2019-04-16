export type TrackPoints = {
  left: number,
  top: number,
  right: number,
  bottom: number,
  [key: string]: number,
};

type PrivateTrackViewOptions = {
  _parentWidth: number,
  _parentHeight: number,
  _runnerWidth: number,
  _runnerHeight: number,
  type: string,
  orientation: string,
};

type PublicTrackViewOptions = {
  $element?: null | JQuery,
  $parent: JQuery,
  $filledTrack?: null | JQuery,
};

export type TrackViewOptions = PrivateTrackViewOptions & PublicTrackViewOptions;

export interface ITrackView extends PublicTrackViewOptions {
  drawTrack ({}: IDrawTrackSettings): void;
  animateTrack (coefficient: number, pointName: string): void;
}

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
