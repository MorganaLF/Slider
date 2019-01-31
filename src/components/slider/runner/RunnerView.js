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

  get parentGabarites () {
    return this.parent.sliderGabarites
  }

  _createElem (el, elclass, parent) {
    let elem = document.createElement(el);
    elem.className = elclass;
    parent.appendChild(elem);
    return elem;
  }

  drawRunner (parent, coefficient, parentGabarite) {
    let runnerClass =
        this.orientation === 'horizontal' ? '' : ' slider__runner_vertical';
    let tipClass =
        this.orientation === 'horizontal' ? '' : ' slider__tip_vertical';

    this.el = this._createElem('div', 'slider__runner' + runnerClass, parent);
    if (this.isTip) {
      this.tip = this._createElem('div', 'slider__tip' + tipClass, this.el);
    }

    this.setRunnerPosition(coefficient, parentGabarite);
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

  calculateMousePosition(coord, gabarite) {
    return (this.parent.el[gabarite] - this.el[gabarite]) / coord;

  }

  // checkMovingIntervalRunners (coordX, runner, startPoint, firstIndent, lastIndent, shift) {
  //   let firstRunnerCheckout =
  //       coordX > startPoint + lastIndent + shift
  //       && this.runner1.el === runner.el;
  //
  //   let secondRunnerCheckout =
  //       coordX < startPoint + firstIndent + shift
  //       && this.runner2.el === runner.el;
  //
  //   this.runner1.el.style.zIndex = '1';
  //   this.runner2.el.style.zIndex = '1';
  //   runner.el.style.zIndex = '99999';
  //
  //   return !(firstRunnerCheckout || secondRunnerCheckout);
  // }

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

  moveRunnerOrientation (coord, startPoint, endPoint, direction, shift, gabarite) {

    let runnerIndent = this._checkCursorPosition(coord, startPoint, endPoint, shift, gabarite);
    let ratio = this.calculateMousePosition(runnerIndent, gabarite);

    // if (this.type === 'interval' && !this.checkMovingIntervalRunners(coord, runner, startPoint, firstIndent, lastIndent, shift)) {
    //   return false;
    // }

    this.el.dispatchEvent(new CustomEvent('move', {
      bubbles: true,
      detail: ratio
    }));
  }

  moveRunner (e) {
    if (this.orientation === 'horizontal') {
      this.moveRunnerOrientation(e.pageX, this.parent._sliderLeftPoint, this.parent._sliderRightPoint, 'left', this.shiftX, 'offsetWidth');
    } else {
      this.moveRunnerOrientation(e.pageY, this.parent._sliderTopPoint, this.parent._sliderBottomPoint, 'top', this.shiftY, 'offsetHeight');
    }
  }
}