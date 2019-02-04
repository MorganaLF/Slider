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

    if (options.step && options.minVal % options.step !== 0) {
      this.minVal = Math.round(options.minVal / options.step) * options.step
    }
    if (options.step && options.maxVal % options.step !== 0) {
      this.maxVal = Math.round(options.maxVal / options.step) * options.step
    }
    if (options.step && options.startValue % options.step !== 0) {
      this.startValue = Math.round(options.startValue / options.step) * options.step
    }
    if (options.step && options.endValue % options.step !== 0) {
      this.endValue = Math.round(options.endValue / options.step) * options.step
    }
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

  calculateRoundValue (val) {
    return Math.round(val);
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
      value = (this.maxVal - this.minVal) / val + this.minVal;
      coefficient = val;
    } else {
      value = this.calculateStepValue(val) + this.minVal;
      coefficient = this.calculateCoefficient(this[runnerType]);
    }

    this[runnerType] = value;

    if (this[runnerType] === this.startValue) {
      document.body.dispatchEvent(new CustomEvent('changestartvalue', {
        bubbles: true,
        detail: {
          value: this.calculateRoundValue(this.startValue),
          coefficient: coefficient
        }
      }));
    }

    if (this[runnerType] === this.endValue) {
      document.body.dispatchEvent(new CustomEvent('changeendvalue', {
        bubbles: true,
        detail: {
          value: this.calculateRoundValue(this.endValue),
          coefficient: coefficient
        }
      }));
    }

    if (this.type === 'interval') {
      if (this.startValue > this.endValue && this[runnerType] === this.startValue) {
        this.startValue = this.endValue;

        document.body.dispatchEvent(new CustomEvent('changestartvalue', {
          bubbles: true,
          detail: {
            value: this.calculateRoundValue(this.startValue),
            coefficient: coefficient
          }
        }));

        return false;
      }

      if (this.endValue < this.startValue && this[runnerType] === this.endValue) {
        this.endValue = this.startValue;

        document.body.dispatchEvent(new CustomEvent('changeendvalue', {
          bubbles: true,
          detail: {
            value: this.calculateRoundValue(this.endValue),
            coefficient: coefficient
          }
        }));

        return false;
      }
    }

    return coefficient;
  }

}