//import $ from 'jquery';
import $ = require('jquery');
import {RunnerViewOptions} from "../interfaces";

export default class RunnerView {
   public el?: null | JQuery;
   public shiftX: number = 0;
   public shiftY: number = 0;
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

  public drawRunner (parent: JQuery, coefficient: number): void {
    let runnerClass: string =
        this.orientation === 'horizontal' ? '' : ' slider__runner_vertical';

    this.el = $('<div/>', {
      class: 'slider__runner' + runnerClass,
    }).appendTo(parent);

    this.setRunnerPosition(coefficient);
  }

  public setRunnerPosition (coefficient: number): void | false {
    if (!this.el) {
        return false;
    }
    let direction: string = this.orientation === 'horizontal' ? 'left' : 'top';
    let parentGabarite: number  = this.orientation === 'horizontal' ? this._parentWidth : this._parentHeight;
    let gabarite: number = this.orientation === 'horizontal' ? this.el.innerWidth()! : this.el.innerHeight()!;
    if (coefficient !== 0) {
      this.el.css(direction, (parentGabarite - gabarite) / coefficient + 'px');
    }
  }

  public setRunnerShiftX (e: JQuery.MouseDownEvent): void | false {
      if (!this.el) {
          return false;
      }
    this.shiftX = e.pageX - this.el.offset()!.left;
  }

  public setRunnerShiftY (e: JQuery.MouseDownEvent): void | false {
      if (!this.el) {
          return false;
      }
    this.shiftY = e.pageY - this.el.offset()!.top;
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
      if (!this.el) {
          return;
      }

    coord = this._checkCursorPosition(coord, startPoint, endPoint, shift, gabarite);
    let ratio: number = (endPoint - startPoint - gabarite) / coord;
    let moveEvent = $.Event( "move", { detail: { ratio: ratio } } );
    this.el.trigger(moveEvent);
  }

  public moveRunner (e: JQuery.MouseMoveEvent): void | false {
    if (!this.el) {
       return false;
    }
    if (this.orientation === 'horizontal') {
      this._dispatchMoveRunner(e.pageX, this.parentLeftPoint, this.parentRightPoint, this.shiftX, this.el.innerWidth()!);
    } else {
      this._dispatchMoveRunner(e.pageY, this.parentTopPoint, this.parentBottomPoint, this.shiftY, this.el.innerHeight()!);
    }
  }
}