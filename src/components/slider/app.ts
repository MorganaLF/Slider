import $ from 'jquery';
import SliderView from './view';
import SliderModel from './model';
import SliderController from './controller';

type SliderAppOptions = {
    element: {},
    startValue: number,
    endValue: number,
    minVal: number,
    maxVal: number,
    type: string,
    orientation: string,
    step: number,
    isTip: boolean,
    isScale: boolean,
    sliderModel: {},
    sliderView: {},
    sliderController: {}
}

export default class SliderApp {
  private el: {};
  private startValue: number;
  private endValue: number;
  private minVal: number;
  private maxVal: number;
  private type: string;
  private orientation: string;
  private step: number;
  private isTip: boolean;
  private isScale: boolean;
  private sliderModel: null | {};
  private sliderView: null | {};
  private sliderController: null | {};

  constructor (options: SliderAppOptions) {
    this.el = options.element;
    this.startValue = 0;
    this.endValue = 100;
    this.minVal = 0;
    this.maxVal = 100;
    this.type = 'single';
    this.orientation = 'horizontal';
    this.step = 0;
    this.isTip = true;
    this.isScale = false;
    this.sliderModel = null;
    this.sliderView = null;
    this.sliderController = null;

    $.extend(this, options);
  }

  public currentValue (): number {
    return this.sliderModel ? this.sliderModel.currentRoundValue : false;
  }

  public currentMaxValue (): number {
    return this.sliderModel ? this.sliderModel.currentRoundEndValue : false;
  }

  public minValue (): number {
    return this.sliderModel ? this.sliderModel.minVal : false;
  }

  public maxValue (): number {
    return this.sliderModel ? this.sliderModel.maxVal : false;
  }

  public stepSize (): number {
    return this.sliderModel ? this.sliderModel.step : false;
  }

  public setMinValue (val: number): void {
    this.minVal = parseInt(val);
    this.init();
  }

  public setMaxValue (val: number): void {
    this.maxVal = parseInt(val);
    this.init();
  }

  public setCurrentValue (val: number): void | false {
    if (!this.sliderModel) {
      return false;
    }
    this.sliderModel.currentValue = val;
  }

  public setCurrentMaxValue (val): void | false{
      if (!this.sliderModel) {
          return false;
      }
    this.sliderModel.currentMaxValue = val;
  }

  public setStepSize (val: number): void {
    this.step = val;
    this.init();
  }

  public showTip (): void {
    this.isTip = true;
    this.init();
  }

  public hideTip (): void {
    this.isTip = false;
    this.init();
  }

  public showScale (): void {
    this.isScale = true;
    this.init();
  }

  public hideScale (): void {
    this.isScale = false;
    this.init();
  }

  public setVeticalOrientation (): void {
    this.orientation = 'vertical';
    this.init();
  }

  public setHorisontalOrientation (): void {
    this.orientation = 'horizontal';
    this.init();
  }

  public init (): void {
    this.sliderModel = new SliderModel({
      startValue: this.startValue,
      endValue: this.endValue,
      minVal: this.minVal,
      maxVal: this.maxVal,
      step: this.step,
      type: this.type
    });

    this.sliderView = new SliderView({
      el: this.el,
      type: this.type,
      orientation: this.orientation,
      model: this.sliderModel,
      isTip: this.isTip,
      isScale: this.isScale
    });

    if (this.sliderView && this.sliderModel) {
        this.sliderView.updateSlider();
        this.sliderController = new SliderController(this.sliderView, this.sliderModel);
        this.sliderController.init();
    }
  }
}


