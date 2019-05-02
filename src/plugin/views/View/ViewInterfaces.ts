import { IScaleView } from '../ScaleView/ScaleViewInterfaces';
import { IRunnerView } from '../RunnerView/RunnerViewInterfaces';
import { ITipView } from '../TipView/TipViewInterfaces';
import { ITrackView } from '../TrackView/TrackViewInterfaces';

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

export type ViewOptions = {
  $element: JQuery,
  startValueRunner?: null | IRunnerView,
  endValueRunner?: null | IRunnerView,
  startValueTip?: null | ITipView,
  endValueTip?: null | ITipView,
  track?: null | ITrackView,
  scale?: null | IScaleView,
  type?: string,
  withTip?: boolean,
  withScale?: boolean,
  scaleMarksQuantity?: number,
  orientation?: string,
};

export interface IView extends ViewOptions{
  updateSlider(): void;
}