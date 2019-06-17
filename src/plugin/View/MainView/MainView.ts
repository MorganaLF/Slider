import ObservableSubject from '../../ObservableSubject/ObservableSubject';
import RunnerView from '../RunnerView/RunnerView';
import { IRunnerView } from '../RunnerView/RunnerViewInterfaces';
import TipView from '../TipView/TipView';
import { ITipView } from '../TipView/TipViewInterfaces';
import TrackView from '../TrackView/TrackView';
import { ITrackView } from '../TrackView/TrackViewInterfaces';
import ScaleView from '../ScaleView/ScaleView';
import {
  IScaleView,
  drawScaleSettings,
} from '../ScaleView/ScaleViewInterfaces';
import {
  updateSettings,
  MainViewOptions,
  IExtremePoints,
  ISize,
} from './MainViewInterfaces';
import Model from '../../Model/Model';

class MainView {
  [key: string]: any;
  public observableSubject = new ObservableSubject();
  public startBoundObservableSubject = new ObservableSubject();
  public endBoundObservableSubject = new ObservableSubject();
  public randomValueObservableSubject = new ObservableSubject();
  public elementIndex: number;
  public $element: JQuery;
  public startValueRunner?: null | IRunnerView = null;
  public endValueRunner?: null | IRunnerView = null;
  public startValueTip?: null | ITipView = null;
  public endValueTip?: null | ITipView = null;
  public track?: null | ITrackView = null;
  public scale?: null | IScaleView = null;
  readonly model: Model;
  readonly startRunnerMovePublisher = this.dispatchStartRunnerMove.bind(this);
  readonly endRunnerMovePublisher = this.dispatchEndRunnerMove.bind(this);
  readonly clickOnScalePublisher = this.dispatchClickOnScale.bind(this);

  constructor(options: MainViewOptions) {
    this.model = options.model;
    this.elementIndex = options.elementIndex;
    this.$element = options.$element;
    this.reinitialize();
  }

  public reinitialize(): void {
    this.removeObservers();
    this.$element.html('');
    this.drawSlider();
    this.addHandlers();
  }

  public update({
    isEndValueChanging,
    coefficient,
    value,
    isRangeBoundAtTheEndOfInterval,
    isRangeBoundAtTheStartOfInterval,
  }: updateSettings): void {
    const runner = isEndValueChanging ? this.endValueRunner : this.startValueRunner;
    const tip = isEndValueChanging ? this.endValueTip : this.startValueTip;

    if (runner) runner.setRunnerPosition(coefficient);

    const isRunnersExist = this.startValueRunner && this.endValueRunner;

    if (isRangeBoundAtTheEndOfInterval && isRunnersExist) {
      this.startValueRunner!.placeRunnerOnHigherLayer();
      this.endValueRunner!.placeRunnerOnLowerLayer();
    } else if (isRangeBoundAtTheStartOfInterval && isRunnersExist) {
      this.endValueRunner!.placeRunnerOnHigherLayer();
      this.startValueRunner!.placeRunnerOnLowerLayer();
    } else if (this.model.getType() === 'interval' && isRunnersExist) {
      this.startValueRunner!.placeRunnerOnLowerLayer();
      this.endValueRunner!.placeRunnerOnLowerLayer();
      runner!.placeRunnerOnHigherLayer();
    }

    if (this.model.isTipShown() && tip) {
      tip.updateTip(value);
    }

    if (this.track) {
      this.track.animateTrack(coefficient, isEndValueChanging);
    }
  }

  public drawScale(options: drawScaleSettings): void {
    if (this.scale) this.scale.drawScale(options);
  }

  private getExtremePoints(): IExtremePoints {
    return {
      left: this.$element.offset()!.left,
      top: this.$element.offset()!.top,
      right: this.$element.offset()!.left + this.$element.innerWidth()!,
      bottom: this.$element.offset()!.top + this.$element.innerHeight()!,
    };
  }

  private getSliderInnerSize(): ISize {
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

  private getRunnerSize(): ISize {
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

  private createRunner(runnerKeyName: string): void {
    this[runnerKeyName] = new RunnerView({
      elementIndex: this.elementIndex,
      $parent: this.$element,
      orientation: this.model.getOrientation(),
      parentLeftPoint: this.getExtremePoints().left,
      parentRightPoint: this.getExtremePoints().right,
      parentTopPoint: this.getExtremePoints().top,
      parentBottomPoint: this.getExtremePoints().bottom,
    });
  }

  private createTip(tipKeyName: string, $tipParent: JQuery): void {
    this[tipKeyName] = new TipView({
      $parent: $tipParent,
      orientation: this.model.getOrientation(),
    });
  }

  private createTrack(): void {
    this.track = new TrackView({
      $parent: this.$element,
      type: this.model.getType(),
      orientation: this.model.getOrientation(),
      parentWidth: this.getSliderInnerSize().width,
      parentHeight: this.getSliderInnerSize().height,
      runnerWidth: this.getRunnerSize().width,
      runnerHeight: this.getRunnerSize().height,
    });
  }

  private createScale(): void {
    this.scale = new ScaleView({
      $parent:  this.$element,
      orientation: this.model.getOrientation(),
    });
  }

  private drawSlider(): void {
    if (this.model.getOrientation() === 'vertical') {
      this.$element.addClass('slider_vertical');
    } else {
      this.$element.removeClass('slider_vertical');
    }

    this.createRunner('startValueRunner');

    if (this.model.isTipShown() && this.startValueRunner) {
      this.createTip('startValueTip', this.startValueRunner.$element);
    }

    if (this.model.getType() === 'interval') {
      this.createRunner('endValueRunner');

      if (this.model.isTipShown() && this.endValueRunner) {
        this.createTip('endValueTip', this.endValueRunner.$element);
      }
    }

    this.createTrack();

    if (this.model.isScaleShown()) {
      this.createScale();
    }
  }

  private dispatchStartRunnerMove(ratio: number) {
    this.startRunnerObservableSubject.notifyObservers(ratio);
  }

  private dispatchEndRunnerMove(ratio: number) {
    this.endRunnerObservableSubject.notifyObservers(ratio);
  }

  private dispatchClickOnScale(value: number) {
    this.scaleObservableSubject.notifyObservers(value);
  }

  private handleWindowResize(): void {
    this.reinitialize();
    this.observableSubject.notifyObservers();
  }

  private addHandlers(): void {
    const $window = $(window);
    const handleWindowResize = this.handleWindowResize.bind(this);

    $window.on(`resize.CustomSlider${this.elementIndex}`, handleWindowResize);

    if (this.startValueRunner) {
      this.startValueRunner.observableSubject.addObserver(this.startRunnerMovePublisher);
    }

    if (this.endValueRunner) {
      this.endValueRunner.observableSubject.addObserver(this.endRunnerMovePublisher);
    }

    if (this.scale) {
      this.scale.observableSubject.addObserver(this.clickOnScalePublisher);
    }
  }

  private removeObservers(): void {
    if (this.startValueRunner) {
      this.startValueRunner.observableSubject.removeObserver(this.startRunnerMovePublisher);
    }

    if (this.endValueRunner) {
      this.endValueRunner.observableSubject.removeObserver(this.endRunnerMovePublisher);
    }

    if (this.scale) {
      this.scale.observableSubject.removeObserver(this.clickOnScalePublisher);
    }
  }
}

export default MainView;
