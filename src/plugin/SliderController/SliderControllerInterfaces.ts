import { IRunnerView } from '../runner/RunnerInterfaces';
import { ITipView } from '../tip/TipInterfaces';

export interface IChangeValueSettings {
  runner: IRunnerView;
  tip: ITipView | false;
  valueType: string;
}

export interface IAddHandlersSettings {
  runner: IRunnerView;
  tip: ITipView | false;
  changeEvent: string;
  setEvent: string;
  valueType: string;
}

export interface IHandleWindowMouseUp {
  mouseMoveHandler: (event: JQuery.MouseMoveEvent) => void;
  moveHandler: (event: JQuery.TriggeredEvent) => void;
  runner: IRunnerView;
}

export interface ISliderController {
  init(): void;
}
