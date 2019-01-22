export default class SliderView {
  constructor (options) {
    this.el = options.el;
    this.runner1 = {};
    this.runner2 = {};
    this.progressFull = null;
    this.tip1 = null;
    this.tip2 = null;
    this.shiftX = null;
    this.isGenerated = false;
    this.type = 'interval';
  }

  get _sliderLeftPoint () {
    return this.el.getBoundingClientRect().left + pageXOffset;
  }

  get _sliderRightPoint () {
    return this._sliderLeftPoint + this.el.offsetWidth - this.runner1.el.offsetWidth;
  }

  get sliderType () {
    return this.type;
  }

  _createElem (el, elclass, parent) {
    let elem = document.createElement(el);
    elem.classList.add(elclass);
    parent.appendChild(elem);
    return elem;
  }

  createRunner (runner) {
    this[runner].el = this._createElem('div', 'slider__runner', this.el);
    this[runner].tip = this._createElem('div', 'slider__tip', this[runner].el);
    this[runner].shiftX = 0;
  }

  _drawSliderProgress () {
    let sliderProgress = this._createElem('div', 'slider__progress', this.el);
    this.progressFull = this._createElem('div', 'slider__progress-full', sliderProgress);
  }

  _drawSliderRunner () {
    this.runner1 = this._createElem('div', 'slider__runner', this.el);
    if (this.type === 'interval') {
      this.runner2 = this._createElem('div', 'slider__runner', this.el);
    }
  }

  _drawSliderTip () {
    this.tip1 = this._createElem('div', 'slider__tip', this.runner1);
    if (this.type === 'interval') {
      this.tip2 = this._createElem('div', 'slider__tip', this.runner2);
    }
  }

  _updateSliderTip (runner, val) {
    runner.tip.innerHTML = val;
  }

  drawSlider () {
    if (!this.isGenerated) {
      this._drawSliderProgress();
      this.createRunner('runner1');
      this.createRunner('runner2');
      //this._drawSliderRunner();
      //this._drawSliderTip();
      this.isGenerated = true;
    }
  }

  setRunnerPosition (runner, pos) {
    runner.el.style.left = pos + 'px';
  }

  setRunnerShiftX (e, runner) {
    runner.shiftX = e.pageX - runner.el.getBoundingClientRect().left + pageXOffset;
  }

  setProgressWidth (width) {
    this.progressFull.style.width = width + 'px';
  }

  moveRunner (e, runner) {
    let runnerLeftIndent;
    let coordX = e.pageX;

    if (coordX < this._sliderLeftPoint + runner.shiftX) {
      runnerLeftIndent = 0;
    } else if (coordX > this._sliderRightPoint + runner.shiftX) {
      runnerLeftIndent = this.el.offsetWidth - runner.el.offsetWidth ;
    } else {
      runnerLeftIndent = coordX - this._sliderLeftPoint - runner.shiftX;
    }

    this.setRunnerPosition(runner, runnerLeftIndent);
  }

  animateProgress (e) {
    let progressWidth;
    let coordX = e.pageX;

    if (coordX < this._sliderLeftPoint + this.shiftX) {
      progressWidth = 0;
    } else if (coordX > this._sliderRightPoint + this.shiftX) {
      progressWidth  = this._sliderRightPoint - this.el.getBoundingClientRect().left;
    } else {
      progressWidth  = coordX - this.el.getBoundingClientRect().left + pageXOffset - this.shiftX;
    }

    this.setProgressWidth(progressWidth);
  }

}




