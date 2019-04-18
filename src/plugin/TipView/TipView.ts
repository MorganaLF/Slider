import { TipViewOptions } from './TipViewInterfaces';

class TipView {
  public $element: JQuery;
  public $parent: JQuery;
  readonly orientation: string;

  constructor(options : TipViewOptions) {
    this.$parent = options.$parent;
    this.orientation = options.orientation;
    this.$element = this.drawTip();
  }

  public drawTip(): JQuery {
    const classModifierName: string = this.orientation === 'horizontal'
      ? ''
      : ' slider__tip_vertical';

    return $('<div/>', {
      class: `slider__tip${classModifierName}`,
    }).appendTo(this.$parent);
  }

  public updateTip(currentValue: number): void {
    this.$element.html(`${currentValue}`);
  }
}

export default TipView;
