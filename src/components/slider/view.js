export default class SliderView {
  constructor (options) {
    this.el = options.el;
    this.runner1 = {};
    this.runner2 = {};
    this.progressFull = null;
    this.isGenerated = false;
    this.type = options.type || 'single';
    this.orientation = options.orientation || 'horizontal';
    this.isTip = options.isTip || false;
    this.model = options.model;
  }

  get _sliderLeftPoint () {
    return this.el.getBoundingClientRect().left;
  }

  get _sliderTopPoint () {
    return this.el.getBoundingClientRect().top;
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
    return this.runner1.el.getBoundingClientRect().top - this.el.getBoundingClientRect().top;
  }

  get lastRunnerTopIndent () {
    if (this.runner2.el) {
      return this.runner2.el.getBoundingClientRect().top - this.el.getBoundingClientRect().top;
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
    if (this.isTip) {
      this[runner].tip = this._createElem('div', 'slider__tip' + tipClass, this[runner].el);
    }
    this[runner].shiftX = 0;
    this[runner].shiftY = 0;
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
    if (this.isTip) {
      runner.tip.innerHTML = val;
    }
  }

  drawSlider () {
    if (this.isGenerated) {
      return;
    }
    this._drawSliderProgress();
    this.createRunner('runner1');
    this.setRunnerPosition(this.runner1, this.model.maxVal / this.model.startValue );
    this._updateSliderTip(this.runner1, this.model.startValue);
    if (this.type === 'interval') {
      this.createRunner('runner2');

      this.setRunnerPosition(this.runner2, this.model.maxVal / this.model.endValue);
      this._updateSliderTip(this.runner2, this.model.endValue);
    }
    this.animateProgress(this.model.maxVal / this.model.startValue);
    this.isGenerated = true;
  }

  setRunnerPosition (runner, pos) {
    let direction = this.orientation === 'horizontal' ? 'left' : 'top';
    let gabarite = this.orientation === 'horizontal' ? 'clientWidth' : 'clientHeight';
    runner.el.style[direction] = (this.el[gabarite] - runner.el[gabarite]) / pos + 'px';
  }

  // setRunnerPosition (runner, pos, direction) {
  //   runner.el.style[direction] = pos + 'px';
  // }

  setRunnerShiftX (e, runner) {
    runner.shiftX = e.pageX - runner.el.getBoundingClientRect().left;
  }

  setRunnerShiftY (e, runner) {
    runner.shiftY = e.pageY - runner.el.getBoundingClientRect().top;
  }

  setSingleProgressLength (pos, property, gabarite) {
    console.log(pos);
    if (pos !== 0) {
      this.progressFull.style[property] = (this.el[gabarite] - this.runner1.el[gabarite]) / pos + this.runner1.el[gabarite]/2 + 'px';
    } else {
      this.progressFull.style[property] = '0px';
    }
  }

  setIntervalProgress (indent, length, propGabarite, direction, gabarite) {
    this.progressFull.style.position = 'absolute';
    this.progressFull.style[propGabarite] = length + 'px';
    this.progressFull.style[direction] = indent + this.runner1.el[gabarite]/2 + 'px';
  }

  calculateMousePosition(coord, gabarite) {
    return (this.el[gabarite] - this.runner1.el[gabarite]) / coord;
  }

  checkMovingIntervalRunners (coordX, runner, startPoint, firstIndent, lastIndent, shift) {
    let firstRunnerCheckout =
        coordX > startPoint + lastIndent + shift
        && this.runner1.el === runner.el;

    let secondRunnerCheckout =
        coordX < startPoint + firstIndent + shift
        && this.runner2.el === runner.el;

    this.runner1.el.style.zIndex = '1';
    this.runner2.el.style.zIndex = '1';
    runner.el.style.zIndex = '99999';

    return !(firstRunnerCheckout || secondRunnerCheckout);
  }

  _checkCursorPosition (coord, runner, startPoint, endPoint, shift, gabarite) {
    let runnerIndent;
     if (coord < startPoint + shift) {
       runnerIndent = 0;
     } else if (coord > endPoint + shift) {
       runnerIndent = this.el[gabarite] - runner.el[gabarite];
     } else {
      runnerIndent = coord - startPoint - shift;
    }
    return runnerIndent;
  }

  moveRunnerOrientation (runner, coord, startPoint, endPoint, direction, firstIndent, lastIndent, shift, gabarite) {

    let runnerIndent = this._checkCursorPosition(coord, runner, startPoint, endPoint, shift, gabarite);
    let ratio = this.calculateMousePosition(runnerIndent, gabarite);

    if (this.type === 'interval' && !this.checkMovingIntervalRunners(coord, runner, startPoint, firstIndent, lastIndent, shift)) {
      return false;
    }

    runner.el.dispatchEvent(new CustomEvent('move', {
      bubbles: true,
      detail: ratio
    }));
  }

  moveRunner (e, runner) {
    if (this.orientation === 'horizontal') {
      this.moveRunnerOrientation(runner, e.pageX, this._sliderLeftPoint, this._sliderRightPoint, 'left', this.firstRunnerLeftIndent, this.lastRunnerLeftIndent, runner.shiftX, 'offsetWidth');
    } else {
      this.moveRunnerOrientation(runner, e.pageY, this._sliderTopPoint, this._sliderBottomPoint, 'top', this.firstRunnerTopIndent, this.lastRunnerTopIndent, runner.shiftY, 'offsetHeight');
    }
  }

  _animateIntervalProgress (firstIndent, lastIndent, propGabarite, direction, gabarite) {
    let progressLength = lastIndent - firstIndent;
    this.setIntervalProgress(firstIndent, progressLength, propGabarite, direction, gabarite);
  }

  _animateSingleProgress (coefficient) {
    if (this.orientation === 'horizontal') {
      this.setSingleProgressLength(coefficient, 'width', 'clientWidth');
    } else {
      this.setSingleProgressLength(coefficient, 'height', 'clientHeight');
    }
  }

  animateProgress (coefficient) {
    if (this.type === 'interval') {
      if (this.orientation === 'horizontal') {
        this._animateIntervalProgress(this.firstRunnerLeftIndent, this.lastRunnerLeftIndent, 'width', 'left', 'clientWidth');
      } else {
        this._animateIntervalProgress(this.firstRunnerTopIndent, this.lastRunnerTopIndent, 'height', 'top', 'clientHeight');
      }
    } else {
        this._animateSingleProgress(coefficient);
    }
  }
}