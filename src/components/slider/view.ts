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
      trackItemsQuantity: 10,
      progressFull: null,
      scale: null,
      type: 'single',
      orientation: 'horizontal',
      isTip: true,
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

  updateSlider () {
    this.el.html('');
    this._drawSlider();
  }

  _createRunner (prop, point) {
    this[prop] = new RunnerView({
      type: this.type,
      orientation: this.orientation,
      parentLeftPoint: this._sliderLeftPoint,
      parentRightPoint: this._sliderRightPoint,
      parentTopPoint: this._sliderTopPoint,
      parentBottomPoint: this._sliderBottomPoint
    });
    this[prop].drawRunner(this.el, this.model._calculateCoefficient(point));
  }

  _createTip (prop, el, val) {
    this[prop] = new TipView({
      type: this.type,
      orientation: this.orientation
    });
    this[prop].drawTip(el, val);
  }

  _createTrack () {
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
    this.track.drawTrack(
        this.el,
        this.model._calculateCoefficient(this.model.startValue),
        this.model._calculateCoefficient(this.model.endValue)
    );
  }

  _createScale () {
    this.scale = new ScaleView({
      parentWidth: this._innerWidth,
      parentHeight: this._innerHeight,
      type: this.type,
      orientation: this.orientation
    });
    this.scale.drawScale(
        this.el,
        this.model.minVal,
        this.model.maxVal,
        this.trackItemsQuantity
    );
  }

  _drawSlider () {
    this._createRunner('runner1', this.model.startValue);

    if (this.isTip) {
      this._createTip('tip1', this.runner1.el, this.model.startValue);
    }

    if (this.type === 'interval') {
      this._createRunner('runner2', this.model.endValue);

      if (this.isTip) {
        this._createTip('tip2', this.runner2.el, this.model.endValue);
      }
    }

    this._createTrack();

    if (this.isScale) {
      this._createScale();
    }
  }

}