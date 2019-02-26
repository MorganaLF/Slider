//import $ from 'jquery';
import $ = require('jquery');
import SliderView from './view';
import SliderModel from './model';
import SliderController from './controller';
import {ISliderModel} from '../interfaces';
import {ISliderView} from "../interfaces";
import {ISliderController} from '../interfaces';
import {SliderAppOptions} from "../interfaces";

export default class SliderApp {
  private el?: JQuery;
  private startValue: number;
  private endValue: number;
  private minVal: number;
  private maxVal: number;
  private type: string;
  public orientation: string;
  private step: number;
  private isTip: boolean;
  public isScale: boolean;
  public scaleItemsQuantity: number;
  public sliderModel: null | ISliderModel;
  public sliderView: null | ISliderView;
  public sliderController: null | ISliderController;

  constructor (options: SliderAppOptions) {
    this.el = options.el;
    this.startValue = 0;
    this.endValue = 100;
    this.minVal = 0;
    this.maxVal = 100;
    this.type = 'single';
    this.orientation = 'horizontal';
    this.step = 0;
    this.isTip = true;
    this.isScale = false;
    this.scaleItemsQuantity = 10;
    this.sliderModel = null;
    this.sliderView = null;
    this.sliderController = null;

    $.extend(this, options);
  }

  public getCurrentValue (): number {
    return this.sliderModel ? this.sliderModel.currentRoundValue : 0;
  }

  public getCurrentMaxValue (): number {
    return this.sliderModel ? this.sliderModel.currentRoundEndValue : 0;
  }

  public getMinValue (): number {
    return this.sliderModel ? this.sliderModel.minVal : 0;
  }

  public getMaxValue (): number {
    return this.sliderModel ? this.sliderModel.maxVal : 0;
  }

  public getStepSize (): number {
    return this.sliderModel ? this.sliderModel.step : 0;
  }

  public getScaleItemsQuantity (): number {
    return this.scaleItemsQuantity;
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

  public setScaleItemsQuantity (val: number): void {
      this.scaleItemsQuantity = val;
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

  public init (): void | false {
    if (!this.el) {
      return false;
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
      scaleItemsQuantity: this.scaleItemsQuantity
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


