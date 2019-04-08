import { TipViewOptions } from './TipInterfaces';

class TipView {
  public $element: null | JQuery;
  readonly orientation: string;

  constructor (options : TipViewOptions) {
    this.$element = null;
    this.orientation = options.orientation;
  }

  public drawTip ($parent: JQuery, currentValue: number): void {
    const classModifierName: string = this.orientation === 'horizontal'
      ? ''
      : ' slider__tip_vertical';

    this.$element = $('<div/>', {
      class: `slider__tip${classModifierName}`,
    }).appendTo($parent);

    this.updateTip(currentValue);
  }

  public updateTip (currentValue: number): void {
    if (this.$element) {
      this.$element.html(`${String(currentValue)}`);
    }
  }
}

export default TipView;
