export type SliderModelOptions = {
  startValue: number,
  endValue: number,
  minVal: number,
  maxVal: number,
  type: string,
  step: number,
};

type PrivateSliderViewOptions = {
  scaleItemsQuantity: number,
  orientation: string,
  progressFull?: null | JQuery,
  scale?: null | IScaleView,
  isScale: boolean,
  model: ISliderModel,
};

type PublicSliderViewOptions = {
  el: null | JQuery,
  runner1?: null | IRunnerView,
  runner2?: null | IRunnerView,
  tip1?: null | ITipView,
  tip2?: null | ITipView,
  track?: null | ITrackView,
  type: string,
  isTip: boolean,
};

export type SliderViewOptions = PrivateSliderViewOptions & PublicSliderViewOptions;

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

export interface ISliderModel extends SliderModelOptions{
  currentRoundValue: number;
  currentRoundEndValue: number;
  currentValue: number;
  currentMaxValue: number;
  calculateCoefficient (point: number): number;
  calculateValue (val: number, valueName: string): void | boolean;
}

export interface ISliderView extends PublicSliderViewOptions{
  updateSlider(): void;
}

export interface ISliderController {
  init(): void;
}

export interface ITrackView {
  drawTrack (parent: JQuery, coefficient: number, coefficientTwo: number): void;
  animateTrack (coefficient: number, pointName: string): void;
}

export interface IScaleView {
  drawScale (parent: JQuery, minVal: number, maxVal: number, itemsQuantity: number): void;
}


