import { IObservableSubject } from '../../ObservableSubject/ObservableSubjectInterfaces';
import { IScaleView } from '../ScaleView/ScaleViewInterfaces';
import { IRunnerView } from '../RunnerView/RunnerViewInterfaces';
import { ITipView } from '../TipView/TipViewInterfaces';
import { ITrackView } from '../TrackView/TrackViewInterfaces';
import Model from '../../Model/Model';

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
  isEndValueChanging: boolean,
  coefficient: number,
  value: number,
  isRangeBoundAtTheEndOfInterval: boolean,
  isRangeBoundAtTheStartOfInterval: boolean,
};

export type MainViewOptions = {
  model: Model,
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

export interface IMainView extends MainViewOptions{
  observableSubject: IObservableSubject;
  startRunnerObservableSubject: IObservableSubject;
  endRunnerObservableSubject: IObservableSubject;
  scaleObservableSubject: IObservableSubject;
  reinitialize(): void;
  update({}: updateSettings): void;
  drawScale({}: drawScaleSettings): void;
}
