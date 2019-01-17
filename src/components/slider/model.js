export default class SliderModel {
  constructor (val = 0, minVal = 0, maxVal = 100, sliderType = 'single') {
    this.val = val;
    this.minVal = minVal;
    this.maxVal = maxVal;
    this.type = sliderType;
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

}