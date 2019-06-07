import { IModel } from '../Model/ModelInterfaces';
import { IMainView } from '../View/MainView/MainViewInterfaces';
import { IController } from '../Controller/ControllerInterfaces';

declare global {
  interface JQuery {
    customSlider: (...rest: any[]) => any;
  }
}

export type AppOptions = {
  startValue?: number,
  endValue?: number,
  minValue?: number,
  maxValue?: number,
  type?: string,
  stepSize?: number,
  elementIndex: number,
  withTip?: boolean,
  withScale?: boolean,
  orientation?: string,
  $element: JQuery,
  model?: IModel | null,
  view?: IMainView | null,
  controller?: IController | null,
};

export interface IApp {
  model?: IModel | null;
  view?: IMainView | null;
  controller?: IController | null;
  getCurrentValue(): number;
  getCurrentEndValue(): number;
  getMinValue(): number;
  getMaxValue(): number;
  getStepSize(): number;
  setMinValue(val: number | string): void;
  setMaxValue(val: number | string): void;
  setCurrentValue(val: number): void;
  setCurrentEndValue(val: number): void;
  setStepSize(val: number): void;
  showTip(): void;
  hideTip(): void;
  showScale(): void;
  hideScale(): void;
  setVerticalOrientation(): void;
  setHorizontalOrientation(): void;
}
