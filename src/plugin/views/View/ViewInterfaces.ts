import { IObservableSubject } from '../../ObservableSubject/ObservableSubjectInterfaces';
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

export type drawScaleSettings = {
  stepSize: number,
  minValue: number,
  maxValue: number,
};

export type updateSettings = {
  valueType: string,
  coefficient: number,
  value: number,
  isRunnersAtTheEndOfSlider: boolean,
  isRunnersAtTheStartOfSlider: boolean,
};

export type ViewOptions = {
  elementIndex: number,
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
  orientation?: string,
};

export interface IView extends ViewOptions{
  observableSubject: IObservableSubject;
  startRunnerObservableSubject: IObservableSubject;
  endRunnerObservableSubject: IObservableSubject;
  scaleObservableSubject: IObservableSubject;
  reinitialize(): void;
  update({}: updateSettings): void;
  drawScale({}: drawScaleSettings): void;
}
