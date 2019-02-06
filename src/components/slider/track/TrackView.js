export default class TrackView {
  constructor (options = {}) {
    Object.assign(this, {
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
      orientation: options.orientation,
      model: options.model
    }, options);
  }

  _createElem (el, elclass, parent) {
    let elem = document.createElement(el);
    elem.className = elclass;
    parent.prepend(elem);
    return elem;
  }

  get _trackPoints () {
    return {
      left: this.el.getBoundingClientRect().left,
      top: this.el.getBoundingClientRect().top,
      right: this.el.getBoundingClientRect().right,
      bottom: this.el.getBoundingClientRect().bottom
    }
  }

  get _trackFullPoints () {
    return {
      left: this.trackFull.getBoundingClientRect().left,
      top: this.trackFull.getBoundingClientRect().top,
      right: this.trackFull.getBoundingClientRect().right,
      bottom: this.trackFull.getBoundingClientRect().bottom
    }
  }

  drawTrack (parent, coefficient, coefficientTwo) {
    console.log(this.type)
    let trackClass =
        this.orientation === 'horizontal' ? '' : ' slider__track_vertical';
    let trackFullClass =
        this.orientation === 'horizontal' ? '' : ' slider__track-full_vertical';

    this.el = this._createElem('div', 'slider__track' + trackClass, parent);
    this.trackFull = this._createElem('div', 'slider__track-full' + trackFullClass, this.el);
    this.trackFull.style.left = '0';

    this.animateTrack(coefficient, 'start');

    if (this.type === 'interval') {
      this.animateTrack(coefficientTwo, 'end');
    }
  }

  _setSingleTrackLength (pos, property, gabarite, runnerGabarite) {
    if (pos !== 0) {
      this.trackFull.style[property] = this[gabarite] / pos + this[runnerGabarite]/2 + 'px';
    } else {
      this.trackFull.style[property] = '0px';
    }
  }

  _setIntervalTrack (coefficient, startPoint, endPoint, gabariteProperty, gabarite, point) {
    let startIndent,
        endIndent;

    if (point === 'start') {
      startIndent = this.el[gabarite] / coefficient;
      endIndent = this._trackPoints[endPoint] - this._trackFullPoints[endPoint];
      this.trackFull.style[startPoint] = this.el[gabarite] / coefficient  + 'px';
    } else {
      startIndent = this._trackFullPoints[startPoint] - this._trackPoints[startPoint];
      endIndent = this.el[gabarite] - this.el[gabarite] / coefficient;
    }

    this.trackFull.style[gabariteProperty] = this.el[gabarite] - startIndent - endIndent + 'px';
  }

  animateTrack (coefficient, point) {
    if (this.type === 'interval') {
      if (this.orientation === 'horizontal') {
        this._setIntervalTrack(coefficient, 'left', 'right', 'width', 'clientWidth', point);
      } else {
        this._setIntervalTrack(coefficient, 'top', 'bottom', 'height', 'clientHeight', point);
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