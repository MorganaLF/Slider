import { ISliderModel } from '../SliderModel/SliderModelInterfaces';
import { ISliderView } from '../SliderView/SliderViewInterfaces';
import { ISliderController } from '../SliderController/SliderControllerInterfaces';

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
