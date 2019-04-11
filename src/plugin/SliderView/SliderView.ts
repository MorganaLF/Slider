import RunnerView from '../runner/RunnerView';
import { IRunnerView } from '../runner/RunnerInterfaces';
import TipView from '../tip/TipView';
import { ITipView } from '../tip/TipInterfaces';
import TrackView from '../track/TrackView';
import { ITrackView } from '../track/TrackInterfaces';
import ScaleView from '../scale/ScaleView';
import { IScaleView } from '../scale/ScaleInterfaces';
import {
  SliderViewOptions,
  IExtremePoints,
  ISize,
} from './SliderViewInterfaces';

class SliderView {
  [key: string]: any;
  public $element: null | JQuery;
  public startValueRunner?: null | IRunnerView;
  public endValueRunner?: null | IRunnerView;
  public startValueTip?: null | ITipView;
  public endValueTip?: null | ITipView;
  public track?: null | ITrackView;
  public scale?: null | IScaleView;
  public type: string;
  public withTip: boolean;
  readonly scaleMarksQuantity: number;
  readonly orientation: string;
  readonly withScale: boolean;

  constructor(options: SliderViewOptions) {
    this.$element = options.$element;
    this.startValueRunner = null;
    this.endValueRunner = null;
    this.startValueTip = null;
    this.endValueTip = null;
    this.track = null;
    this.scale = null;
    this.type = options.type || 'single';
    this.withTip = options.withTip !== false;
    this.scaleMarksQuantity = options.scaleMarksQuantity || 10;
    this.orientation = options.orientation || 'horizontal';
    this.withScale = options.withScale !== false;
  }

  public updateSlider(): void | false {
    if (!this.$element) {
      return false;
    }

    this.$element.html('');
    this._drawSlider();
  }

  private _getExtremePoints(): IExtremePoints {
    if (!this.$element) {
      return {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      };
    }

    return {
      left: this.$element.offset()!.left,
      top: this.$element.offset()!.top,
      right: this.$element.offset()!.left + this.$element.innerWidth()!,
      bottom: this.$element.offset()!.top + this.$element.innerHeight()!,
    };
  }

  private _getSliderInnerSize(): ISize {
    const isElementsDefined = this.$element
      && this.startValueRunner
      && this.startValueRunner.$element;

    if (!isElementsDefined) {
      return {
        width: 0,
        height: 0,
      };
    }

    return {
      width: this.$element!.innerWidth()! - this.startValueRunner!.$element.innerWidth()!,
      // TODO fix ts errors
      height: this.$element!.innerHeight()! - this.startValueRunner!.$element.innerHeight()!,
    };
  }

  private _getRunnerSize(): ISize {
    const isElementsDefined = this.startValueRunner && this.startValueRunner;

    if (!isElementsDefined) {
      return {
        width: 0,
        height: 0,
      };
    }

    return {
      width: this.startValueRunner!.$element.innerWidth()!, // TODO fix ts errors
      height: this.startValueRunner!.$element.innerHeight()!,
    };
  }

  private _createRunner(runnerKeyName: string): void {
    this[runnerKeyName] = new RunnerView({
      $parent: this.$element,
      orientation: this.orientation,
      parentLeftPoint: this._getExtremePoints().left,
      parentRightPoint: this._getExtremePoints().right,
      parentTopPoint: this._getExtremePoints().top,
      parentBottomPoint: this._getExtremePoints().bottom,
    });
  }

  private _createTip(tipKeyName: string, $tipParent: JQuery): void {
    this[tipKeyName] = new TipView({
      $parent: $tipParent,
      orientation: this.orientation,
    });
  }

  private _createTrack(): void {
    if (!this.$element) {
      return;
    }

    this.track = new TrackView({
      $parent: this.$element,
      type: this.type,
      orientation: this.orientation,
      _parentWidth: this._getSliderInnerSize().width,
      _parentHeight: this._getSliderInnerSize().height,
      _runnerWidth: this._getRunnerSize().width,
      _runnerHeight: this._getRunnerSize().height,
    });
  }

  private _createScale(): void {
    if (!this.$element) {
      return;
    }

    this.scale = new ScaleView({
      $parent:  this.$element,
      marksQuantity: this.scaleMarksQuantity,
      parentWidth: this._getSliderInnerSize().width,
      parentHeight: this._getSliderInnerSize().height,
      orientation: this.orientation,
    });
  }

  private _drawSlider(): void {
    if (!this.$element) {
      return;
    }

    if (this.orientation === 'vertical') {
      this.$element.addClass('slider_vertical');
    } else {
      this.$element.removeClass('slider_vertical');
    }

    this._createRunner('startValueRunner');

    if (this.withTip && this.startValueRunner) {
      this._createTip('startValueTip', this.startValueRunner.$element);
    }

    if (this.type === 'interval') {
      this._createRunner('endValueRunner');

      if (this.withTip && this.endValueRunner) {
        this._createTip('endValueTip', this.endValueRunner.$element);
      }
    }

    this._createTrack();

    if (this.withScale) {
      this._createScale();
    }
  }
}

export default SliderView;