import { TipViewOptions } from './TipInterfaces';

class TipView {
  public $element: null | JQuery;
  public $parent: null | JQuery;
  readonly orientation: string;

  constructor (options : TipViewOptions) {
    this.$parent = options.$parent;
    this.$element = null;
    this.orientation = options.orientation;
    this.drawTip();
  }

  public drawTip (): void {
    if (!this.$parent) return;

    const classModifierName: string = this.orientation === 'horizontal'
      ? ''
      : ' slider__tip_vertical';

    this.$element = $('<div/>', {
      class: `slider__tip${classModifierName}`,
    }).appendTo(this.$parent);
  }

  public updateTip (currentValue: number): void {
    if (this.$element) {
      this.$element.html(`${currentValue}`);
    }
  }
}

export default TipView;
