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

  get _parentWidth (): number {
    return this.parentRightPoint - this.parentLeftPoint;
  }

  get _parentHeight (): number {
    return this.parentBottomPoint - this.parentTopPoint;
  }

  drawRunner (parent, coefficient: number) {
    let runnerClass: string =
        this.orientation === 'horizontal' ? '' : ' slider__runner_vertical';

    this.el = $('<div/>', {
      class: 'slider__runner' + runnerClass,
    }).appendTo(parent);

    this.setRunnerPosition(coefficient);
  }

  setRunnerPosition (coefficient: number): void {
    let direction: string = this.orientation === 'horizontal' ? 'left' : 'top';
    let parentGabarite: number  = this.orientation === 'horizontal' ? this._parentWidth : this._parentHeight;
    let gabarite: number = this.orientation === 'horizontal' ? this.el.innerWidth() : this.el.innerHeight();
    if (coefficient !== 0) {
      this.el.css(direction, (parentGabarite - gabarite) / coefficient + 'px');
    }
  }

  setRunnerShiftX (e): void {
    this.shiftX = e.pageX - this.el.offset().left;
  }

  setRunnerShiftY (e): void {
    this.shiftY = e.pageY - this.el.offset().top;
  }

  _checkCursorPosition (coord: number, startPoint: number, endPoint: number, shift: number, gabarite: number): number {
    if (coord < startPoint + shift) {
      coord = 0;
    } else if (coord > endPoint - gabarite + shift) {
      coord = endPoint - startPoint - gabarite;
    } else {
      coord = coord - startPoint - shift;
    }
    return coord;
  }

  _dispatchMoveRunner (coord: number, startPoint: number, endPoint: number, shift: number, gabarite: number): void {
    coord = this._checkCursorPosition(coord, startPoint, endPoint, shift, gabarite);
    let ratio: number = (endPoint - startPoint - gabarite) / coord;

    this.el.trigger({
      type: 'move',
      detail: ratio
    });
  }

  moveRunner (e): void {
    if (this.orientation === 'horizontal') {
      this._dispatchMoveRunner(e.pageX, this.parentLeftPoint, this.parentRightPoint, this.shiftX, this.el.innerWidth());
    } else {
      this._dispatchMoveRunner(e.pageY, this.parentTopPoint, this.parentBottomPoint, this.shiftY, this.el.innerHeight());
    }
  }
}