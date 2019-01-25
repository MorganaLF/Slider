export default class SliderView {
  constructor (options) {
    this.el = options.el;
    this.runner1 = {};
    this.runner2 = {};
    this.progressFull = null;
    this.isGenerated = false;
    this.type = 'interval';
    this.orientation = 'horizontal';
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

  get firstRunnerLeftIndent () {
    return parseInt(this.runner1.el.style.left);
  }

  get lastRunnerLeftIndent () {
    if (this.runner2.el) {
      return parseInt(this.runner2.el.style.left);
    }
  }

  get firstRunnerTopIndent () {
    return parseInt(this.runner1.el.style.top);
  }

  get lastRunnerTopIndent () {
    if (this.runner2.el) {
      return parseInt(this.runner2.el.style.top);
    }
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

  setProgressLength (length, gabarite) {
    this.progressFull.style[gabarite] = length + 'px';
  }

  setIntervalProgress (indent, length, gabarite, direction) {
    this.progressFull.style.position = 'absolute';
    this.progressFull.style[gabarite] = length + 'px';
    this.progressFull.style[direction] = indent + 'px';
  }

  calculateMousePosition(coord) {
    return (this.el.clientWidth - this.runner1.el.clientWidth) / coord;
  }

  checkMovingIntervalRunners (coordX, runner, startPoint, firstIndent, lastIndent) {
    let firstRunnerCheckout =
        coordX > startPoint + lastIndent + runner.shiftX
        && this.runner1.el === runner.el;

    let secondRunnerCheckout =
        coordX < startPoint + firstIndent + runner.shiftX
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

  moveRunnerOrientation (runner, coord, startPoint, endPoint, direction, firstIndent, lastIndent) {
    let runnerIndent = this._checkCursorPosition(coord, runner, startPoint, endPoint);
    let ratio = this.calculateMousePosition(runnerIndent);

    if (this.type === 'interval' && !this.checkMovingIntervalRunners(coord, runner, startPoint, firstIndent, lastIndent)) {
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
      this.moveRunnerOrientation(runner, e.pageX, this._sliderLeftPoint, this._sliderRightPoint, 'left', this.firstRunnerLeftIndent, this.lastRunnerLeftIndent);
    } else {
      this.moveRunnerOrientation(runner, e.pageY, this._sliderTopPoint, this._sliderBottomPoint, 'top', this.firstRunnerTopIndent, this.lastRunnerTopIndent);
    }
  }

  _animateIntervalProgress (firstIndent, lastIndent, gabarite, direction) {
    let progressLength = lastIndent - firstIndent;
    this.setIntervalProgress(firstIndent, progressLength, gabarite, direction);
    console.log(progressLength)
  }

  _animateSingleProgress (e, runner) {
    let progressLength;
    if (this.orientation === 'horizontal') {
      progressLength = this._checkCursorPosition (e.pageX, runner, this._sliderLeftPoint, this._sliderRightPoint);
      this.setProgressLength(progressLength, 'width');
    } else {
      progressLength = this._checkCursorPosition (e.pageY, runner, this._sliderTopPoint, this._sliderBottomPoint);
      this.setProgressLength(progressLength, 'height');
    }
  }

  animateProgress (e, runner) {
    if (this.type === 'interval') {
      if (this.orientation === 'horizontal') {
        this._animateIntervalProgress(this.firstRunnerLeftIndent, this.lastRunnerLeftIndent, 'width', 'left');
      } else {
        this._animateIntervalProgress(this.firstRunnerTopIndent, this.lastRunnerTopIndent, 'height', 'top');
      }
    } else {
      if (this.orientation === 'horizontal') {
        this._animateSingleProgress(e, runner);
      } else {
        this._animateSingleProgress(e, runner);
      }
    }
  }
}