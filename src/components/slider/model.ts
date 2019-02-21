//import $ from 'jquery';
import $ = require('jquery');
import {SliderModelOptions} from '../interfaces';


export default class SliderModel {
  [key: string]: any;
  public startValue: number;
  public endValue: number;
  public minVal: number;
  public maxVal: number;
  public type: string;
  public step: number;

  constructor (options: SliderModelOptions) {
    this.startValue = 0;
    this.endValue = 100;
    this.minVal = 0;
    this.maxVal = 100;
    this.type = 'single';
    this.step = 0;

    $.extend(this, options);

    this._validateConstructor();
  }

  public get currentRoundValue (): number {
    return this._calculateRoundValue(this.startValue);
  }

  public get currentRoundEndValue (): number {
    return this._calculateRoundValue(this.endValue);
  }

  public set currentValue (val: number) {
    this.startValue = val;
    this._checkIsNumber('startValue');
    this._checkCurrentValue('startValue');
    this._checkStepValue ('startValue');
    if (this.type === 'interval') {
      this._checkIntervalValues('startValue');
    }
    this._dispatchChangeValue('changestartvalue', this.startValue);
  }

  public set currentMaxValue (val: number) {
    if (this.type === 'single') {
      return;
    }
    this.endValue = val;
    this._checkIsNumber('endValue');
    this._checkCurrentValue('endValue');
    this._checkStepValue ('endValue');
    this._checkIntervalValues('endValue');
    this._dispatchChangeValue('changeendvalue', this.endValue);
  }

  private _validateConstructor (): void {
    this._checkIsNumber('startValue');
    this._checkIsNumber('endValue');
    this._checkIsNumber('minVal');
    this._checkIsNumber('maxVal');
    this._checkIsNumber('step');
    this._checkPositiveNumber('minVal');
    this._checkPositiveNumber('maxVal');
    this._checkCurrentValue('startValue');
    this._checkCurrentValue('endValue');
    this._checkStepValue ('minVal');
    this._checkStepValue ('maxVal');
    this._checkStepValue ('startValue');
    this._checkStepValue ('endValue');
  }

  private _checkIsNumber (prop: string): void {
    if (isNaN(this[prop])) {
      this[prop] = 0;
    }
  }

  private _checkPositiveNumber (prop: string): void {
    if (this[prop] < 0) {
      this[prop] = Math.abs(this[prop]);
    }
  }

  private _checkCurrentValue (prop: string): void {
    if (this[prop] < this.minVal) {
      this[prop] = this.minVal;
    }

    if (this[prop] > this.maxVal) {
      this[prop] = this.maxVal;
    }
  }

  private _checkStepValue (prop: string): void {
    if (this.step && this[prop] % this.step !== 0) {
      this[prop] = Math.round(this[prop] / this.step) * this.step
    }
  }

  private _checkIntervalValues (valueName: string): boolean {
    if (this.startValue > this.endValue && this[valueName] === this.startValue) {
      this.startValue = this.endValue;
      return false;
    }

    if (this.endValue < this.startValue && this[valueName] === this.endValue) {
      this.endValue = this.startValue;
      return false;
    }

    return true;
  }

  private _dispatchChangeValue (type: string, value: number): void {
    let changeValueEvent = $.Event( type, { detail: {
            model: this,
            value: this._calculateRoundValue(value),
            coefficient: this.calculateCoefficient(value)
        }
    } );
    $(document.body).trigger(changeValueEvent);
  }

  private _calculateRoundValue (val: number): number {
    return Math.round(val);
  }

  private _calculateStepValue (val: number): number {
    return (Math.round((this.maxVal - this.minVal) / val / this.step)) * this.step;
  }

  public calculateCoefficient (point: number): number {
    return (this.maxVal - this.minVal) / (point - this.minVal);
  }

  public calculateValue (val: number, valueName: string): void | boolean {

    if (this.step === 0) {
      this[valueName] = (this.maxVal - this.minVal) / val + this.minVal;
    } else {
      this[valueName] = this._calculateStepValue(val) + this.minVal;
    }

    if (this.type === 'interval' && !this._checkIntervalValues(valueName)) {
      return false;
    }

    if (this[valueName] === this.startValue) {
      this._dispatchChangeValue('changestartvalue', this.startValue);
    }

    if (this[valueName] === this.endValue && this.type === 'interval') {
      this._dispatchChangeValue('changeendvalue', this.endValue);
    }

  }

}