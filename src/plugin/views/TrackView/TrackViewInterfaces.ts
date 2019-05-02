export type animateSingleTrackSettings = {
  coefficient: number;
  sizeProperty: string;
  sizeKey: string;
  runnerSizeKey: string;
};

export type animateIntervalTrackSettings = {
  coefficient: number;
  startPointName: string;
  endPointName: string;
  sizeProperty: string;
  size: number;
  runnerSizeKey: string;
  animatedPointName: string;
};

export type TrackPoints = {
  left: number,
  top: number,
  right: number,
  bottom: number,
  [key: string]: number,
};

export type TrackViewOptions = {
  $element?: JQuery,
  $parent: JQuery,
  $filledTrack?: JQuery,
  _parentWidth: number,
  _parentHeight: number,
  _runnerWidth: number,
  _runnerHeight: number,
  type: string,
  orientation: string,
};

export interface ITrackView {
  drawTrack(): JQuery;
  animateTrack(coefficient: number, pointName: string): void;
}
