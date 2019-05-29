import '../../plugin/slider';

class DemoView {
  constructor() {
    this.init();
  }

  public init(): void {
    const observeChangeValue = () => {
      this._updateInputValues();
    };

    const $simpleSlider: JQuery = $('.js-slider_simple');

    $simpleSlider.each((elementIndex, item) => {
      $(item).customSlider({ elementIndex });
      $(item).customSlider('observeChangeValue', observeChangeValue);
    });

    const $sliderWithScale: JQuery = $('.js-slider_with-scale');

    $sliderWithScale.each((elementIndex, item) => {
      $(item).customSlider({
        elementIndex,
        withTip: false,
        withScale: true,
        stepSize: 10,
      });

      $(item).customSlider('observeChangeValue', observeChangeValue);
    });

    const $intervalSlider: JQuery = $('.js-slider_interval');

    $intervalSlider.each((elementIndex, item) => {
      $(item).customSlider({
        elementIndex,
        type: 'interval',
        startValue: 20,
        endValue: 80,
      });

      $(item).customSlider('observeChangeValue', observeChangeValue);
    });

    const $sliderWithStep: JQuery = $('.js-slider_with-step');

    $sliderWithStep.each((elementIndex, item) => {
      $(item).customSlider({
        elementIndex,
        type: 'single',
        minValue: 10,
        startValue: 20,
        stepSize: 20,
      });

      $(item).customSlider('observeChangeValue', observeChangeValue);
    });

    this._updateInputValues();
    this._addHandlers();
  }

  private _updateSlider($element: JQuery, methodName: string): void {
    $element
      .closest('.demo-page__row')
      .find('.slider')
      .customSlider(methodName, $element.val());
  }

  private _addTextInputHandlers(inputName: string, methodName: string): void {
    const $textInput: JQuery = $(`input[name="${inputName}"]`);
    $textInput.on('change.DemoView', this._handleTextInputChange.bind(this, methodName));
  }

  private _handleTextInputChange(methodName: string, event: JQuery.TriggeredEvent): void {
    const $currentInput: JQuery = $(event.target);
    this._updateSlider($currentInput, methodName);
    this._updateInputValues();
  }

  private _addCheckboxHandlers(
    checkboxName: string,
    onMethodName: string,
    offMethodName: string,
  ): void {
    const $checkbox: JQuery = $(`input[name="${checkboxName}"]`);

    $checkbox.on(
      'change.DemoView',
      this._handleCheckboxChange.bind(this, onMethodName, offMethodName),
    );
  }

  private _handleCheckboxChange(
    onMethodName: string,
    offMethodName: string,
    event: JQuery.TriggeredEvent,
  ): void {
    const $element: JQuery = $(event.target);

    if ($element.prop('checked')) {
      this._makeSliderMethod($element, onMethodName);
    } else {
      this._makeSliderMethod($element, offMethodName);
    }
  }

  private _addHandlers(): void {
    this._addTextInputHandlers('min-value', 'setMinValue');
    this._addTextInputHandlers('max-value', 'setMaxValue');
    this._addTextInputHandlers('current-value', 'setCurrentValue');
    this._addTextInputHandlers('current-max-value', 'setCurrentEndValue');
    this._addTextInputHandlers('step-size', 'setStepSize');
    this._addTextInputHandlers('scale-items', 'setScaleMarksQuantity');

    this._addCheckboxHandlers(
      'tip',
      'showTip',
      'hideTip',
    );

    this._addCheckboxHandlers(
      'scale',
      'showScale',
      'hideScale',
    );

    this._addCheckboxHandlers(
      'orientation',
      'setVerticalOrientation',
      'setHorizontalOrientation',
    );
  }

  private _makeSliderMethod($element: JQuery, methodName: string): number {
    return $element
                .closest('.demo-page__row')
                .find('.slider')
                .customSlider(methodName);
  }

  private _setInputValue(inputName: string, methodName: string, isCheckbox = false): void {
    const makeSliderMethod: any = this._makeSliderMethod;

    const $input: JQuery = $(`input[name="${inputName}"]`);

    $input.each(function() {
      const $this: JQuery = $(this);
      const currentValue: number = makeSliderMethod($this, methodName);

      if (isCheckbox) {
        $this.prop('checked', currentValue);
      } else {
        const isStepInput: boolean = inputName === 'step-size';
        const isScaleItemsInput: boolean = inputName === 'scale-items';
        const isSliderValueInput: boolean = !isStepInput && !isScaleItemsInput;

        const stepSize: number = isSliderValueInput
          ? makeSliderMethod($this, 'getStepSize') || 1
          : 0;

        if (inputName === 'min-value') {
          $this.attr({
            min: 0,
            max: makeSliderMethod($this, 'getMaxValue') - stepSize,
          });
        } else if (inputName === 'max-value') {
          $this.attr({
            min: makeSliderMethod($this, 'getMinValue') + stepSize,
          });
        } else if (inputName === 'current-value') {
          const max = makeSliderMethod($this, 'getSliderType') === 'interval'
            ? makeSliderMethod($this, 'getCurrentEndValue')
            : makeSliderMethod($this, 'getMaxValue');

          $this.attr({
            max,
            min: makeSliderMethod($this, 'getMinValue'),
          });
        } else if (inputName === 'current-max-value') {
          $this.attr({
            min: makeSliderMethod($this, 'getCurrentValue'),
            max: makeSliderMethod($this, 'getMaxValue'),
          });
        } else {
          $this.attr({
            min: 0,
          });
        }

        $this
          .val(currentValue)
          .attr({
            step: stepSize,
          });
      }
    });
  }

  private _updateInputValues(): void {
    this._setInputValue('current-value', 'getCurrentValue');
    this._setInputValue('current-max-value', 'getCurrentEndValue');
    this._setInputValue('min-value', 'getMinValue');
    this._setInputValue('max-value', 'getMaxValue');
    this._setInputValue('step-size', 'getStepSize');
    this._setInputValue('scale-items', 'getScaleMarksQuantity');
    this._setInputValue('tip', 'isTipShown', true);
    this._setInputValue('scale', 'isScaleShown', true);
  }
}

new DemoView();

export default DemoView;
