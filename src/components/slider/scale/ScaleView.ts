import $ from "jquery";
import {ScaleViewOptions} from "../../interfaces";

export default class ScaleView {
  private  el?: null | JQuery;
  private  parentWidth: number;
  private  parentHeight: number;
  private  type: string;
  private  orientation: string;

  constructor (options: ScaleViewOptions) {
      this.el = null;
      this.parentWidth = options.parentWidth;
      this.parentHeight = options.parentHeight;
      this.type = options.type;
      this.orientation = options.orientation;

    $.extend(this, options);
  }

  private _getSizeProperty (): string {
    return this._checkOrientation('width', 'height');
  }

  private _getPositionProperty (): string {
    return this._checkOrientation('left', 'top');
  }

  private _getInnerSize (element: JQuery): number {
    return this._checkOrientation(element.innerWidth(), element.innerHeight());
  }

  private _getParentSize (): number {
    return this._checkOrientation(this.parentWidth, this.parentHeight);
  }

  private _checkOrientation (valOne: any, valTwo: any): any {
    return this.orientation === 'horizontal' ? valOne : valTwo;
  }

  private _drawScaleItem (i: number, index: number, itemsLength: number, positionProperty: string): void {
    if (!this.el) {
        return;
    }

    let scaleItem: JQuery = $('<li/>', {
      class: 'slider__scale-item',
      text: i
    }).appendTo(this.el);

    let itemGabarite: number = this._getInnerSize(scaleItem);
    let itemIndent: number = index * (this._getParentSize() / itemsLength) - itemGabarite / 2;

    scaleItem.css('position', 'absolute');
    scaleItem.css(positionProperty, itemIndent + 'px');
  }

  public drawScale (parent: JQuery, minVal: number, maxVal: number, itemsQuantity: number): void {
    let scaleClass: string = this._checkOrientation('', ' slider__scale_vertical');

    this.el = $('<ul/>', {
      class: 'slider__scale' + scaleClass,
    }).appendTo(parent);
    this.el.css(this._getSizeProperty(), this._getParentSize());

    let step: number = (maxVal - minVal) / itemsQuantity;

    for (let i = minVal; i <= maxVal; i += step) {
      let itemIndexNumber: number = (i - minVal) / step;
      this._drawScaleItem(i, itemIndexNumber, itemsQuantity, this._getPositionProperty());
     }
  }
}