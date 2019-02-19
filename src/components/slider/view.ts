import $ from 'jquery';
import RunnerView from './runner/RunnerView';
import TipView from './tip/TipView';
import TrackView from './track/TrackView';
import ScaleView from './scale/ScaleView';

interface ISliderModel {
    minVal: number,
    maxVal: number,
    startValue: number,
    endValue: number,
    calculateCoefficient (point: number): number
}

interface IRunnerView {
    el: JQuery,
    drawRunner (parent: JQuery, coefficient: number): void
}

interface ITrackView {
    drawTrack (parent: JQuery, coefficient: number, coefficientTwo: number): void
}

interface IScaleView {
    drawScale (parent: JQuery, minVal: number, maxVal: number, itemsQuantity: number): void
}

type SliderViewOptions = {
   el: null | JQuery,
   runner1: null | IRunnerView,
   runner2: null | IRunnerView,
   tip1: null | {},
   tip2: null | {},
   track: null | ITrackView,
   trackItemsQuantity: number,
   progressFull: null | {},
   scale: null | IScaleView,
   type: string,
   orientation: string,
   isTip: boolean,
   isScale: boolean,
   model: ISliderModel
}

export default class SliderView {
  [key: string]: any;
  private el: null | JQuery;
  public runner1: null | IRunnerView;
  public runner2: null | IRunnerView;
  public tip1: null | {};
  public tip2: null | {};
  public track: null | ITrackView;
  private trackItemsQuantity: number;
  private progressFull: null | {};
  private scale: null | IScaleView;
  private type: string;
  private orientation: string;
  private isTip: boolean;
  private isScale: boolean;
  private model: ISliderModel;

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

  private get _sliderLeftPoint (): number {
      return this.el ? this.el.offset()!.left : 0;
  }

  private get _sliderTopPoint (): number {
      return this.el ? this.el.offset()!.top : 0;
  }

  private get _sliderRightPoint (): number {
      return this.el ? this.el.offset()!.left + this.el.innerWidth()! : 0;
  }

  private get _sliderBottomPoint (): number {
    return this.el ? this.el.offset()!.top + this.el.innerHeight()! : 0;
  }

  private get _innerWidth (): number {
      if (!this.el || !this.runner1 || !this.runner1.el) {
          return 0;
      }
      return this.el.innerWidth()! - this.runner1.el.innerWidth()!;
  }

  private get _innerHeight (): number {
      if (!this.el || !this.runner1 || !this.runner1.el) {
          return 0;
      }
    return this.el.innerHeight()! - this.runner1.el.innerHeight()!;
  }

  private get _runnerWidth (): number {
      if (!this.runner1 || !this.runner1.el) {
          return 0;
      }
    return this.runner1.el.innerWidth()!;
  }

  private get _runnerHeight (): number {
      if (!this.runner1 || !this.runner1.el) {
          return 0;
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
    this[prop].drawRunner(this.el, this.model.calculateCoefficient(point));
  }

  private _createTip (prop: string, el: JQuery, val: number): void {
    this[prop] = new TipView({
      type: this.type,
      orientation: this.orientation
    });
    this[prop].drawTip(el, val);
  }

  private _createTrack (): void {
    if (!this.el) {
        return;
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
    this.track.drawTrack(
        this.el,
        this.model.calculateCoefficient(this.model.startValue),
        this.model.calculateCoefficient(this.model.endValue)
    );
  }

  private _createScale (): void {
      if (!this.el) {
          return;
      }
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