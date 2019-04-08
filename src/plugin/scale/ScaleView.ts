import {
  ScaleViewOptions,
  IDrawMarkSettings,
  IDrawScaleSettings,
} from './ScaleInterfaces';

class ScaleView {
  public $element?: null | JQuery;
  readonly parentWidth: number;
  readonly parentHeight: number;
  readonly orientation: string;

  constructor (options: ScaleViewOptions) {
    this.$element = null;
    this.parentWidth = options.parentWidth;
    this.parentHeight = options.parentHeight;
    this.orientation = options.orientation;
  }

  public drawScale ({
    $parent,
    minValue,
    maxValue,
    marksQuantity,
  }: IDrawScaleSettings): void {
    const scaleClass: string = this._getOrientationBasedValue(
      '',
      ' slider__scale_vertical',
    );

    this.$element = $('<ul/>', {
      class: `slider__scale ${scaleClass}`,
    })
      .css(this._getSizePropertyName(), this._getParentSize())
      .appendTo($parent);

    const roundedMaxValue: number = Math.round(maxValue);
    const roundedMinValue: number = Math.round(minValue);
    const roundedMarksQuantity: number = Math.round(marksQuantity);
    const step: number = (roundedMaxValue - roundedMinValue) / roundedMarksQuantity;
    const roundedStep: number = Number(step.toFixed(10));

    for (
      let i: number = roundedMinValue;
      i <= roundedMaxValue;
      i = Number((roundedStep + i).toFixed(10))
    ) {
      const markIndex: number = (i - roundedMinValue) / step;

      this._drawMark({
        markIndex,
        markText: i,
        marksQuantity: roundedMarksQuantity,
        positionProperty: this._getPositionPropertyName(),
      });
    }
  }

  private _getSizePropertyName (): string {
    return this._getOrientationBasedValue('width', 'height');
  }

  private _getPositionPropertyName (): string {
    return this._getOrientationBasedValue('left', 'top');
  }

  private _getInnerSize ($element: JQuery): number {
    return this._getOrientationBasedValue($element.innerWidth(), $element.innerHeight());
  }

  private _getParentSize (): number {
    return this._getOrientationBasedValue(this.parentWidth, this.parentHeight);
  }

  private _getOrientationBasedValue (horizontalValue: any, verticalValue: any): any {
    return this.orientation === 'horizontal' ? horizontalValue : verticalValue;
  }

  private _drawMark ({
    markText,
    markIndex,
    marksQuantity,
    positionProperty,
  }: IDrawMarkSettings): void | false {
    if (!this.$element) {
      return false;
    }

    const $mark: JQuery = $('<li/>', {
      class: 'slider__scale-item',
      text: Math.round(markText),
    }).appendTo(this.$element);

    const markSize: number = this._getInnerSize($mark);
    const markIndent: number = markIndex * (this._getParentSize() / marksQuantity) - markSize / 2;

    $mark.css(positionProperty, `${markIndent}px`);
  }
}

export default ScaleView;
