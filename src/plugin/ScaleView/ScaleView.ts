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
  readonly parentWidth: number;
  readonly parentHeight: number;

  constructor(options: ScaleViewOptions) {
    this.$parent = options.$parent;
    this.marksQuantity = options.marksQuantity;
    this.parentWidth = options.parentWidth;
    this.parentHeight = options.parentHeight;
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
      .css(this._getSizePropertyName(), this._getParentSize())
      .appendTo(this.$parent);

    const roundedMaxValue: number = Math.round(maxValue);
    const roundedMinValue: number = Math.round(minValue);
    const roundedMarksQuantity: number = Math.round(this.marksQuantity);
    const step: number = (roundedMaxValue - roundedMinValue) / roundedMarksQuantity;
    const roundedStep: number = Math.floor(step * 1000) / 1000;

    for (
      let i: number = roundedMinValue, markIndex: number = 0;
      i <= roundedMaxValue;
      i += roundedStep
    ) {
      this._drawMark({
        markIndex,
        markText: i,
        marksQuantity: roundedMarksQuantity,
        positionProperty: this._getPositionPropertyName(),
      });

      markIndex += 1;
    }
  }

  private _getSizePropertyName(): string {
    return this._getOrientationBasedValue('width', 'height');
  }

  private _getPositionPropertyName(): string {
    return this._getOrientationBasedValue('left', 'top');
  }

  private _getInnerSize($element: JQuery): number {
    return this._getOrientationBasedValue($element.innerWidth(), $element.innerHeight());
  }

  private _getParentSize(): number {
    return this._getOrientationBasedValue(this.parentWidth, this.parentHeight);
  }

  private _getOrientationBasedValue(horizontalValue: any, verticalValue: any): any {
    return this.orientation === 'horizontal' ? horizontalValue : verticalValue;
  }

  private _drawMark({
    markText,
    markIndex,
    marksQuantity,
    positionProperty,
  }: drawMarkSettings): void | false {
    if (!this.$element) {
      return false;
    }

    const $mark: JQuery = $('<li/>', {
      class: 'slider__scale-mark',
      text: Math.round(markText),
    }).appendTo(this.$element);

    const markSize: number = this._getInnerSize($mark);
    const markIndent: number = markIndex * (this._getParentSize() / marksQuantity) - markSize / 2;

    $mark.css(positionProperty, `${markIndent}px`);
  }
}

export default ScaleView;