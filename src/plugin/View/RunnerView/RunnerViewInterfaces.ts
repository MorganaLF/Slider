import { IObservableSubject } from '../../ObservableSubject/ObservableSubjectInterfaces';

export type dispatchMoveEventSettings = {
  coordinate: number;
  startPoint: number;
  endPoint: number;
  shift: number;
  runnerSize: number;
};

export type RunnerViewOptions = {
  observableSubject?: IObservableSubject,
  $element?: JQuery,
  $parent: JQuery,
  shiftX?: number,
  shiftY?: number,
  orientation: string,
  parentLeftPoint: number,
  parentRightPoint: number,
  parentTopPoint: number,
  parentBottomPoint: number,
};

export interface IRunnerView{
  observableSubject: IObservableSubject;
  $element: JQuery;
  drawRunner(parent: JQuery, coefficient: number): JQuery;
  setRunnerShiftX(e: JQuery.MouseDownEvent): void;
  setRunnerShiftY(e: JQuery.MouseDownEvent): void;
  setRunnerPosition(coefficient: number): void;
  placeRunnerOnHigherLayer(): void;
  placeRunnerOnLowerLayer(): void;
  moveRunner(e: JQuery.MouseMoveEvent): void;
}
