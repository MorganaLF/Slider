export default class SliderModel {
  constructor (val = 0, minVal = 0, maxVal = 100, sliderType = 'single') {
    this.val = val;
    this.startVal = minVal;
    this.endVal = maxVal;
    this.minVal = minVal;
    this.maxVal = maxVal;
    this.type = sliderType;
    this.shiftX = 0;
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

  setRunnerShiftX (e, runner) {
    runner.shiftX = e.pageX - runner.getBoundingClientRect().left + pageXOffset;
  }

  calculateValue (val, runnerType) {
    if(runnerType === 'startValue') {
      return this.startVal = Math.floor(this.maxVal / val);
    } else {
      return this.endVal = Math.floor(this.maxVal / val);
    }
  }

}