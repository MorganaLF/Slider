import $ from 'jquery';
import SliderView from './view';
import SliderModel from './model';
import SliderController from './controller';

export default class SliderApp {
  constructor (options = {}) {
    $.extend(this, {
      el: options.element,
      startValue: 0,
      endValue: 100,
      minVal: 0,
      maxVal: 100,
      type: 'single',
      orientation: 'horizontal',
      step: 0,
      isTip: true,
      isScale: false,
      sliderModel: null,
      sliderView: null,
      sliderController: null
    }, options);
  }

  currentValue (): number {
    return this.sliderModel.currentRoundValue;
  }

  currentMaxValue (): number {
    return this.sliderModel.currentRoundEndValue;
  }

  minValue (): number {
    return this.sliderModel.minVal;
  }

  maxValue (): number {
    return this.sliderModel.maxVal;
  }

  stepSize (): number {
    return this.sliderModel.step;
  }

  setMinValue (val: number): void {
    this.minVal = parseInt(val);
    this.init();
  }

  setMaxValue (val: number): void {
    this.maxVal = parseInt(val);
    this.init();
  }

  setCurrentValue (val: number): void {
    this.sliderModel.currentValue = val;
  }

  setCurrentMaxValue (val): void {
    this.sliderModel.currentMaxValue = val;
  }

  setStepSize (val: number): void {
    this.step = val;
    this.init();
  }

  showTip (): void {
    this.isTip = true;
    this.init();
  }

  hideTip (): void {
    this.isTip = false;
    this.init();
  }

  showScale (): void {
    this.isScale = true;
    this.init();
  }

  hideScale (): void {
    this.isScale = false;
    this.init();
  }

  setVeticalOrientation (): void {
    this.orientation = 'vertical';
    this.init();
  }

  setHorisontalOrientation (): void {
    this.orientation = 'horizontal';
    this.init();
  }

  init (): void {
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
    this.sliderView.updateSlider();

    this.sliderController = new SliderController(this.sliderView, this.sliderModel);
    this.sliderController.init();
  }
}


