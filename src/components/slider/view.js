export default class SliderView {
  constructor (options) {
    this.el = options.el;
    this.runner = null;
    this.progressFull = null;
    this.tip = null;
    this.shiftX = null;
    this.isGenerated = false;
  }

  get _sliderLeftPoint () {
    return this.el.getBoundingClientRect().left + pageXOffset;
  }

  get _sliderRightPoint () {
    return this._sliderLeftPoint + this.el.offsetWidth - this.runner.offsetWidth;
  }

  _createElem (el, elclass, parent) {
    let elem = document.createElement(el);
    elem.classList.add(elclass);
    parent.appendChild(elem);
    return elem;
  }

  _drawSliderProgress () {
    let sliderProgress = this._createElem('div', 'slider__progress', this.el);
    this.progressFull = this._createElem('div', 'slider__progress-full', sliderProgress);
  }

  _drawSliderRunner () {
    this.runner = this._createElem('div', 'slider__runner', this.el);
  }

  _drawSliderTip () {
    this.tip = this._createElem('div', 'slider__tip', this.runner);
  }

  _updateSliderTip (val) {
    this.tip.innerHTML = val;
  }

  drawSlider () {
    if (!this.isGenerated) {
      this._drawSliderProgress();
      this._drawSliderRunner();
      this._drawSliderTip();
      this.isGenerated = true;
    }
  }

  setRunnerPosition (pos) {
    this.runner.style.left = pos + 'px';
  }

  setRunnerShiftX (e) {
    this.shiftX = e.pageX - this.runner.getBoundingClientRect().left + pageXOffset;
  }

  setProgressWidth (width) {
    this.progressFull.style.width = width + 'px';
  }

  moveRunner (e) {
    let runnerLeftIndent;
    let coordX = e.pageX;

    if (coordX < this._sliderLeftPoint + this.shiftX) {
      runnerLeftIndent = 0;
    } else if (coordX > this._sliderRightPoint + this.shiftX) {
      runnerLeftIndent = this.el.offsetWidth - this.runner.offsetWidth ;
    } else {
      runnerLeftIndent = coordX - this._sliderLeftPoint - this.shiftX;
    }

    this.setRunnerPosition(runnerLeftIndent);
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




