import {
  ScaleViewOptions,
  drawMarkSettings,
  drawScaleSettings,
} from './ScaleViewInterfaces';

class ScaleView {
  public $element: null | JQuery;
  public $parent: JQuery;
  public marksQuantity: number;
  public orientation: string;

  constructor(options: ScaleViewOptions) {
    this.$parent = options.$parent;
    this.marksQuantity = options.marksQuantity;
    this.orientation = options.orientation;
    this.$element = null;
  }

  public drawScale({
    minValue,
    maxValue,
  }: drawScaleSettings): void {
    const scaleClass: string = this._getOrientationBasedValue(
      '',
      ' slider__scale_vertical',
    );

    this.$element = $('<ul/>', {
      class: `slider__scale${scaleClass}`,
    })
      .appendTo(this.$parent);

    const marksQuantity = this.marksQuantity >= 1 ? this.marksQuantity : 1;
    const roundedMaxValue: number = Math.round(maxValue);
    const roundedMinValue: number = Math.round(minValue);
    const valuesInterval: number = roundedMaxValue - roundedMinValue;
    const roundedMarksQuantity: number = Math.round(marksQuantity);
    const step = valuesInterval / roundedMarksQuantity;

    for (
      let i: number = 0;
      i <= roundedMarksQuantity;
      i += 1
    ) {
      const markText = step * i + roundedMinValue;
      this._drawMark({ markText });
    }
  }

  private _getOrientationBasedValue(horizontalValue: any, verticalValue: any): any {
    return this.orientation === 'horizontal' ? horizontalValue : verticalValue;
  }

  private _drawMark({
    markText,
  }: drawMarkSettings): void | false {
    if (!this.$element) {
      return false;
    }

    const $mark: JQuery = $('<li/>', {
      class: 'slider__scale-mark',
    });

    $('<span/>', {
      class: 'slider__scale-mark-text',
      text: Math.floor(markText),
    }).appendTo($mark);

    $mark.appendTo(this.$element);
  }
}

export default ScaleView;
