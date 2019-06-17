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
  private parentWidth: number;
  private parentHeight: number;
  private runnerWidth: number;
  private runnerHeight: number;
  readonly type: string;
  readonly orientation: string;
  [key: string]: any;

  constructor(options: TrackViewOptions) {
    this.$parent = options.$parent;
    this.parentWidth = options.parentWidth;
    this.parentHeight = options.parentHeight;
    this.runnerWidth = options.runnerWidth;
    this.runnerHeight = options.runnerHeight;
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

  public animateTrack(coefficient: number, isEndValueChanging: boolean): void {
    if (this.type === 'interval') {
      if (this.orientation === 'horizontal') {
        this.animateIntervalTrack({
          coefficient,
          isEndValueChanging,
          startPointName: 'left',
          endPointName: 'right',
          sizeProperty: 'width',
          size: this.$element.innerWidth()!,
          runnerSizeKey: 'runnerWidth',
        });
      } else {
        this.animateIntervalTrack({
          coefficient,
          isEndValueChanging,
          startPointName: 'top',
          endPointName: 'bottom',
          sizeProperty: 'height',
          size: this.$element.innerHeight()!,
          runnerSizeKey: 'runnerHeight',
        });
      }
    } else {
      if (this.orientation === 'horizontal') {
        this.animateSingleTrack({
          coefficient,
          sizeProperty: 'width',
          sizeKey: 'parentWidth',
          runnerSizeKey: 'runnerWidth',
        });
      } else {
        this.animateSingleTrack({
          coefficient,
          sizeProperty: 'height',
          sizeKey: 'parentHeight',
          runnerSizeKey: 'runnerHeight',
        });
      }
    }
  }

  private getTrackPoints(pointName: string): number {
    const trackPoints: TrackPoints = {
      left: this.$element.offset()!.left,
      top: this.$element.offset()!.top,
      right: this.$element.offset()!.left + this.$element.innerWidth()!,
      bottom: this.$element.offset()!.top + this.$element.innerHeight()!,
    };

    return trackPoints[pointName];
  }

  private getFilledTrackPoints(pointName: string): number {
    const filledTrackPoints: TrackPoints = {
      left: this.$filledTrack.offset()!.left,
      top: this.$filledTrack.offset()!.top,
      right: this.$filledTrack.offset()!.left + this.$filledTrack.innerWidth()!,
      bottom: this.$filledTrack.offset()!.top + this.$filledTrack.innerHeight()!,
    };

    return filledTrackPoints[pointName];
  }

  private animateSingleTrack({
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

  private animateIntervalTrack({
    coefficient,
    startPointName,
    endPointName,
    sizeProperty,
    size,
    runnerSizeKey,
    isEndValueChanging,
  }: animateIntervalTrackSettings): void {
    const runnerSize: number = this[runnerSizeKey];
    const innerSize: number = size - runnerSize;
    const endPoint: number = this.getTrackPoints(endPointName);
    const filledEndPoint: number = this.getFilledTrackPoints(endPointName);
    let startIndent: number;
    let endIndent: number;

    if (isEndValueChanging) {
      const trackStartPoint: number = this.getTrackPoints(startPointName);
      const filledTrackStartPoint: number = this.getFilledTrackPoints(startPointName);

      startIndent = filledTrackStartPoint - trackStartPoint - runnerSize;
      endIndent = innerSize - innerSize / coefficient;
    } else {
      startIndent = (size - runnerSize) / coefficient;
      endIndent = endPoint - filledEndPoint - runnerSize;
      const filledTrackOffset: number = startIndent + runnerSize / 2;

      this.$filledTrack.css(startPointName, `${filledTrackOffset}px`);
    }

    const filledTrackSize: number = innerSize - startIndent - endIndent - runnerSize / 2;
    this.$filledTrack.css(sizeProperty, `${filledTrackSize}px`);
  }
}

export default TrackView;
