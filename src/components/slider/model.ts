import $ from 'jquery';

export default class SliderModel {
  constructor (options = {}) {
    $.extend(this, {
      startValue: 0,
      endValue: 100,
      minVal: 0,
      maxVal: 100,
      type: 'single',
      step: 0
    }, options);

    this._validateConstructor();
  }

  get currentRoundValue (): number {
    return this._calculateRoundValue(this.startValue);
  }

  get currentRoundEndValue (): number {
    return this._calculateRoundValue(this.endValue);
  }

  set currentValue (val: number) {
    this.startValue = val;
    this._checkIsNumber('startValue');
    this._checkCurrentValue('startValue');
    this._checkStepValue ('startValue');
    if (this.type === 'interval') {
      this._checkIntervalValues('startValue');
    }
    this._dispatchChangeValue('changestartvalue', this.startValue);
  }

  set currentMaxValue (val: number) {
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

  _validateConstructor (): void {
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

  _checkIsNumber (prop: string): void {
    if (isNaN(this[prop])) {
      this[prop] = 0;
    }
  }

  _checkPositiveNumber (prop: string): void {
    if (this[prop] < 0) {
      this[prop] = Math.abs(this[prop]);
    }
  }

  _checkCurrentValue (prop: string): void {
    if (this[prop] < this.minVal) {
      this[prop] = this.minVal;
    }

    if (this[prop] > this.maxVal) {
      this[prop] = this.maxVal;
    }
  }

  _checkStepValue (prop: string): void {
    if (this.step && this[prop] % this.step !== 0) {
      this[prop] = Math.round(this[prop] / this.step) * this.step
    }
  }

  _checkIntervalValues (valueName: string): boolean {
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

  _dispatchChangeValue (type: string, value: number): void {
    $(document.body).trigger({
      model: this,
      type: type,
      value: this._calculateRoundValue(value),
      coefficient: this._calculateCoefficient(value)
    });
  }

  _calculateRoundValue (val: number): number {
    return Math.round(val);
  }

  _calculateStepValue (val: number): number {
    return (Math.round((this.maxVal - this.minVal) / val / this.step)) * this.step;
  }

  _calculateCoefficient (point: number): number {
    return (this.maxVal - this.minVal) / (point - this.minVal);
  }

  calculateValue (val: number, valueName: string): void | boolean {

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