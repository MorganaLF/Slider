import '../../plugin/slider';

class DemoView {
  readonly events: { [key: string]: string };

  constructor() {
    this.events = {};
    this.init();
  }

  public init(): void {
    const changeValueListener = () => {
      this.updateInputValues();
    };

    const $simpleSlider: JQuery = $('.js-slider_simple');

    $simpleSlider.each((index, item) => {
      $(item)
        .customSlider()
        .customSlider('addChangeValueEvent', changeValueListener);
    });

    const $sliderWithScale: JQuery = $('.js-slider_with-scale');

    $sliderWithScale.each((index, item) => {
      $(item)
        .customSlider({
          withTip: false,
          withScale: true,
          stepSize: 10,
        })
        .customSlider('addChangeValueEvent', changeValueListener);
    });

    const $intervalSlider: JQuery = $('.js-slider_interval');

    $intervalSlider.each((index, item) => {
      $(item)
        .customSlider({
          type: 'interval',
          startValue: 20,
          endValue: 80,
        })
        .customSlider('addChangeValueEvent', changeValueListener);
    });

    const $sliderWithStep: JQuery = $('.js-slider_with-step');

    $sliderWithStep.each((index, item) => {
      $(item)
        .customSlider({
          type: 'single',
          minValue: 10,
          startValue: 20,
          stepSize: 20,
        })
        .customSlider('addChangeValueEvent', changeValueListener);
    });

    this.updateInputValues();
    this.addHandlers();
  }

  private createUniqueEventName(type: string): string {
    return `${type}.${(Math.random() * 1000)}`;
  }

  private updateSlider($element: JQuery, methodName: string): void {
    $element
      .closest('.demo-page__row')
      .find('.slider')
      .customSlider(methodName, $element.val());
  }

  private addTextInputHandlers(inputName: string, methodName: string): void {
    const $textInput: JQuery = $(`input[name="${inputName}"]`);
    const textInputChange: string = this.createUniqueEventName('change');
    this.events['textInputChange'] = textInputChange;

    $textInput.on(textInputChange, this.handleTextInputChange.bind(this, methodName));
  }

  private handleTextInputChange(methodName: string, event: JQuery.TriggeredEvent): void {
    const $currentInput: JQuery = $(event.target);
    this.updateSlider($currentInput, methodName);
    this.updateInputValues();
  }

  private addCheckboxHandlers(
    checkboxName: string,
    onMethodName: string,
    offMethodName: string,
  ): void {
    const $checkbox: JQuery = $(`input[name="${checkboxName}"]`);
    const checkboxChange: string = this.createUniqueEventName('change');
    this.events['checkboxChange'] = checkboxChange;

    $checkbox.on(checkboxChange, this.handleCheckboxChange.bind(this, onMethodName, offMethodName));
  }

  private handleCheckboxChange(
    onMethodName: string,
    offMethodName: string,
    event: JQuery.TriggeredEvent,
  ): void {
    const $element: JQuery = $(event.target);

    if ($element.prop('checked')) {
      this.makeSliderMethod($element, onMethodName);
    } else {
      this.makeSliderMethod($element, offMethodName);
    }
  }

  private addHandlers(): void {
    this.addTextInputHandlers('min-value', 'setMinValue');
    this.addTextInputHandlers('max-value', 'setMaxValue');
    this.addTextInputHandlers('current-value', 'setCurrentValue');
    this.addTextInputHandlers('current-max-value', 'setCurrentEndValue');
    this.addTextInputHandlers('step-size', 'setStepSize');
    this.addTextInputHandlers('scale-items', 'setScaleMarksQuantity');

    this.addCheckboxHandlers(
      'tip',
      'showTip',
      'hideTip',
    );

    this.addCheckboxHandlers(
      'scale',
      'showScale',
      'hideScale',
    );

    this.addCheckboxHandlers(
      'orientation',
      'setVerticalOrientation',
      'setHorizontalOrientation',
    );
  }

  private makeSliderMethod($element: JQuery, methodName: string): number {
    return $element
                .closest('.demo-page__row')
                .find('.slider')
                .customSlider(methodName);
  }

  private setInputValue(inputName: string, methodName: string, isCheckbox = false): void {
    const makeSliderMethod: any = this.makeSliderMethod;

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

  private updateInputValues(): void {
    this.setInputValue('current-value', 'getCurrentValue');
    this.setInputValue('current-max-value', 'getCurrentEndValue');
    this.setInputValue('min-value', 'getMinValue');
    this.setInputValue('max-value', 'getMaxValue');
    this.setInputValue('step-size', 'getStepSize');
    this.setInputValue('scale-items', 'getScaleMarksQuantity');
    this.setInputValue('tip', 'isTipShown', true);
    this.setInputValue('scale', 'isScaleShown', true);
  }
}

new DemoView();

export default DemoView;
