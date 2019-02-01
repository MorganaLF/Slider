import RunnerView from './runner/RunnerView';
import TipView from './tip/TipView';

export default class SliderView {
  constructor (options = {}) {
    Object.assign(this, {
      el: options.el,
      runner1: null,
      runner2: null,
      tip1: null,
      tip2: null,
      progressFull: null,
      isGenerated: false,
      type: 'single',
      orientation: 'horizontal',
      isTip: false,
      model: options.model
    }, options);
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

  get sliderGabarites () {
    return {
      width: this.el.clientWidth,
      height: this.el.clientHeight
    }
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

  _drawSliderProgress () {
    let progressClass =
        this.orientation === 'horizontal' ? '' : ' slider__progress_vertical';
    let progressFullClass =
        this.orientation === 'horizontal' ? '' : ' slider__progress-full_vertical';

    let sliderProgress = this._createElem('div', 'slider__progress' + progressClass, this.el);
    this.progressFull = this._createElem('div', 'slider__progress-full' + progressFullClass, sliderProgress);
  }

  drawSlider () {
    if (this.isGenerated) {
      return;
    }

    this._drawSliderProgress();

    this.runner1 = new RunnerView({parent: this});
    this.runner1.drawRunner(this.el, this.model.maxVal / this.model.startValue);

    if (this.isTip) {
      this.tip1 = new TipView();
      this.tip1.drawTip(this.runner1.el, this.model.startValue);
    }

    //this._updateSliderTip(this.runner1, this.model.startValue);
    if (this.type === 'interval') {

      this.runner2 = new RunnerView({parent: this});
      this.runner2.drawRunner(this.el, this.model.maxVal / this.model.endValue);

      if (this.isTip) {
        this.tip2 = new TipView();
        this.tip2.drawTip(this.runner2.el, this.model.endValue);
      }
      //this._updateSliderTip(this.runner2, this.model.endValue);
    }
    this.animateProgress(this.model.maxVal / this.model.startValue);
    this.isGenerated = true;
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