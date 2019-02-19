import $ from 'jquery';
import RunnerView from './runner/RunnerView';
import TipView from './tip/TipView';
import TrackView from './track/TrackView';
import ScaleView from './scale/ScaleView';

type RunnerViewOptions = {
    el: null | JQuery,
    shiftX: number,
    shiftY: number,
    type: string,
    orientation: string,
    parentLeftPoint: number,
    parentRightPoint: number,
    parentTopPoint: number,
    parentBottomPoint: number
}

type SliderViewOptions = {
   el: null | JQuery,
   runner1: null | RunnerViewOptions,
   runner2: null | RunnerViewOptions,
   tip1: null | {},
   tip2: null | {},
   track: null | {},
   trackItemsQuantity: number,
   progressFull: null | {},
   scale: null | {},
   type: string,
   orientation: string,
   isTip: boolean,
   isScale: boolean,
   model: {}
}

export default class SliderView {
  private el: null | JQuery;
  public runner1: null | RunnerViewOptions;
  public runner2: null | RunnerViewOptions;
  public tip1: null | {};
  public tip2: null | {};
  public track: null | {};
  private trackItemsQuantity: number;
  private progressFull: null | {};
  private scale: null | {};
  private type: string;
  private orientation: string;
  private isTip: boolean;
  private isScale: boolean;
  private model: {};

  constructor (options: SliderViewOptions) {
      this.el = options.el;
      this.runner1 = null;
      this.runner2 = null;
      this.tip1 = null;
      this.tip2 = null;
      this.track = null;
      this.trackItemsQuantity = 10;
      this.progressFull = null;
      this.scale = null;
      this.type = 'single';
      this.orientation = 'horizontal';
      this.isTip = true;
      this.isScale = false;
      this.model = options.model;

      $.extend(this, options);
  }

  private get _sliderLeftPoint (): number | false {
      return this.el ? this.el.offset()!.left : false;
  }

  private get _sliderTopPoint (): number | false {
      return this.el ? this.el.offset()!.top : false;
  }

  private get _sliderRightPoint (): number | false {
      return this.el ? this.el.offset()!.left + this.el.innerWidth()! : false;
  }

  private get _sliderBottomPoint (): number | false {
    return this.el ? this.el.offset()!.top + this.el.innerHeight()! : false;
  }

  private get _innerWidth (): number | false {
      if (!this.el || !this.runner1 || !this.runner1.el) {
          return false;
      }
      return this.el.innerWidth()! - this.runner1.el.innerWidth()!;
  }

  private get _innerHeight (): number | false {
      if (!this.el || !this.runner1 || !this.runner1.el) {
          return false;
      }
    return this.el.innerHeight()! - this.runner1.el.innerHeight()!;
  }

  private get _runnerWidth (): number | false {
      if (!this.runner1 || !this.runner1.el) {
          return false;
      }
    return this.runner1.el.innerWidth()!;
  }

  private get _runnerHeight (): number | false {
      if (!this.runner1 || !this.runner1.el) {
          return false;
      }
    return this.runner1.el.innerHeight()!;
  }

  public updateSlider (): void | false {
      if (!this.el) {
          return false;
      }
      this.el.html('');
      this._drawSlider();
  }

  private _createRunner (prop: string, point: number): void {
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

  private _createTip (prop: string, el: JQuery, val: number): void {
    this[prop] = new TipView({
      type: this.type,
      orientation: this.orientation
    });
    this[prop].drawTip(el, val);
  }

  private _createTrack (): void {
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

  private _createScale (): void {
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

  private _drawSlider (): void {
    this._createRunner('runner1', this.model.startValue);

    if (this.isTip && this.runner1) {
      this._createTip('tip1', this.runner1.el!, this.model.startValue);
    }

    if (this.type === 'interval') {
      this._createRunner('runner2', this.model.endValue);

      if (this.isTip && this.runner2) {
        this._createTip('tip2', this.runner2.el!, this.model.endValue);
      }
    }

    this._createTrack();

    if (this.isScale) {
      this._createScale();
    }
  }

}