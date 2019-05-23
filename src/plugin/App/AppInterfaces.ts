import { IModel } from '../Model/ModelInterfaces';
import { IView } from '../views/View/ViewInterfaces';
import { IController } from '../Controller/ControllerInterfaces';

declare global {
  interface JQuery {
    customSlider: (...rest: any[]) => any;
  }
}

export type AppOptions = {
  elementIndex?: number,
  $element: JQuery,
  startValue?: number,
  endValue?: number,
  minValue?: number,
  maxValue?: number,
  type?: string,
  orientation?: string,
  stepSize?: number,
  withTip?: boolean,
  withScale?: boolean,
  model?: IModel | null,
  view?: IView | null,
  controller?: IController | null,
};

export interface IApp extends AppOptions {
  init(): void | false;
  updateView(): void;
  getCurrentValue(): number;
  getCurrentEndValue(): number;
  getMinValue(): number;
  getMaxValue(): number;
  getStepSize(): number;
  setMinValue(val: number | string): void;
  setMaxValue(val: number | string): void;
  setCurrentValue(val: number): void | false;
  setCurrentEndValue(val: number): void | false;
  setStepSize(val: number): void;
  showTip(): void;
  hideTip(): void;
  showScale(): void;
  hideScale(): void;
  setVerticalOrientation(): void;
  setHorizontalOrientation(): void;
}
