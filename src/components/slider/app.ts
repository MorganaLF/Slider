import $ from 'jquery';
import SliderView from './view';
import SliderModel from './model';
import SliderController from './controller';
import {ISliderModel} from '../interfaces';
import {ISliderView} from "../interfaces";
import {ISliderController} from '../interfaces';

type SliderAppOptions = {
    element?: JQuery,
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
    sliderController?: ISliderController
}

export default class SliderApp {
  private el?: JQuery;
  private startValue: number;
  private endValue: number;
  private minVal: number;
  private maxVal: number;
  private type: string;
  private orientation: string;
  private step: number;
  private isTip: boolean;
  private isScale: boolean;
  private trackItemsQuantity: number;
  private sliderModel: null | ISliderModel;
  private sliderView: null | ISliderView;
  private sliderController: null | ISliderController;

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
    this.trackItemsQuantity = 10;
    this.sliderModel = null;
    this.sliderView = null;
    this.sliderController = null;

    $.extend(this, options);
  }

  public currentValue (): number {
    return this.sliderModel ? this.sliderModel.currentRoundValue : 0;
  }

  public currentMaxValue (): number {
    return this.sliderModel ? this.sliderModel.currentRoundEndValue : 0;
  }

  public minValue (): number {
    return this.sliderModel ? this.sliderModel.minVal : 0;
  }

  public maxValue (): number {
    return this.sliderModel ? this.sliderModel.maxVal : 0;
  }

  public stepSize (): number {
    return this.sliderModel ? this.sliderModel.step : 0;
  }

  public setMinValue (val: number | string): void {
    this.minVal = typeof val === 'string' ? parseInt(val) : val;
    this.init();
  }

  public setMaxValue (val: number | string): void {
    this.maxVal = typeof val === 'string' ? parseInt(val) : val;
    this.init();
  }

  public setCurrentValue (val: number): void | false {
    if (!this.sliderModel) {
      return false;
    }
    this.sliderModel.currentValue = val;
  }

  public setCurrentMaxValue (val: number): void | false{
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
    if (!this.el) {
      return;
    }
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
      isScale: this.isScale,
      trackItemsQuantity: this.trackItemsQuantity
    });

    if (this.sliderView && this.sliderModel) {
        this.sliderView.updateSlider();
        this.sliderController = new SliderController(this.sliderView, this.sliderModel);
        if (this.sliderController) {
            this.sliderController.init();
        }
    }
  }
}


