import {
  TrackViewOptions,
  TrackPoints,
  IDrawTrackSettings,
  IAnimateSingleTrackSettings,
  IAnimateIntervalTrackSettings,
} from './TrackInterfaces';

class TrackView {
  public $element?: null | JQuery;
  public $filledTrack?: null | JQuery;
  private _parentWidth: number;
  private _parentHeight: number;
  private _runnerWidth: number;
  private _runnerHeight: number;
  readonly type: string;
  readonly orientation: string;
  [key: string]: any;

  constructor (options: TrackViewOptions) {
    this.$element = null;
    this.$filledTrack = null;
    this._parentWidth = options._parentWidth;
    this._parentHeight = options._parentHeight;
    this._runnerWidth = options._runnerWidth;
    this._runnerHeight = options._runnerHeight;
    this.type = options.type;
    this.orientation = options.orientation;
  }

  public drawTrack ({
    $parent,
    startValueCoefficient,
    endValueCoefficient,
  }: IDrawTrackSettings): void {

    const trackModifierName: string = this.orientation === 'horizontal'
      ? ''
      : ' slider__track_vertical';

    this.$element = $('<div/>', {
      class: `slider__track${trackModifierName}`,
    });

    const filledTrackModifierName: string = this.orientation === 'horizontal'
      ? ''
      : ' slider__track-full_vertical';

    this.$filledTrack = $('<div/>', {
      class: `slider__track-full${filledTrackModifierName}`,
    }).appendTo(this.$element);

    this.$element.prependTo($parent);

    this.animateTrack(startValueCoefficient, 'start');

    if (this.type === 'interval') {
      this.animateTrack(endValueCoefficient, 'end');
    }
  }

  public animateTrack (coefficient: number, animatedPointName: string): void | false {
    if (!this.$element) {
      return false;
    }

    if (this.type === 'interval') {
      if (this.orientation === 'horizontal') {
        this._animateIntervalTrack({
          coefficient,
          animatedPointName,
          startPointName: 'left',
          endPointName: 'right',
          sizeProperty: 'width',
          size: this.$element.innerWidth()!,
          runnerSizeKey: '_runnerWidth',
        });
      } else {
        this._animateIntervalTrack({
          coefficient,
          animatedPointName,
          startPointName: 'top',
          endPointName: 'bottom',
          sizeProperty: 'height',
          size: this.$element.innerHeight()!,
          runnerSizeKey: '_runnerHeight',
        });
      }
    } else {
      if (this.orientation === 'horizontal') {
        this._animateSingleTrack({
          coefficient,
          sizeProperty: 'width',
          sizeKey: '_parentWidth',
          runnerSizeKey: '_runnerWidth',
        });
      } else {
        this._animateSingleTrack({
          coefficient,
          sizeProperty: 'height',
          sizeKey: '_parentHeight',
          runnerSizeKey: '_runnerHeight',
        });
      }
    }
  }

  private _getTrackPoints (pointName: string): number {
    if (this.$element) {
      const trackPoints: TrackPoints = {
        left: this.$element.offset()!.left,
        top: this.$element.offset()!.top,
        right: this.$element.offset()!.left + this.$element.innerWidth()!,
        bottom: this.$element.offset()!.top + this.$element.innerHeight()!,
      };

      return trackPoints[pointName];
    }

    return 0;
  }

  private _getFilledTrackPoints (pointName: string): number {
    if (this.$filledTrack) {
      const filledTrackPoints: TrackPoints = {
        left: this.$filledTrack.offset()!.left,
        top: this.$filledTrack.offset()!.top,
        right: this.$filledTrack.offset()!.left + this.$filledTrack.innerWidth()!,
        bottom: this.$filledTrack.offset()!.top + this.$filledTrack.innerHeight()!,
      };

      return filledTrackPoints[pointName];
    }

    return 0;
  }

  private _animateSingleTrack ({
    coefficient,
    sizeProperty,
    sizeKey,
    runnerSizeKey,
  }: IAnimateSingleTrackSettings): void {
    if (!this.$filledTrack) {
      return;
    }

    if (coefficient !== 0) {
      const filledTrackSize: number = this[sizeKey] / coefficient + this[runnerSizeKey] / 2;
      this.$filledTrack.css(sizeProperty, `${filledTrackSize}px`);
    } else {
      this.$filledTrack.css(sizeProperty, '0px');
    }
  }

  private _animateIntervalTrack ({
    coefficient,
    startPointName,
    endPointName,
    sizeProperty,
    size,
    runnerSizeKey,
    animatedPointName,
  }: IAnimateIntervalTrackSettings): void {
    if (!this.$filledTrack) {
      return;
    }

    const roundedSize: number = Math.floor(size);
    const roundedRunnerSize: number = Math.floor(this[runnerSizeKey]);
    const innerSize: number = roundedSize - roundedRunnerSize;
    const roundedEndPoint: number = Math.floor(this._getTrackPoints(endPointName));
    const roundedFilledEndPoint: number = Math.floor(this._getFilledTrackPoints(endPointName));
    let startIndent: number;
    let endIndent: number;

    if (animatedPointName === 'start') {
      startIndent = Math.floor((roundedSize - roundedRunnerSize) / coefficient);
      endIndent = roundedEndPoint - roundedFilledEndPoint - roundedRunnerSize;
      const filledTrackOffset: number = startIndent + roundedRunnerSize / 2;

      this.$filledTrack.css(startPointName, `${filledTrackOffset}px`);
    } else {
      const trackStartPoint: number = this._getTrackPoints(startPointName);
      const filledTrackStartPoint: number = this._getFilledTrackPoints(startPointName);

      startIndent = filledTrackStartPoint - trackStartPoint - roundedRunnerSize;
      endIndent = innerSize - innerSize / coefficient;
    }

    const filledTrackSize: number = innerSize - startIndent - endIndent - roundedRunnerSize / 2;
    const roundedFilledTrackSize: number = Math.floor(filledTrackSize);
    this.$filledTrack.css(sizeProperty, `${roundedFilledTrackSize}px`);
  }
}

export default TrackView;
