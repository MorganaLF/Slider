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

  drawTip (parent, val) {
    let tipClass: string =
        this.orientation === 'horizontal' ? '' : ' slider__tip_vertical';

    this.el = $('<div/>', {
      class: 'slider__tip' + tipClass,
    }).appendTo(parent);

    this.updateTip(val);
  }

  updateTip (val) {
    this.el.html(val);
  }

}