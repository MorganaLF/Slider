import { ISliderModel } from '../SliderModel/SliderModelInterfaces';
import { ISliderView } from '../SliderView/SliderViewInterfaces';
import { ISliderController } from '../SliderController/SliderControllerInterfaces';

declare global {
  interface JQuery {
    customSlider: (...rest: any[]) => any;
  }
}

export type SliderAppOptions = {
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
  scaleMarksQuantity?: number,
  sliderModel?: ISliderModel | null,
  sliderView?: ISliderView | null,
  sliderController?: ISliderController | null,
};

export interface ISliderApp extends SliderAppOptions {
  init(): void | false;
  getCurrentValue(): number;
  getCurrentEndValue(): number;
  getMinValue(): number;
  getMaxValue(): number;
  getStepSize(): number;
  getScaleMarksQuantity(): number;
  setMinValue(val: number | string): void;
  setMaxValue(val: number | string): void;
  setCurrentValue(val: number): void | false;
  setCurrentEndValue(val: number): void | false;
  setStepSize(val: number): void;
  setScaleMarksQuantity(val: number): void;
  showTip(): void;
  hideTip(): void;
  showScale(): void;
  hideScale(): void;
  setVerticalOrientation(): void;
  setHorizontalOrientation(): void;
}
