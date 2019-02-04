import RunnerView from './runner/RunnerView';
import TipView from './tip/TipView';
import TrackView from './track/TrackView';

export default class SliderView {
  constructor (options = {}) {
    Object.assign(this, {
      el: options.el,
      runner1: null,
      runner2: null,
      tip1: null,
      tip2: null,
      track: null,
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

  drawSlider () {
    if (this.isGenerated) {
      return;
    }

    this.runner1 = new RunnerView({parent: this});
    this.runner1.drawRunner(this.el, this.model.maxVal / this.model.startValue + this.model.minVal);

    if (this.isTip) {
      this.tip1 = new TipView();
      this.tip1.drawTip(this.runner1.el, this.model.startValue);
    }

    //this._updateSliderTip(this.runner1, this.model.startValue);
    if (this.type === 'interval') {

      this.runner2 = new RunnerView({parent: this});
      this.runner2.drawRunner(this.el, this.model.maxVal / this.model.endValue + this.model.minVal);

      if (this.isTip) {
        this.tip2 = new TipView();
        this.tip2.drawTip(this.runner2.el, this.model.endValue);
      }
      //this._updateSliderTip(this.runner2, this.model.endValue);
    }

    this.track = new TrackView({parent: this});
    this.track.drawTrack(this.el, this.model.maxVal / this.model.startValue + this.model.minVal);
    //this.animateProgress(this.model.maxVal / this.model.startValue);
    this.isGenerated = true;
  }

}