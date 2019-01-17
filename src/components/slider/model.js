export default class SliderModel {
  constructor (options) {
    this.val = 0;
    this.minVal = 0;
    this.maxVal = 100;
    this.sliderType = 'single';
  }

  getValue () {
    return this.val;
  }

  getExtremeValues () {
    return {
      min: this.minVal,
      max: this.maxVal
    }
  }

  getSliderType () {
    return this.sliderType;
  }

  setValue (val) {
    this.val = val;
  }

  setExtremeValues(min, max) {
    this.minVal = min;
    this.maxVal = max;
  }

  setSliderType (type) {
    if (type === 'interval') {
      this.sliderType = 'interval'
    }
  }

}