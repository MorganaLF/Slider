export default class SliderModel {
  constructor (options = {}) {
    Object.assign(this, {
      val: 0,
      startValue: 0,
      endValue: 100,
      minVal: 0,
      maxVal: 100,
      type: 'single',
      step: 0
    }, options);
  }

  get currentValue () {
    return this.val;
  }

  get extremeValues () {
    return {
      min: this.minVal,
      max: this.maxVal
    }
  }

  get sliderType () {
    return this.type;
  }

  set currentValue (val) {
    this.val = val;
  }

  set extremeValues (values) {
    this.minVal = values.min;
    this.maxVal = values.max;
  }

  set sliderType (type) {
    if (type === 'interval') {
      this.type = 'interval'
    }
  }

  set stepSize (size) {
    this.step = size;
  }

  calculateStepValue (val) {
    return (Math.round((this.maxVal - this.minVal) / val / this.step)) * this.step;
  }

  calculateCoefficient (point) {
    return (this.maxVal - this.minVal) / (point - this.minVal);
  }

  calculateValue (val, runnerType) {
    let value;
    let coefficient;

    if (this.step === 0) {
      value = Math.floor((this.maxVal - this.minVal) / val) + this.minVal;
      coefficient = val;
    } else {
      value = this.calculateStepValue(val) + this.minVal;
      coefficient = this.calculateCoefficient(this[runnerType]);
    }

    this[runnerType] = value;

    return coefficient;
  }

}