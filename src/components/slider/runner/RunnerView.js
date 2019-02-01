import SliderView from '../view';

export default class RunnerView {
  constructor (options = {}) {
    Object.assign(this, {
      el: null,
      isGenerated: false,
      type: 'single',
      orientation: 'horizontal',
      isTip: false,
      shiftX: 0,
      shiftY: 0,
      parent: null
    }, options);
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
    let gabarite = this.orientation === 'horizontal' ? 'clientWidth' : 'clientHeight';
    if (coefficient !== 0) {
      this.el.style[direction] = (this.parent.el[gabarite] - this.el[gabarite]) / coefficient + 'px';
    }

  }

  setRunnerShiftX (e) {
    this.shiftX = e.pageX - this.el.getBoundingClientRect().left;
  }

  setRunnerShiftY (e) {
    this.shiftY = e.pageY - this.el.getBoundingClientRect().top;
  }

  _calculateMousePosition(coord, gabarite) {
    return (this.parent.el[gabarite] - this.el[gabarite]) / coord;
  }

  _checkCursorPosition (coord, startPoint, endPoint, shift, gabarite) {
    let runnerIndent;
    if (coord < startPoint + shift) {
      runnerIndent = 0;
    } else if (coord > endPoint + shift) {
      runnerIndent = this.parent.el[gabarite] - this.el[gabarite];
    } else {
      runnerIndent = coord - startPoint - shift;
    }
    return runnerIndent;
  }

  _moveRunnerOrientation (coord, startPoint, endPoint, direction, shift, gabarite) {

    let runnerIndent = this._checkCursorPosition(coord, startPoint, endPoint, shift, gabarite);
    let ratio = this._calculateMousePosition(runnerIndent, gabarite);

    this.el.dispatchEvent(new CustomEvent('move', {
      bubbles: true,
      detail: ratio
    }));
  }

  moveRunner (e) {
    if (this.orientation === 'horizontal') {
      this._moveRunnerOrientation(e.pageX, this.parent._sliderLeftPoint, this.parent._sliderRightPoint, 'left', this.shiftX, 'offsetWidth');
    } else {
      this._moveRunnerOrientation(e.pageY, this.parent._sliderTopPoint, this.parent._sliderBottomPoint, 'top', this.shiftY, 'offsetHeight');
    }
  }
}