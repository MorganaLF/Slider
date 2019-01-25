export default class SliderView {
  constructor (options) {
    this.el = options.el;
    this.runner1 = {};
    this.runner2 = {};
    this.progressFull = null;
    this.isGenerated = false;
    this.type = 'single';
    this.orientation = 'vertical';
  }

  get _sliderLeftPoint () {
    return this.el.getBoundingClientRect().left + pageXOffset;
  }

  get _sliderTopPoint () {
    return this.el.getBoundingClientRect().top + pageYOffset;
  }

  get _sliderRightPoint () {
    return this._sliderLeftPoint + this.el.offsetWidth - this.runner1.el.offsetWidth;
  }

  get _sliderBottomPoint () {
    return this._sliderTopPoint + this.el.offsetHeight - this.runner1.el.offsetHeight;
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

  set sliderOrientation (orientation) {
    if(orientation === 'vertical') {
      this.orientation = 'vertical';
    }
  }

  _createElem (el, elclass, parent) {
    let elem = document.createElement(el);
    elem.className = elclass;
    parent.appendChild(elem);
    return elem;
  }

  createRunner (runner) {
    let runnerClass =
        this.orientation === 'horizontal' ? '' : ' slider__runner_vertical';
    let tipClass =
        this.orientation === 'horizontal' ? '' : ' slider__tip_vertical';

    this[runner].el = this._createElem('div', 'slider__runner' + runnerClass, this.el);
    this[runner].tip = this._createElem('div', 'slider__tip' + tipClass, this[runner].el);
    this[runner].shiftX = 0;
  }

  _drawSliderProgress () {
    let progressClass =
        this.orientation === 'horizontal' ? '' : ' slider__progress_vertical';
    let progressFullClass =
        this.orientation === 'horizontal' ? '' : ' slider__progress-full_vertical';

    let sliderProgress = this._createElem('div', 'slider__progress' + progressClass, this.el);
    this.progressFull = this._createElem('div', 'slider__progress-full' + progressFullClass, sliderProgress);
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

  setRunnerPosition (runner, pos, direction) {
    runner.el.style[direction] = pos + 'px';
  }

  setRunnerShiftX (e, runner) {
    runner.shiftX = e.pageX - runner.el.getBoundingClientRect().left + pageXOffset;
  }

  setRunnerShiftY (e, runner) {
    runner.shiftY = e.pageY - runner.el.getBoundingClientRect().left + pageXOffset;
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

  _checkCursorPosition (coord, runner, startPoint, endPoint) {
    let runnerLeftIndent;
     if (coord < startPoint + runner.shiftX) {
       runnerLeftIndent = 0;
     } else if (coord > endPoint + runner.shiftX) {
       runnerLeftIndent = this.el.offsetWidth - runner.el.offsetWidth;
     } else {
      runnerLeftIndent = coord - startPoint - runner.shiftX;
    }
    return runnerLeftIndent;
  }

  moveRunnerOrientation (runner, coord, startPoint, endPoint, direction) {
    let runnerIndent = this._checkCursorPosition(coord, runner, startPoint, endPoint);
    let ratio = this.calculateMousePosition(runnerIndent);

    if (this.type === 'interval' && !this.checkMovingIntervalRunners(coord, runner)) {
      return false;
    }

    this.setRunnerPosition(runner, runnerIndent, direction);

    this.el.dispatchEvent(new CustomEvent('move', {
      bubbles: true,
      detail: ratio
    }));
  }

  moveRunner (e, runner) {
    if (this.orientation === 'horizontal') {
      this.moveRunnerOrientation(runner, e.pageX, this._sliderLeftPoint, this._sliderRightPoint, 'left');
    } else {
      this.moveRunnerOrientation(runner, e.pageY, this._sliderTopPoint, this._sliderBottomPoint, 'top');
    }
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