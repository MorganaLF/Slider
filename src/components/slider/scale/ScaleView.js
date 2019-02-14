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

  _getSizeProperty () {
    return this._checkOrientation('width', 'height');
  }

  _getPositionProperty () {
    return this._checkOrientation('left', 'top');
  }

  _getInnerSize (element) {
    return this._checkOrientation(element.innerWidth(), element.innerHeight());
  }

  _getParentSize () {
    return this._checkOrientation(this.parentWidth, this.parentHeight);
  }

  _checkOrientation (valOne, valTwo) {
    return this.orientation === 'horizontal' ? valOne : valTwo;
  }

  _drawScaleItem (i, index, itemsLength, positionProperty) {
    let scaleItem = $('<li/>', {
      class: 'slider__scale-item',
      text: i
    }).appendTo(this.el);

    let itemGabarite = this._getInnerSize(scaleItem);
    let itemIndent = index * (this._getParentSize() / itemsLength) - itemGabarite / 2;

    scaleItem.css('position', 'absolute');
    scaleItem.css(positionProperty, itemIndent + 'px');
  }

  drawScale (parent, minVal, maxVal, itemsQuantity) {
    let scaleClass = this._checkOrientation('', ' slider__scale_vertical');

    this.el = $('<ul/>', {
      class: 'slider__scale' + scaleClass,
    }).appendTo(parent);
    this.el.css(this._getSizeProperty(), this._getParentSize());

    let step = (maxVal - minVal) / itemsQuantity;

    for (let i = minVal; i <= maxVal; i += step) {
      let itemIndexNumber = (i - minVal) / step;
      this._drawScaleItem(i, itemIndexNumber, itemsQuantity, this._getPositionProperty());
     }
  }
}