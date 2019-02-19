import $ from "jquery";

type TrackViewOptions = {
    el?: null | JQuery,
    trackFull?: null | JQuery,
    parentWidth: number,
    parentHeight: number,
    runnerWidth: number,
    runnerHeight: number,
    parentLeftPoint: number,
    parentRightPoint: number,
    parentTopPoint: number,
    parentBottomPoint: number,
    type: string,
    orientation: string
}

export default class TrackView {
  public el?: null | JQuery;
  private trackFull?: null | JQuery;
  private parentWidth: number;
  private parentHeight: number;
  private runnerWidth: number;
  private runnerHeight: number;
  private parentLeftPoint: number;
  private parentRightPoint: number;
  private parentTopPoint: number;
  private parentBottomPoint: number;
  private type: string;
  private orientation: string;

  constructor (options: TrackViewOptions) {
      this.el = null;
      this.trackFull = null;
      this.parentWidth = options.parentWidth;
      this.parentHeight = options.parentHeight;
      this.runnerWidth = options.runnerWidth;
      this.runnerHeight = options.runnerHeight;
      this.parentLeftPoint = options.parentLeftPoint;
      this.parentRightPoint = options.parentRightPoint;
      this.parentTopPoint = options.parentTopPoint;
      this.parentBottomPoint = options.parentBottomPoint;
      this.type = options.type;
      this.orientation = options.orientation;

      $.extend(this, options);
  }

  private get _trackPoints (): {} {
      if (this.el) {
          return {
              left: this.el.offset()!.left,
              top: this.el.offset()!.top,
              right: this.el.offset()!.left + this.el.innerWidth()!,
              bottom: this.el.offset()!.top + this.el.innerHeight()!
          }
      }

  }

  private get _trackFullPoints (): {} {
      if (this.trackFull) {
          return {
              left: this.trackFull.offset()!.left,
              top: this.trackFull.offset()!.top,
              right: this.trackFull.offset()!.left + this.trackFull.innerWidth()!,
              bottom: this.trackFull.offset()!.top + this.trackFull.innerHeight()!
          }
      }
  }

  public drawTrack (parent: JQuery, coefficient: number, coefficientTwo: number): void {

    let trackClass: string =
        this.orientation === 'horizontal' ? '' : ' slider__track_vertical';
    let trackFullClass: string =
        this.orientation === 'horizontal' ? '' : ' slider__track-full_vertical';

    this.el = $('<div/>', {
      class: 'slider__track' + trackClass,
    }).prependTo(parent);

    this.trackFull = $('<div/>', {
      class: 'slider__track-full' + trackFullClass,
    }).appendTo(this.el);

    this.trackFull.css('left', '0');

    this.animateTrack(coefficient, 'start');

    if (this.type === 'interval') {
      this.animateTrack(coefficientTwo, 'end');
    }
  }

  private _setSingleTrackLength (pos: number, property: string, gabarite: string, runnerGabarite: string): void {
    if (!this.trackFull) {
        return;
    }
    if (pos !== 0) {
      this.trackFull.css(property, this[gabarite] / pos + this[runnerGabarite]/2 + 'px');
    } else {
      this.trackFull.css(property, '0px');
    }
  }

  private _setIntervalTrack (coefficient: number, startPoint: string, endPoint: string, gabariteProperty: string, gabarite: string, pointName: string): void {
      if (!this.trackFull) {
          return;
      }
      let startIndent: number,
        endIndent: number;

    if (pointName === 'start') {
      startIndent = gabarite / coefficient;
      endIndent = this._trackPoints[endPoint] - this._trackFullPoints[endPoint];
      this.trackFull.css(startPoint, gabarite / coefficient  + 'px');
    } else {
      startIndent = this._trackFullPoints[startPoint] - this._trackPoints[startPoint];
      endIndent = gabarite - gabarite / coefficient;
    }

    this.trackFull.css(gabariteProperty, gabarite - startIndent - endIndent + 'px');
  }

  public animateTrack (coefficient: number, pointName: string): void {
      if (!this.el) {
          return;
      }
    if (this.type === 'interval') {
      if (this.orientation === 'horizontal') {
        this._setIntervalTrack(coefficient, 'left', 'right', 'width', this.el.innerWidth()!, pointName);
      } else {
        this._setIntervalTrack(coefficient, 'top', 'bottom', 'height', this.el.innerHeight()!, pointName);
      }
    } else {
      if (this.orientation === 'horizontal') {
        this._setSingleTrackLength(coefficient, 'width', 'parentWidth', 'runnerWidth');
      } else {
        this._setSingleTrackLength(coefficient, 'height', 'parentHeight', 'runnerHeight');
      }
    }
  }
}