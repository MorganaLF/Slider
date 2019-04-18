import {
  TrackViewOptions,
  TrackPoints,
  animateSingleTrackSettings,
  animateIntervalTrackSettings,
} from './TrackViewInterfaces';

class TrackView {
  public $element: JQuery;
  public $parent: JQuery;
  public $filledTrack: JQuery;
  private _parentWidth: number;
  private _parentHeight: number;
  private _runnerWidth: number;
  private _runnerHeight: number;
  readonly type: string;
  readonly orientation: string;
  [key: string]: any;

  constructor(options: TrackViewOptions) {
    this.$parent = options.$parent;
    this._parentWidth = options._parentWidth;
    this._parentHeight = options._parentHeight;
    this._runnerWidth = options._runnerWidth;
    this._runnerHeight = options._runnerHeight;
    this.type = options.type;
    this.orientation = options.orientation;
    this.$element = this.drawTrack();
    this.$filledTrack = this.drawFilledTrack();
  }

  public drawTrack(): JQuery {
    const trackModifierName: string = this.orientation === 'horizontal'
      ? ''
      : ' slider__track_vertical';

    const $track = $('<div/>', {
      class: `slider__track${trackModifierName}`,
    });

    return $track.prependTo(this.$parent);
  }

  public drawFilledTrack(): JQuery {
    const filledTrackModifierName: string = this.orientation === 'horizontal'
      ? ''
      : ' slider__filled-track_vertical';

    return $('<div/>', {
      class: `slider__filled-track${filledTrackModifierName}`,
    }).appendTo(this.$element);
  }

  public animateTrack(coefficient: number, animatedPointName: string): void {
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

  private _getTrackPoints(pointName: string): number {
    const trackPoints: TrackPoints = {
      left: this.$element.offset()!.left,
      top: this.$element.offset()!.top,
      right: this.$element.offset()!.left + this.$element.innerWidth()!,
      bottom: this.$element.offset()!.top + this.$element.innerHeight()!,
    };

    return trackPoints[pointName];
  }

  private _getFilledTrackPoints(pointName: string): number {
    const filledTrackPoints: TrackPoints = {
      left: this.$filledTrack.offset()!.left,
      top: this.$filledTrack.offset()!.top,
      right: this.$filledTrack.offset()!.left + this.$filledTrack.innerWidth()!,
      bottom: this.$filledTrack.offset()!.top + this.$filledTrack.innerHeight()!,
    };

    return filledTrackPoints[pointName];
  }

  private _animateSingleTrack({
    coefficient,
    sizeProperty,
    sizeKey,
    runnerSizeKey,
  }: animateSingleTrackSettings): void {
    if (coefficient !== 0) {
      const filledTrackSize: number = this[sizeKey] / coefficient + this[runnerSizeKey] / 2;
      this.$filledTrack.css(sizeProperty, `${filledTrackSize}px`);
    } else {
      this.$filledTrack.css(sizeProperty, '0px');
    }
  }

  private _animateIntervalTrack({
    coefficient,
    startPointName,
    endPointName,
    sizeProperty,
    size,
    runnerSizeKey,
    animatedPointName,
  }: animateIntervalTrackSettings): void {
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
