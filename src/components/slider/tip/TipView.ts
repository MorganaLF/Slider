import $ from "jquery";

type TipViewOptions = {
    el?: null | JQuery,
    type: string,
    orientation: string
}

export default class TipView {
  private el: null | JQuery;
  private  type: string;
  private  orientation: string;

  constructor (options : TipViewOptions) {
    this.el = null;
    this.type = options.type;
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