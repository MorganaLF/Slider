import { IRunnerView } from '../RunnerView/RunnerViewInterfaces';
import { ITipView } from '../TipView/TipViewInterfaces';

export type changeValueSettings = {
  runner: IRunnerView;
  tip: ITipView | false;
  valueType: string;
};

export type addHandlersSettings = {
  runner: IRunnerView;
  tip: ITipView | false;
  changeEvent: string;
  setEvent: string;
  valueType: string;
};

export type handleWindowMouseUpSettings = {
  mouseMoveHandler: (event: JQuery.MouseMoveEvent) => void;
  moveHandler: (event: JQuery.TriggeredEvent) => void;
  runner: IRunnerView;
};

export interface ISliderController {
  init(): void;
  destroy(): void;
}
