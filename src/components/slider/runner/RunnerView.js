import SliderView from '../view';

export default class RunnerView {
  constructor (options = {}) {
    Object.assign(this, {
      el: null,
      shiftX: 0,
      shiftY: 0,
      type: options.type,
      orientation: options.orientation,
      parentLeftPoint: options.parentLeftPoint,
      parentRightPoint: options.parentRightPoint,
      parentTopPoint: options.parentTopPoint,
      parentBottomPoint: options.parentBottomPoint
    }, options);
  }

  get parentWidth () {
    return this.parentRightPoint - this.parentLeftPoint;
  }

  get parentHeight () {
    return this.parentBottomPoint - this.parentTopPoint;
  }

  _createElem (el, elclass, parent) {
    let elem = document.createElement(el);
    elem.className = elclass;
    parent.appendChild(elem);
    return elem;
  }

  drawRunner (parent, coefficient) {
    let runnerClass =
        this.orientation === 'horizontal' ? '' : ' slider__runner_vertical';

    this.el = this._createElem('div', 'slider__runner' + runnerClass, parent);

    this.setRunnerPosition(coefficient);
  }

  setRunnerPosition (coefficient) {
    let direction = this.orientation === 'horizontal' ? 'left' : 'top';
    let parentGabarite  = this.orientation === 'horizontal' ? this.parentWidth : this.parentHeight;
    let gabarite = this.orientation === 'horizontal' ? 'clientWidth' : 'clientHeight';
    if (coefficient !== 0) {
      this.el.style[direction] = (parentGabarite - this.el[gabarite]) / coefficient + 'px';
    }
  }

  setRunnerShiftX (e) {
    this.shiftX = e.pageX - this.el.getBoundingClientRect().left;
  }

  setRunnerShiftY (e) {
    this.shiftY = e.pageY - this.el.getBoundingClientRect().top;
  }

  _checkCursorPosition (coord, startPoint, endPoint, shift, gabarite) {
    if (coord < startPoint + shift) {
      coord = 0;
    } else if (coord > endPoint - this.el[gabarite] + shift) {
      coord = endPoint - startPoint - this.el[gabarite];
    } else {
      coord = coord - startPoint - shift;
    }
    return coord;
  }

  _dispatchMoveRunner (coord, startPoint, endPoint, shift, gabarite) {
    coord = this._checkCursorPosition(coord, startPoint, endPoint, shift, gabarite);
    let ratio = (endPoint - startPoint - this.el[gabarite]) / coord;

    this.el.dispatchEvent(new CustomEvent('move', {
      bubbles: true,
      detail: ratio
    }));
  }

  moveRunner (e) {
    if (this.orientation === 'horizontal') {
      this._dispatchMoveRunner(e.pageX, this.parentLeftPoint, this.parentRightPoint, this.shiftX, 'offsetWidth');
    } else {
      this._dispatchMoveRunner(e.pageY, this.parentTopPoint, this.parentBottomPoint, this.shiftY, 'offsetHeight');
    }
  }
}