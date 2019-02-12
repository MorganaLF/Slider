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

    if (options.step && options.minVal % options.step !== 0) {
      this.minVal = Math.round(options.minVal / options.step) * options.step
    }
    if (options.step && options.maxVal % options.step !== 0) {
      this.maxVal = Math.round(options.maxVal / options.step) * options.step
    }
    if (options.step !==0 && options.startValue % options.step !== 0) {
      this.startValue = Math.round(options.startValue / options.step) * options.step
    }
    if (options.step && options.endValue % options.step !== 0) {
      this.endValue = Math.round(options.endValue / options.step) * options.step
    }
  }

  get currentRoundValue () {
    return this._calculateRoundValue(this.startValue);
  }

  get currentRoundEndValue () {
    return this._calculateRoundValue(this.endValue);
  }

  set currentValue (val) {
    if (this.step !== 0) {
      this.startValue = Math.round(val / this.step) * this.step;
    } else {
      this.startValue = val;
    }
    this._dispatchChangeValue('changestartvalue', this.startValue);
  }

  set currentMaxValue (val) {
    if (this.step !== 0) {
      this.endValue = Math.round(val / this.step) * this.step;
    } else {
      this.endValue = val;
    }
    this._dispatchChangeValue('changeendvalue', this.endValue);
  }

  _dispatchChangeValue (type, value) {
    $(document.body).trigger({
      model: this,
      type: type,
      value: this._calculateRoundValue(value),
      coefficient: this._calculateCoefficient(value)
    });
  }

  _checkIntervalValues (valueName) {
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

  _calculateRoundValue (val) {
    return Math.round(val);
  }

  _calculateStepValue (val) {
    return (Math.round((this.maxVal - this.minVal) / val / this.step)) * this.step;
  }

  _calculateCoefficient (point) {
    return (this.maxVal - this.minVal) / (point - this.minVal);
  }

  calculateValue (val, valueName) {

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

    if (this[valueName] === this.endValue) {
      this._dispatchChangeValue('changeendvalue', this.endValue);
    }

  }

}