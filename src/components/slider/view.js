import $ from 'jquery';
import RunnerView from './runner/RunnerView';
import TipView from './tip/TipView';
import TrackView from './track/TrackView';
import ScaleView from './scale/ScaleView';

export default class SliderView {
  constructor (options = {}) {
    $.extend(this, {
      el: options.el,
      runner1: null,
      runner2: null,
      tip1: null,
      tip2: null,
      track: null,
      trackStep: 10,
      progressFull: null,
      scale: null,
      isGenerated: false,
      type: 'single',
      orientation: 'horizontal',
      isTip: false,
      isScale: false,
      model: options.model
    }, options);
  }

  get _sliderLeftPoint () {
    return this.el.offset().left;
  }

  get _sliderTopPoint () {
    return this.el.offset().top;
  }

  get _sliderRightPoint () {
    return this.el.offset().left + this.el.innerWidth();
  }

  get _sliderBottomPoint () {
    return this.el.offset().top + this.el.innerHeight();
  }

  get sliderType () {
    return this.type;
  }

  get _innerWidth () {
    return this.el.innerWidth() - this.runner1.el.innerWidth();
  }

  get _innerHeight () {
    return this.el.innerHeight() - this.runner1.el.innerHeight();
  }

  get _runnerWidth () {
    return this.runner1.el.innerWidth();
  }

  get _runnerHeight () {
    return this.runner1.el.innerHeight();
  }

  set sliderOrientation (orientation) {
    if(orientation === 'vertical') {
      this.orientation = 'vertical';
    }
  }

  drawSlider () {
    if (this.isGenerated) {
      return;
    }

    this.runner1 = new RunnerView({
      type: this.type,
      orientation: this.orientation,
      parentLeftPoint: this._sliderLeftPoint,
      parentRightPoint: this._sliderRightPoint,
      parentTopPoint: this._sliderTopPoint,
      parentBottomPoint: this._sliderBottomPoint
    });
    this.runner1.drawRunner(this.el, this.model.maxVal / this.model.startValue + this.model.minVal);

    if (this.isTip) {
      this.tip1 = new TipView({
        type: this.type,
        orientation: this.orientation
      });
      this.tip1.drawTip(this.runner1.el, this.model.startValue);
    }

    if (this.type === 'interval') {

      this.runner2 = new RunnerView({
        type: this.type,
        orientation: this.orientation,
        parentLeftPoint: this._sliderLeftPoint,
        parentRightPoint: this._sliderRightPoint,
        parentTopPoint: this._sliderTopPoint,
        parentBottomPoint: this._sliderBottomPoint
      });
      this.runner2.drawRunner(this.el, this.model.maxVal / this.model.endValue);

      if (this.isTip) {
        this.tip2 = new TipView({
          type: this.type,
          orientation: this.orientation
        });
        this.tip2.drawTip(this.runner2.el, this.model.endValue);
      }
    }

    this.track = new TrackView({
      type: this.type,
      orientation: this.orientation,
      parentWidth: this._innerWidth,
      parentHeight: this._innerHeight,
      runnerWidth: this._runnerWidth,
      runnerHeight: this._runnerHeight,
      parentLeftPoint: this._sliderLeftPoint,
      parentRightPoint: this._sliderRightPoint,
      parentTopPoint: this._sliderTopPoint,
      parentBottomPoint: this._sliderBottomPoint
    });
    this.track.drawTrack(this.el, this.model.maxVal / this.model.startValue, this.model.maxVal / this.model.endValue);

    if (this.isScale) {
      this.scale = new ScaleView({
        parentWidth: this._innerWidth,
        parentHeight: this._innerHeight,
        type: this.type,
        orientation: this.orientation
      });
      this.scale.drawScale(this.el, this.model.minVal, this.model.maxVal, this.trackStep);
    }

    this.isGenerated = true;
  }

}