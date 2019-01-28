export default class SliderModel {
  constructor (val = 0, minVal = 0, maxVal = 100, sliderType = 'single') {
    this.val = val;
    this.startValue = minVal;
    this.endValue = maxVal;
    this.minVal = minVal;
    this.maxVal = maxVal;
    this.type = sliderType;
    this.step = 0;
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
    return (Math.round(this.maxVal / val / this.step)) * this.step;
  }

  calculateCoefficient (point) {
    return this.maxVal / point;
  }

  calculateValue (val, runnerType) {
    let value;
    let coefficient;

    if (this.step === 0) {
      value = Math.floor(this.maxVal / val);
      coefficient = val;
    } else {
      value = this.calculateStepValue(val);
      coefficient = this.calculateCoefficient(this[runnerType]);
    }

    this[runnerType] = value;

    return coefficient;
  }

}