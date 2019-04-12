import { SliderAppOptions } from './SliderAppInterfaces';
import SliderController from '../SliderController/SliderController';
import { ISliderController } from '../SliderController/SliderControllerInterfaces';
import SliderModel from '../SliderModel/SliderModel';
import { ISliderModel } from '../SliderModel/SliderModelInterfaces';
import SliderView from '../SliderView/SliderView';
import { ISliderView } from '../SliderView/SliderViewInterfaces';

class SliderApp {
  public sliderModel: null | ISliderModel;
  public sliderView: null | ISliderView;
  public sliderController: null | ISliderController;
  public minValue: number;
  public maxValue: number;
  public stepSize: number;
  public orientation: string;
  public withTip: boolean;
  public withScale: boolean;
  public scaleMarksQuantity: number;
  readonly $element?: JQuery;
  readonly startValue: number;
  readonly endValue: number;
  readonly type: string;

  constructor(options: SliderAppOptions) {
    this.sliderModel = null;
    this.sliderView = null;
    this.sliderController = null;
    this.minValue = options.minValue || 0;
    this.maxValue = options.maxValue || 100;
    this.stepSize = options.stepSize || 0;
    this.orientation = options.orientation || 'horizontal';
    this.withTip = options.withTip !== false;
    this.withScale = options.withScale === true;
    this.scaleMarksQuantity = options.scaleMarksQuantity || 10;
    this.$element = options.$element;
    this.startValue = options.startValue || 0;
    this.endValue = options.endValue || 100;
    this.type = options.type || 'single';
  }

  public getCurrentValue(): number {
    return this.sliderModel ? this.sliderModel.getCurrentRoundedValue() : 0;
  }

  public setCurrentValue(val: number): void | false {
    if (!this.sliderModel) {
      return false;
    }

    this.sliderModel.setCurrentValue(val);
  }

  public getCurrentMaxValue(): number {
    return this.sliderModel ? this.sliderModel.getCurrentRoundedEndValue() : 0;
  }

  public setCurrentMaxValue(val: number): void | false {
    if (!this.sliderModel) {
      return false;
    }

    this.sliderModel.setCurrentEndValue(val);
  }

  public getMinValue(): number {
    return this.sliderModel ? this.sliderModel.minValue : 0;
  }

  public setMinValue(val: number | string): void {
    this.minValue = typeof val === 'string' ? parseInt(val, 10) : val;
    this.init();
  }

  public getMaxValue(): number {
    return this.sliderModel ? this.sliderModel.maxValue : 0;
  }

  public setMaxValue(val: number | string): void {
    this.maxValue = typeof val === 'string' ? parseInt(val, 10) : val;
    this.init();
  }

  public getStepSize(): number {
    return this.sliderModel ? this.sliderModel.stepSize : 0;
  }

  public setStepSize(val: number): void {
    this.stepSize = val;
    this.init();
  }

  public getScaleMarksQuantity(): number {
    return this.scaleMarksQuantity;
  }

  public setScaleMarksQuantity(val: number): void {
    this.scaleMarksQuantity = val;
    this.init();
  }

  public setVerticalOrientation(): void {
    this.orientation = 'vertical';
    this.init();
  }

  public setHorizontalOrientation(): void {
    this.orientation = 'horizontal';
    this.init();
  }

  public showTip(): void {
    this.withTip = true;
    this.init();
  }

  public hideTip(): void {
    this.withTip = false;
    this.init();
  }

  public showScale(): void {
    this.withScale = true;
    this.init();
  }

  public hideScale(): void {
    this.withScale = false;
    this.init();
  }

  public init(): void | false {
    if (!this.$element) {
      return false;
    }

    this.sliderModel = new SliderModel({
      startValue: this.startValue,
      endValue: this.endValue,
      minValue: this.minValue,
      maxValue: this.maxValue,
      stepSize: this.stepSize,
      type: this.type,
    });

    this.sliderView = new SliderView({
      $element: this.$element,
      type: this.type,
      orientation: this.orientation,
      withTip: this.withTip,
      withScale: this.withScale,
      scaleMarksQuantity: this.scaleMarksQuantity,
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

export default SliderApp;
