import { ISliderModel } from '../SliderModel/SliderModelInterfaces';
import { IScaleView } from '../scale/ScaleInterfaces';
import { IRunnerView } from '../RunnerView/RunnerViewInterfaces';
import { ITipView } from '../tip/TipInterfaces';
import { ITrackView } from '../track/TrackInterfaces';

type PrivateSliderViewOptions = {
  orientation: string,
  progressFull?: null | JQuery,
  withScale: boolean,
};

type PublicSliderViewOptions = {
  $element: JQuery,
  startValueRunner?: null | IRunnerView,
  endValueRunner?: null | IRunnerView,
  startValueTip?: null | ITipView,
  endValueTip?: null | ITipView,
  track?: null | ITrackView,
  scale?: null | IScaleView,
  type: string,
  withTip: boolean,
  scaleMarksQuantity: number,
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
