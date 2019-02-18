import $ from "jquery";

type TipViewOptions = {
    el: null | {},
    type: string,
    orientation: string,
    parent: null | {}
}

export default class TipView {
  private el: null | {};
  private  type: string;
  private  orientation: string;
  private  parent: null | {};

  constructor (options : TipViewOptions) {
    this.el = null;
    this.type = options.type;
    this.orientation = options.orientation;
    this.parent = null;
    $.extend(this, options);
  }

  public drawTip (parent: {}, val: number): void {
    let tipClass: string =
        this.orientation === 'horizontal' ? '' : ' slider__tip_vertical';

    this.el = $('<div/>', {
      class: 'slider__tip' + tipClass,
    }).appendTo(parent);

    this.updateTip(val);
  }

  public updateTip (val: number): void {
    this.el.html(val);
  }

}