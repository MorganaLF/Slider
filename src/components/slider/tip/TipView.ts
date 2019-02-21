//import $ from "jquery";
import $ = require('jquery');
import {TipViewOptions} from "../../interfaces";

export default class TipView {
  private el: null | JQuery;
  private  orientation: string;

  constructor (options : TipViewOptions) {
    this.el = null;
    this.orientation = options.orientation;
    $.extend(this, options);
  }

  public drawTip (parent: JQuery, val: number): void {
    let tipClass: string =
        this.orientation === 'horizontal' ? '' : ' slider__tip_vertical';

    this.el = $('<div/>', {
      class: 'slider__tip' + tipClass,
    }).appendTo(parent);

    this.updateTip(val);
  }

  public updateTip (val: number): void {
    if (this.el) {
        this.el.html(val+'');
    }
  }

}