//import $ from 'jquery';
import $ = require('jquery');
import SliderView from './SliderView/SliderView';
import SliderModel from './SliderModel/SliderModel';
import SliderController from './SliderController/SliderController';
import {ISliderModel} from './interfaces';
import {ISliderView} from "./interfaces";
import {ISliderController} from './interfaces';
import {SliderAppOptions} from "./interfaces";

export default class SliderApp {
  private el?: JQuery;
  private startValue: number;
  private endValue: number;
  private minValue: number;
  private maxValue: number;
  private type: string;
  public orientation: string;
  private stepSize: number;
  private withTip: boolean;
  public withScale: boolean;
  public scaleItemsQuantity: number;
  public sliderModel: null | ISliderModel;
  public sliderView: null | ISliderView;
  public sliderController: null | ISliderController;

  constructor (options: SliderAppOptions) {
    this.el = options.el;
    this.startValue = 0;
    this.endValue = 100;
    this.minValue = 0;
    this.maxValue = 100;
    this.type = 'single';
    this.orientation = 'horizontal';
    this.stepSize = 0;
    this.withTip = true;
    this.withScale = false;
    this.scaleItemsQuantity = 10;
    this.sliderModel = null;
    this.sliderView = null;
    this.sliderController = null;

    $.extend(this, options);
  }

  public getCurrentValue (): number {
    return this.sliderModel ? this.sliderModel.getCurrentRoundedValue() : 0;
  }

  public getCurrentMaxValue (): number {
    return this.sliderModel ? this.sliderModel.getCurrentRoundedEndValue() : 0;
  }

  public getMinValue (): number {
    return this.sliderModel ? this.sliderModel.minValue : 0;
  }

  public getMaxValue (): number {
    return this.sliderModel ? this.sliderModel.maxValue : 0;
  }

  public getStepSize (): number {
    return this.sliderModel ? this.sliderModel.stepSize : 0;
  }

  public getScaleItemsQuantity (): number {
    return this.scaleItemsQuantity;
  }

  public setMinValue (val: number | string): void {
    this.minValue = typeof val === 'string' ? parseInt(val) : val;
    this.init();
  }

  public setMaxValue (val: number | string): void {
    this.maxValue = typeof val === 'string' ? parseInt(val) : val;
    this.init();
  }

  public setCurrentValue (val: number): void | false {
    if (!this.sliderModel) {
      return false;
    }
    this.sliderModel.setCurrentValue(val);
  }

  public setCurrentMaxValue (val: number): void | false{
      if (!this.sliderModel) {
          return false;
      }
    this.sliderModel.setCurrentEndValue(val);
  }

  public setStepSize (val: number): void {
    this.stepSize = val;
    this.init();
  }

  public setScaleItemsQuantity (val: number): void {
      this.scaleItemsQuantity = val;
      this.init();
  }

  public showTip (): void {
    this.withTip = true;
    this.init();
  }

  public hideTip (): void {
    this.withTip = false;
    this.init();
  }

  public showScale (): void {
    this.withScale = true;
    this.init();
  }

  public hideScale (): void {
    this.withScale = false;
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
      minValue: this.minValue,
      maxValue: this.maxValue,
      stepSize: this.stepSize,
      type: this.type
    });

    this.sliderView = new SliderView({
      $element: this.el,
      type: this.type,
      orientation: this.orientation,
      withTip: this.withTip,
      withScale: this.withScale,
      scaleMarksQuantity: this.scaleItemsQuantity,
    });

    if (this.sliderView && this.sliderModel) {
        this.sliderView.updateSlider();
        this.sliderController = new SliderController(this.sliderView, this.sliderModel);
        if (this.sliderController) {
            this.sliderController.init();
        }
      this.sliderModel.initValues();
    }
  }
}


