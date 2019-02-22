//import $ from 'jquery';
import $ = require('jquery');
import RunnerView from './runner/RunnerView';
import TipView from './tip/TipView';
import TrackView from './track/TrackView';
import ScaleView from './scale/ScaleView';
import {ISliderModel} from '../interfaces';
import {IRunnerView} from '../interfaces';
import {ITrackView} from '../interfaces';
import {IScaleView} from '../interfaces';
import {ITipView} from '../interfaces';
import {SliderViewOptions} from '../interfaces';

export default class SliderView {
  [key: string]: any;
  public el: null | JQuery;
  public runner1?: null | IRunnerView;
  public runner2?: null | IRunnerView;
  public tip1?: null | ITipView;
  public tip2?: null | ITipView;
  public track?: null | ITrackView;
  private trackItemsQuantity: number;
  private progressFull?: null | JQuery;
  public scale?: null | IScaleView;
  public type: string;
  private orientation: string;
  public isTip: boolean;
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
    if (!this.el) {
        return;
    }

    if (this.orientation === 'vertical') {
        this.el.addClass('slider_vertical')
    } else {
        this.el.removeClass('slider_vertical')
    }

    this._createRunner('runner1', this.model.startValue);

    if (this.isTip && this.runner1) {
      this._createTip('tip1', this.runner1.el, this.model.startValue);
    }

    if (this.type === 'interval') {
      this._createRunner('runner2', this.model.endValue);

      if (this.isTip && this.runner2) {
        this._createTip('tip2', this.runner2.el, this.model.endValue);
      }
    }
      this._createTrack();
    if (this.isScale) {
      this._createScale();
    }
  }

}