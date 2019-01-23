export default class SliderModel {
  constructor (val = 0, minVal = 0, maxVal = 100, sliderType = 'interval') {
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

  calculateValue (elem, coordX, runner, runnerType) {
    let curX;
    //let runner = elem.querySelector('.slider__runner');
    let sliderLeftPoint = elem.getBoundingClientRect().left + pageXOffset;
    let sliderRightPoint = sliderLeftPoint + elem.clientWidth - runner.clientWidth;

    let firstRunnerLeftOffset = parseInt(elem.querySelectorAll('.slider__runner')[0].style.left);
    let lastRunnerLeftOffset = parseInt(elem.querySelectorAll('.slider__runner')[1].style.left);

    if(
        coordX > sliderLeftPoint + lastRunnerLeftOffset + runner.shiftX
        && elem.querySelectorAll('.slider__runner')[0] === runner
    ) {
      if(runnerType === 'startValue') {
        return this.startVal;
      } else {
        return this.endVal;
      }
    }

    else if(
        coordX < sliderLeftPoint + firstRunnerLeftOffset + runner.shiftX
        && elem.querySelectorAll('.slider__runner')[1] === runner
    ) {
      if(runnerType === 'startValue') {
        return this.startVal;
      } else {
        return this.endVal;
      }
    }

    if (coordX < sliderLeftPoint + runner.shiftX) {
      curX = 0;
    } else if (coordX > sliderRightPoint + runner.shiftX) {
      curX = sliderRightPoint - elem.getBoundingClientRect().left;
    } else {
      curX = coordX - elem.getBoundingClientRect().left + pageXOffset - runner.shiftX;
    }

    let stepWidth = (elem.clientWidth - runner.clientWidth) / (this.maxVal - this.minVal);

    if(runnerType === 'startValue') {
      return this.startVal = Math.floor(curX / stepWidth);
    } else {
      return this.endVal = Math.floor(curX / stepWidth);
    }
    //this.currentValue = Math.floor(curX / stepWidth);

  }

}