export default class SliderView {
  constructor (options) {
    this.el = options.el;
    this.runner1 = {};
    this.runner2 = {};
    this.progressFull = null;
    this.isGenerated = false;
    this.type = 'single';
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

  get firstRunnerIndent () {
    return parseInt(this.runner1.el.style.left);
  }

  get lastRunnerIndent () {
    return parseInt(this.runner2.el.style.left);
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

  _updateSliderTip (runner, val) {
    runner.tip.innerHTML = val;
  }

  drawSlider () {
    if (this.isGenerated) {
      return;
    }
    this._drawSliderProgress();
    this.createRunner('runner1');
    if (this.type === 'interval') {
      this.createRunner('runner2');
    }
    this.isGenerated = true;
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

  setIntervalProgress (left, width) {
    this.progressFull.style.position = 'absolute';
    this.progressFull.style.width = width + 'px';
    this.progressFull.style.left = left + 'px';
  }

  calculateMousePosition(coord) {
    return (this.el.clientWidth - this.runner1.el.clientWidth) / coord;
  }

  checkMovingIntervalRunners (coordX, runner) {
    let firstRunnerCheckout =
        coordX > this._sliderLeftPoint + this.lastRunnerIndent + runner.shiftX
        && this.runner1.el === runner.el;

    let secondRunnerCheckout =
        coordX < this._sliderLeftPoint + this.firstRunnerIndent + runner.shiftX
        && this.runner2.el === runner.el;

    this.runner1.el.style.zIndex = '1';
    this.runner2.el.style.zIndex = '1';
    runner.el.style.zIndex = '99999';

    return !(firstRunnerCheckout || secondRunnerCheckout);
  }

  _checkCursorPosition (coordX, runner) {
    let runnerLeftIndent;
    if (coordX < this._sliderLeftPoint + runner.shiftX) {
      runnerLeftIndent = 0;
    } else if (coordX > this._sliderRightPoint + runner.shiftX) {
      runnerLeftIndent = this.el.offsetWidth - runner.el.offsetWidth;
    } else {
      runnerLeftIndent = coordX - this._sliderLeftPoint - runner.shiftX;
    }
    return runnerLeftIndent;
  }

  moveRunner (e, runner) {
    let coordX = e.pageX;
    let runnerLeftIndent = this._checkCursorPosition(coordX, runner);
    let ratio = this.calculateMousePosition(runnerLeftIndent);

    if (this.type === 'interval' && !this.checkMovingIntervalRunners(coordX, runner)) {
      return false;
    }

    this.setRunnerPosition(runner, runnerLeftIndent);

    this.el.dispatchEvent(new CustomEvent('move', {
      bubbles: true,
      detail: ratio
    }));
  }

  _animateIntervalProgress () {
    let progressWidth = this.lastRunnerIndent - this.firstRunnerIndent;
    this.setIntervalProgress(this.firstRunnerIndent, progressWidth);
  }

  _animateSingleProgress (e, runner) {
    let coordX = e.pageX;
    let progressWidth = this._checkCursorPosition (coordX, runner);
    this.setProgressWidth(progressWidth);
  }

  animateProgress (e, runner) {
    if (this.type === 'interval') {
      this._animateIntervalProgress();
    } else {
      this._animateSingleProgress(e, runner);
    }
  }
}