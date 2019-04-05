export interface ICheckCursorPositionSettings {
  coordinate: number;
  startPoint: number;
  endPoint: number;
  shift: number;
  runnerSize: number;
}

export interface IDispatchMoveEventSettings {
  coordinate: number;
  startPoint: number;
  endPoint: number;
  shift: number;
  runnerSize: number;
}

export type RunnerViewOptions = {
  $element?: null | JQuery,
  shiftX?: number,
  shiftY?: number,
  orientation: string,
  parentLeftPoint: number,
  parentRightPoint: number,
  parentTopPoint: number,
  parentBottomPoint: number,
}

export interface IRunnerView {
  $element: JQuery;
  drawRunner (parent: JQuery, coefficient: number): void;
  setRunnerShiftX (e: JQuery.MouseDownEvent): void;
  setRunnerShiftY (e: JQuery.MouseDownEvent): void;
  setRunnerPosition (coefficient: number): void;
  moveRunner (e: JQuery.MouseMoveEvent): void;
}
