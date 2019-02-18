import $ from "jquery";

export default class ScaleView {
  constructor (options = {}) {
    $.extend(this, {
      el: null,
      parentWidth: options.parentWidth,
      parentHeight: options.parentHeight,
      type: options.type,
      orientation: options.orientation
    }, options);
  }

  _getSizeProperty (): string {
    return this._checkOrientation('width', 'height');
  }

  _getPositionProperty (): string {
    return this._checkOrientation('left', 'top');
  }

  _getInnerSize (element): string {
    return this._checkOrientation(element.innerWidth(), element.innerHeight());
  }

  _getParentSize (): string {
    return this._checkOrientation(this.parentWidth, this.parentHeight);
  }

  _checkOrientation (valOne: string, valTwo: string): string {
    return this.orientation === 'horizontal' ? valOne : valTwo;
  }

  _drawScaleItem (i: number, index: number, itemsLength: number, positionProperty: string): void {
    let scaleItem: object = $('<li/>', {
      class: 'slider__scale-item',
      text: i
    }).appendTo(this.el);

    let itemGabarite: number = this._getInnerSize(scaleItem); /* ПРОВЕРИТЬ */
    let itemIndent: number = index * (this._getParentSize() / itemsLength) - itemGabarite / 2;

    scaleItem.css('position', 'absolute');
    scaleItem.css(positionProperty, itemIndent + 'px');
  }

  drawScale (parent, minVal: number, maxVal: number, itemsQuantity: number): void {
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