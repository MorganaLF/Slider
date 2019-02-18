import $ from 'jquery';

type RunnerViewOptions = {
    el: null | {},
    shiftX: number,
    shiftY: number,
    type: string,
    orientation: string,
    parentLeftPoint: number,
    parentRightPoint: number,
    parentTopPoint: number,
    parentBottomPoint: number
}

export default class RunnerView {
   private el: null | {};
   private shiftX: number;
   private shiftY: number;
   private type: string;
   private orientation: string;
   private parentLeftPoint: number;
   private parentRightPoint: number;
   private parentTopPoint: number;
   private parentBottomPoint: number;

  constructor (options: RunnerViewOptions) {
    this.el = null;
    this.shiftX = 0;
    this.shiftY = 0;
    this.type = options.type;
    this.orientation = options.orientation;
    this.parentLeftPoint = options.parentLeftPoint;
    this.parentRightPoint = options.parentRightPoint;
    this.parentTopPoint = options.parentTopPoint;
    this.parentBottomPoint = options.parentBottomPoint;

    $.extend(this, options);
  }

  private get _parentWidth (): number {
    return this.parentRightPoint - this.parentLeftPoint;
  }

  private get _parentHeight (): number {
    return this.parentBottomPoint - this.parentTopPoint;
  }

  public drawRunner (parent, coefficient: number) {
    let runnerClass: string =
        this.orientation === 'horizontal' ? '' : ' slider__runner_vertical';

    this.el = $('<div/>', {
      class: 'slider__runner' + runnerClass,
    }).appendTo(parent);

    this.setRunnerPosition(coefficient);
  }

  public setRunnerPosition (coefficient: number): void {
    let direction: string = this.orientation === 'horizontal' ? 'left' : 'top';
    let parentGabarite: number  = this.orientation === 'horizontal' ? this._parentWidth : this._parentHeight;
    let gabarite: number = this.orientation === 'horizontal' ? this.el.innerWidth() : this.el.innerHeight();
    if (coefficient !== 0) {
      this.el.css(direction, (parentGabarite - gabarite) / coefficient + 'px');
    }
  }

  public setRunnerShiftX (e): void {
    this.shiftX = e.pageX - this.el.offset().left;
  }

  public setRunnerShiftY (e): void {
    this.shiftY = e.pageY - this.el.offset().top;
  }

  private _checkCursorPosition (coord: number, startPoint: number, endPoint: number, shift: number, gabarite: number): number {
    if (coord < startPoint + shift) {
      coord = 0;
    } else if (coord > endPoint - gabarite + shift) {
      coord = endPoint - startPoint - gabarite;
    } else {
      coord = coord - startPoint - shift;
    }
    return coord;
  }

  private _dispatchMoveRunner (coord: number, startPoint: number, endPoint: number, shift: number, gabarite: number): void {
    coord = this._checkCursorPosition(coord, startPoint, endPoint, shift, gabarite);
    let ratio: number = (endPoint - startPoint - gabarite) / coord;

    this.el.trigger({
      type: 'move',
      detail: ratio
    });
  }

  public moveRunner (e): void {
    if (this.orientation === 'horizontal') {
      this._dispatchMoveRunner(e.pageX, this.parentLeftPoint, this.parentRightPoint, this.shiftX, this.el.innerWidth());
    } else {
      this._dispatchMoveRunner(e.pageY, this.parentTopPoint, this.parentBottomPoint, this.shiftY, this.el.innerHeight());
    }
  }
}