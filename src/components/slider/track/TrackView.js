export default class TrackView {
  constructor (options = {}) {
    Object.assign(this, {
      el: options.el,
      trackFull: null,
      isGenerated: false,
      type: 'single',
      orientation: 'horizontal',
      model: options.model,
      parent: options.parent
    }, options);
  }

  _createElem (el, elclass, parent) {
    let elem = document.createElement(el);
    elem.className = elclass;
    parent.prepend(elem);
    return elem;
  }

  drawTrack (parent, coefficient) {
    let trackClass =
        this.orientation === 'horizontal' ? '' : ' slider__track_vertical';
    let trackFullClass =
        this.orientation === 'horizontal' ? '' : ' slider__track-full_vertical';

    this.el = this._createElem('div', 'slider__track' + trackClass, parent);
    this.trackFull = this._createElem('div', 'slider__track-full' + trackFullClass, this.el);

    this.animateProgress(coefficient);
  }

  setSingleProgressLength (pos, property, gabarite) {
    console.log(pos);
    if (pos !== 0) {
      this.trackFull.style[property] = (this.parent.el[gabarite] - this.parent.runner1.el[gabarite]) / pos + this.parent.runner1.el[gabarite]/2 + 'px';
    } else {
      this.trackFull.style[property] = '0px';
    }
  }

  setIntervalProgress (indent, length, propGabarite, direction, gabarite) {
    this.trackFull.style.position = 'absolute';
    this.trackFull.style[propGabarite] = length + 'px';
    this.trackFull.style[direction] = indent + this.parent.runner1.el[gabarite]/2 + 'px';
  }

  _animateIntervalProgress (firstIndent, lastIndent, propGabarite, direction, gabarite) {
    let progressLength = lastIndent - firstIndent;
    this.setIntervalProgress(firstIndent, progressLength, propGabarite, direction, gabarite);
  }

  animateProgress (coefficient) {
    if (this.type === 'interval') {
      if (this.orientation === 'horizontal') {
        this._animateIntervalProgress(this.parent.firstRunnerLeftIndent, this.parent.lastRunnerLeftIndent, 'width', 'left', 'clientWidth');
      } else {
        this._animateIntervalProgress(this.parent.firstRunnerTopIndent, this.parent.lastRunnerTopIndent, 'height', 'top', 'clientHeight');
      }
    } else {
      if (this.orientation === 'horizontal') {
        this.setSingleProgressLength(coefficient, 'width', 'clientWidth');
      } else {
        this.setSingleProgressLength(coefficient, 'height', 'clientHeight');
      }
    }
  }
}