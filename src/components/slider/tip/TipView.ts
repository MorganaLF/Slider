import $ from "jquery";

export default class TipView {
  constructor (options = {}) {
    $.extend(this, {
      el: null,
      type: options.type,
      orientation: options.orientation,
      parent: null
    }, options);
  }

  drawTip (parent, val: number) {
    let tipClass: string =
        this.orientation === 'horizontal' ? '' : ' slider__tip_vertical';

    this.el = $('<div/>', {
      class: 'slider__tip' + tipClass,
    }).appendTo(parent);

    this.updateTip(val);
  }

  updateTip (val: number) {
    this.el.html(val);
  }

}