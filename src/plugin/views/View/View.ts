import RunnerView from '../RunnerView/RunnerView';
import { IRunnerView } from '../RunnerView/RunnerViewInterfaces';
import TipView from '../TipView/TipView';
import { ITipView } from '../TipView/TipViewInterfaces';
import TrackView from '../TrackView/TrackView';
import { ITrackView } from '../TrackView/TrackViewInterfaces';
import ScaleView from '../ScaleView/ScaleView';
import { IScaleView } from '../ScaleView/ScaleViewInterfaces';
import {
  ViewOptions,
  IExtremePoints,
  ISize,
} from './ViewInterfaces';

class View {
  [key: string]: any;
  public $element: JQuery;
  public startValueRunner?: null | IRunnerView;
  public endValueRunner?: null | IRunnerView;
  public startValueTip?: null | ITipView;
  public endValueTip?: null | ITipView;
  public track?: null | ITrackView;
  public scale?: null | IScaleView;
  public type: string;
  public withTip: boolean;
  public withScale: boolean;
  public orientation: string;

  constructor(options: ViewOptions) {
    this.$element = options.$element;
    this.startValueRunner = null;
    this.endValueRunner = null;
    this.startValueTip = null;
    this.endValueTip = null;
    this.track = null;
    this.scale = null;
    this.type = options.type || 'single';
    this.withTip = options.withTip !== false;
    this.withScale = options.withScale !== false;
    this.orientation = options.orientation || 'horizontal';
  }

  public updateSlider(): void {
    this.$element.html('');
    this._drawSlider();
  }

  private _getExtremePoints(): IExtremePoints {
    return {
      left: this.$element.offset()!.left,
      top: this.$element.offset()!.top,
      right: this.$element.offset()!.left + this.$element.innerWidth()!,
      bottom: this.$element.offset()!.top + this.$element.innerHeight()!,
    };
  }

  private _getSliderInnerSize(): ISize {
    const isElementsDefined = this.startValueRunner && this.startValueRunner.$element;

    if (!isElementsDefined) {
      return {
        width: 0,
        height: 0,
      };
    }

    return {
      width: this.$element.innerWidth()! - this.startValueRunner!.$element.innerWidth()!,
      height: this.$element.innerHeight()! - this.startValueRunner!.$element.innerHeight()!,
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
      width: this.startValueRunner!.$element.innerWidth()!,
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
    this.scale = new ScaleView({
      $parent:  this.$element,
      orientation: this.orientation,
    });
  }

  private _drawSlider(): void {
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

export default View;
