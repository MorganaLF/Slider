import { IRunnerView } from '../views/RunnerView/RunnerViewInterfaces';
import { ITipView } from '../views/TipView/TipViewInterfaces';

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

export type removeEventListenersSettings = {
  handleWindowMouseMove: (event: JQuery.MouseMoveEvent) => void;
  handleRunnerMove: (event: JQuery.TriggeredEvent) => void;
  runner: IRunnerView;
};

export interface IController {
  init(): void;
  destroy(): void;
}
