export type SliderAppOptions = {
  el?: JQuery,
  startValue?: number,
  endValue?: number,
  minVal?: number,
  maxVal?: number,
  type?: string,
  orientation?: string,
  step?: number,
  isTip?: boolean,
  isScale?: boolean,
  trackItemsQuantity?: number,
  sliderModel?: ISliderModel,
  sliderView?: ISliderView,
  sliderController?: ISliderController,
};

declare global {
    interface JQuery {
      customSlider: (...rest: any[]) => any;
    }
}

export interface ISliderApp {
  init (): void;
}

export interface ISliderController {
  init(): void;
}
