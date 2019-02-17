import $ from 'jquery';

export default class RunnerView {
  constructor (options = {}) {
    $.extend(this, {
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

  get _parentWidth () {
    return this.parentRightPoint - this.parentLeftPoint;
  }

  get _parentHeight () {
    return this.parentBottomPoint - this.parentTopPoint;
  }

  drawRunner (parent, coefficient) {
    let runnerClass: string =
        this.orientation === 'horizontal' ? '' : ' slider__runner_vertical';

    this.el = $('<div/>', {
      class: 'slider__runner' + runnerClass,
    }).appendTo(parent);

    this.setRunnerPosition(coefficient);
  }

  setRunnerPosition (coefficient) {
    let direction: string = this.orientation === 'horizontal' ? 'left' : 'top';
    let parentGabarite: number  = this.orientation === 'horizontal' ? this._parentWidth : this._parentHeight;
    let gabarite: number = this.orientation === 'horizontal' ? this.el.innerWidth() : this.el.innerHeight();
    if (coefficient !== 0) {
      this.el.css(direction, (parentGabarite - gabarite) / coefficient + 'px');
    }
  }

  setRunnerShiftX (e) {
    this.shiftX = e.pageX - this.el.offset().left;
  }

  setRunnerShiftY (e) {
    this.shiftY = e.pageY - this.el.offset().top;
  }

  _checkCursorPosition (coord, startPoint, endPoint, shift, gabarite) {
    if (coord < startPoint + shift) {
      coord = 0;
    } else if (coord > endPoint - gabarite + shift) {
      coord = endPoint - startPoint - gabarite;
    } else {
      coord = coord - startPoint - shift;
    }
    return coord;
  }

  _dispatchMoveRunner (coord, startPoint, endPoint, shift, gabarite) {
    coord = this._checkCursorPosition(coord, startPoint, endPoint, shift, gabarite);
    let ratio = (endPoint - startPoint - gabarite) / coord;

    this.el.trigger({
      type: 'move',
      detail: ratio
    });
  }

  moveRunner (e) {
    if (this.orientation === 'horizontal') {
      this._dispatchMoveRunner(e.pageX, this.parentLeftPoint, this.parentRightPoint, this.shiftX, this.el.innerWidth());
    } else {
      this._dispatchMoveRunner(e.pageY, this.parentTopPoint, this.parentBottomPoint, this.shiftY, this.el.innerHeight());
    }
  }
}