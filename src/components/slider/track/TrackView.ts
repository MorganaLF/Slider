import $ from "jquery";

export default class TrackView {
  constructor (options = {}) {
    $.extend(this, {
      el: null,
      trackFull: null,
      parentWidth: options.parentWidth,
      parentHeight: options.parentHeight,
      runnerWidth: options.runnerWidth,
      runnerHeight: options.runnerHeight,
      parentLeftPoint: options.parentLeftPoint,
      parentRightPoint: options.parentRightPoint,
      parentTopPoint: options.parentTopPoint,
      parentBottomPoint: options.parentBottomPoint,
      type: options.type,
      orientation: options.orientation
    }, options);
  }

  get _trackPoints (): object {
    return {
      left: this.el.offset().left,
      top: this.el.offset().top,
      right: this.el.offset().left + this.el.innerWidth(),
      bottom: this.el.offset().top + this.el.innerHeight()
    }
  }

  get _trackFullPoints (): object {
    return {
      left: this.trackFull.offset().left,
      top: this.trackFull.offset().top,
      right: this.trackFull.offset().left + this.trackFull.innerWidth(),
      bottom: this.trackFull.offset().top + this.trackFull.innerHeight()
    }
  }

  drawTrack (parent, coefficient: number, coefficientTwo: number): void {

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

  _setSingleTrackLength (pos: number, property: string, gabarite: string, runnerGabarite: string): void {
    if (pos !== 0) {
      this.trackFull.css(property, this[gabarite] / pos + this[runnerGabarite]/2 + 'px');
    } else {
      this.trackFull.css(property, '0px');
    }
  }

  _setIntervalTrack (coefficient: number, startPoint: string, endPoint: string, gabariteProperty: string, gabarite: string, pointName: string): void {
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

  animateTrack (coefficient: number, pointName: string): void {
    if (this.type === 'interval') {
      if (this.orientation === 'horizontal') {
        this._setIntervalTrack(coefficient, 'left', 'right', 'width', this.el.innerWidth(), pointName);
      } else {
        this._setIntervalTrack(coefficient, 'top', 'bottom', 'height', this.el.innerHeight(), pointName);
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