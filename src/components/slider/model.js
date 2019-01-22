export default class SliderModel {
  constructor (val = 0, minVal = 0, maxVal = 100, sliderType = 'interval') {
    this.val = val;
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
    this.shiftX = e.pageX - runner.getBoundingClientRect().left + pageXOffset;
  }

  calculateValue (elem, coordX) {
    let curX;
    let runner = elem.querySelector('.slider__runner');
    let sliderLeftPoint = elem.getBoundingClientRect().left + pageXOffset;
    let sliderRightPoint = sliderLeftPoint + elem.clientWidth - runner.clientWidth;

    if (coordX < sliderLeftPoint + this.shiftX) {
      curX = 0;
    } else if (coordX > sliderRightPoint + this.shiftX) {
      curX = sliderRightPoint - elem.getBoundingClientRect().left;
    } else {
      curX = coordX - elem.getBoundingClientRect().left + pageXOffset - this.shiftX;
    }

    let stepWidth = (elem.clientWidth - runner.clientWidth) / (this.maxVal - this.minVal);
    this.currentValue = Math.floor(curX / stepWidth);

  }

}