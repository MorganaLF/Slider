import { ISliderModel } from '../SliderModel/SliderModelInterfaces';
import { IScaleView } from '../scale/ScaleInterfaces';
import { IRunnerView } from '../runner/RunnerInterfaces';
import { ITipView } from '../tip/TipInterfaces';
import { ITrackView } from '../track/TrackInterfaces';

type PrivateSliderViewOptions = {
  scaleMarksQuantity: number,
  orientation: string,
  progressFull?: null | JQuery,
  scale?: null | IScaleView,
  withScale: boolean,
};

type PublicSliderViewOptions = {
  $element: null | JQuery,
  startValueRunner?: null | IRunnerView,
  endValueRunner?: null | IRunnerView,
  startValueTip?: null | ITipView,
  endValueTip?: null | ITipView,
  track?: null | ITrackView,
  type: string,
  withTip: boolean,
};

export type SliderViewOptions = PrivateSliderViewOptions & PublicSliderViewOptions;

export interface ISliderView extends PublicSliderViewOptions{
  updateSlider(): void;
}

export interface IExtremePoints {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export interface ISize {
  width: number;
  height: number;
}