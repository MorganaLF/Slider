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

  get trackFullLeftIndent () {
    return parseInt(this.trackFull.style.left);
  }

  get trackFullTopIndent () {
    return parseInt(this.trackFull.style.top);
  }

  get _trackLeftPoint () {
    return this.el.getBoundingClientRect().left;
  }

  get _trackTopPoint () {
    return this.el.getBoundingClientRect().top;
  }

  get _trackRightPoint () {
    return this.el.getBoundingClientRect().right;
  }

  get _trackBottomPoint () {
    return this.el.getBoundingClientRect().bottom;
  }

  get _trackFullLeftPoint () {
    return this.trackFull.getBoundingClientRect().left;
  }

  get _trackFullTopPoint () {
    return this.trackFull.getBoundingClientRect().top;
  }

  get _trackFullRightPoint () {
    return this.trackFull.getBoundingClientRect().right;
  }

  get _trackFullBottomPoint () {
    return this.trackFull.getBoundingClientRect().bottom;
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

  _setIntervalTrack (coefficient, indentProperty, gabariteProperty, gabarite, point, trackEndPoint, trackFullEndPoint, trackStartPoint, trackFullStartPoint) {
    let startIndent,
        endIndent;

    if (point === 'start') {
      startIndent = this.el[gabarite] / coefficient;
      endIndent = trackEndPoint - trackFullEndPoint;
      this.trackFull.style[indentProperty] = this.el[gabarite] / coefficient  + 'px';
    } else {
      startIndent = trackFullStartPoint - trackStartPoint;
      endIndent = this.el[gabarite] - this.el[gabarite] / coefficient;
    }

    this.trackFull.style[gabariteProperty] = this.el[gabarite] - startIndent - endIndent + 'px';
  }

  animateTrack (coefficient, point) {
    if (this.type === 'interval') {
      if (this.orientation === 'horizontal') {
        this._setIntervalTrack(coefficient, 'left', 'width', 'clientWidth', point, this._trackRightPoint, this._trackFullRightPoint, this._trackLeftPoint, this._trackFullLeftPoint);
      } else {
        this._setIntervalTrack(coefficient, 'top', 'height', 'clientHeight', point, this._trackBottomPoint, this._trackFullBottomPoint, this._trackTopPoint, this._trackFullTopPoint);
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