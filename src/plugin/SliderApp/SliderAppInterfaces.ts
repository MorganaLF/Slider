import { ISliderModel } from '../SliderModel/SliderModelInterfaces';
import { ISliderView } from '../SliderView/SliderViewInterfaces';
import { ISliderController } from '../SliderController/SliderControllerInterfaces';

declare global {
  interface JQuery {
    customSlider: (...rest: any[]) => any;
  }
}

export type SliderAppOptions = {
  $element?: JQuery,
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
  sliderModel?: ISliderModel,
  sliderView?: ISliderView,
  sliderController?: ISliderController,
};

export interface ISliderApp {
  init(): void;
}
