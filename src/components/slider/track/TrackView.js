export default class TrackView {
  constructor (options = {}) {
    Object.assign(this, {
      el: null,
      trackFull: null,
      parentWidth: options.parentWidth,
      parentHeight: options.parentHeight,
      runnerWidth: options.runnerWidth,
      runnerHeight: options.runnerHeight,
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

  drawTrack (parent, coefficient, coefficientTwo) {
    let trackClass =
        this.orientation === 'horizontal' ? '' : ' slider__track_vertical';
    let trackFullClass =
        this.orientation === 'horizontal' ? '' : ' slider__track-full_vertical';

    this.el = this._createElem('div', 'slider__track' + trackClass, parent);
    this.trackFull = this._createElem('div', 'slider__track-full' + trackFullClass, this.el);

    this.animateTrack(coefficient, 'paddingLeft', 'paddingTop');
    this.animateTrack(coefficientTwo, 'paddingRight', 'paddingBottom');
  }

  _setSingleTrackLength (pos, property, gabarite, runnerGabarite) {
    if (pos !== 0) {
      this.trackFull.style[property] = this[gabarite] / pos + this[runnerGabarite]/2 + 'px';
    } else {
      this.trackFull.style[property] = '0px';
    }
  }

  _setIntervalTrack (coefficient, cssProperty, gabarite) {

    if (cssProperty === 'paddingLeft' || cssProperty === 'paddingTop') {
      this.el.style[cssProperty] = this[gabarite] / coefficient  + 'px';
    } else {
      this.el.style[cssProperty] = this[gabarite] - (this[gabarite] / coefficient) + 'px';
    }
  }

  animateTrack (coefficient, horizontalProperty, verticalProperty) {
    if (this.type === 'interval') {
      if (this.orientation === 'horizontal') {
        this._setIntervalTrack(coefficient, horizontalProperty, 'parentWidth');
      } else {
        this._setIntervalTrack(coefficient, verticalProperty, 'parentHeight');
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