import ObservableSubject from '../../ObservableSubject/ObservableSubject';
import {
  ScaleViewOptions,
  drawMarkSettings,
  drawScaleSettings,
} from './ScaleViewInterfaces';

class ScaleView {
  public $element: null | JQuery;
  public $parent: JQuery;
  public orientation: string;
  public observableSubject = new ObservableSubject();

  constructor(options: ScaleViewOptions) {
    this.$parent = options.$parent;
    this.orientation = options.orientation;
    this.$element = null;
  }

  public drawScale({
    stepSize,
    minValue,
    maxValue,
  }: drawScaleSettings): void {
    const scaleClass: string = this._getOrientationBasedValue('', ' slider__scale_vertical');
    const valuesInterval: number = maxValue - minValue;
    const newStepSize: number = stepSize || 1;
    const reminder: number = valuesInterval % stepSize;
    const partsQuantity: number = Math.ceil(valuesInterval / newStepSize);

    this.$element = $('<ul/>', { class: `slider__scale${scaleClass}` }).appendTo(this.$parent);

    const scaleWidth: number = this._getOrientationBasedValue(
      this.$element.width(),
      this.$element.height(),
    );

    const singleValueWidth: number = scaleWidth / valuesInterval;

    for (let i: number = 0; i <= partsQuantity; i += 1) {
      const isReminderValue = reminder > 0 && i === partsQuantity;
      let markText = newStepSize * i + minValue;
      let markIndent = i === 0 ? 0 : singleValueWidth * newStepSize;

      if (isReminderValue) {
        markText = newStepSize * (i - 1) + minValue + reminder;
        markIndent = singleValueWidth * reminder;
      }

      this._drawMark({ markText, markIndent });
    }
  }

  private _getOrientationBasedValue(horizontalValue: any, verticalValue: any): any {
    return this.orientation === 'horizontal' ? horizontalValue : verticalValue;
  }

  private _drawMark({
    markText,
    markIndent,
  }: drawMarkSettings): void | false {
    if (!this.$element) {
      return false;
    }

    const indentProperty = this._getOrientationBasedValue('margin-left', 'margin-top');

    const $mark: JQuery = $('<li/>', {
      class: 'slider__scale-mark',
      style: `${indentProperty}: ${markIndent}px`,
    });

    $('<span/>', {
      class: 'slider__scale-mark-text',
      text: Math.floor(markText),
    }).appendTo($mark);

    $mark.appendTo(this.$element);
    (<any>$mark).on('click.CustomSlider', this._handleMarkClick.bind(this));
  }

  private _handleMarkClick(event: JQuery.ClickEvent): void {
    const markText = $(event.target)
      .closest('.slider__scale-mark')
      .find('.slider__scale-mark-text')
      .html();

    const value = parseInt(markText, 10);

    this.observableSubject.notifyObservers(value);
  }
}

export default ScaleView;
