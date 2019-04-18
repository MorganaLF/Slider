import '../../plugin/plugin';

class DemoView {
  constructor() {
    this.init();
  }

  public init(): void {
    this._createDemoPage();

    const $simpleSlider: JQuery = $('.js-slider_simple');
    $simpleSlider.customSlider();

    const $sliderWithScale: JQuery = $('.js-slider_with-scale');

    $sliderWithScale.customSlider({
      withTip: false,
      withScale: true,
    });

    const $intervalSlider: JQuery = $('.js-slider_interval');

    $intervalSlider.customSlider({
      type: 'interval',
      startValue: 20,
      endValue: 80,
    });

    const $sliderWithStep: JQuery = $('.js-slider_with-step');

    $sliderWithStep.customSlider({
      type: 'single',
      minValue: 16,
      startValue: 20,
      endValue: 80,
      stepSize: 20,
      scaleMarksQuantity: 4,
    });

    this._updateInputValues();
    this._addHandlers();
  }

  private _createDemoPage(): void {
    const $demoTemplate: JQuery = $(
      `<div class="demo-page">
          <h1 class="subheading">Simple slider</h1>
          <div class="demo-page__row">
            <div class="demo-page__column">
              <div class="slider js-slider_simple"></div>
            </div>
            <div class="demo-page__column demo-page__options-column">
              <form class="options" action="mock-address/change-me" method="post">
                <div class="options__row">
                  <div class="options__column">
                    <label class="options__label">Min value</label>
                    <input class="input" type="number" name="min-value">
                    <label class="options__label">Max value</label>
                    <input class="input" type="number" name="max-value">
                  </div>
                  <div class="options__column">
                    <label class="options__label">Current value</label>
                    <input class="input" type="number" name="current-value">
                  </div>
                  <div class="options__column">
                    <div class="options__checkboxes-container">
                        <label class="options__label">Show tip</label>
                        <label class="tick-box">
                          <input
                            class="tick-box__input"
                            type="checkbox"
                            name="tip"
                            checked>
                          <div class="tick-box__round"></div>
                        </label>
                    </div>
                    <div class="options__checkboxes-container">
                        <label class="options__label">Show scale</label>
                        <label class="tick-box">
                          <input
                            class="tick-box__input"
                            type="checkbox"
                            name="scale">
                          <div class="tick-box__round"></div>
                        </label>
                    </div>
                    <div class="options__checkboxes-container">
                        <label class="options__label">Vertical orientation</label>
                        <label class="tick-box">
                          <input
                            class="tick-box__input"
                            type="checkbox"
                            name="orientation">
                          <div class="tick-box__round"></div>
                        </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <h2 class="subheading">Slider with scale</h2>
          <div class="demo-page__row">
            <div class="demo-page__column demo-page__options-column">
              <form class="options" action="mock-address/change-me" method="post">
                <div class="options__row">
                  <div class="options__column">
                    <label class="options__label">Min value</label>
                    <input class="input" type="number" name="min-value">
                    <label class="options__label">Max value</label>
                    <input class="input" type="number" name="max-value">
                  </div>
                  <div class="options__column">
                    <label class="options__label">Current value</label>
                    <input class="input" type="number" name="current-value">
                    <label class="options__label">Quantity of scale parts </label>
                    <input class="input" type="number" name="scale-items">
                  </div>
                  <div class="options__column">
                    <div class="options__checkboxes-container">
                        <label class="options__label">Show tip</label>
                        <label class="tick-box">
                          <input
                            class="tick-box__input"
                            type="checkbox"
                            name="tip">
                          <div class="tick-box__round"></div>
                        </label>
                    </div>
                    <div class="options__checkboxes-container">
                        <label class="options__label">Show scale</label>
                        <label class="tick-box">
                          <input
                            class="tick-box__input"
                            type="checkbox"
                            name="scale"
                            checked>
                          <div class="tick-box__round"></div>
                        </label>
                    </div>
                    <div class="options__checkboxes-container">
                        <label class="options__label">Vertical orientation</label>
                        <label class="tick-box">
                          <input
                            class="tick-box__input"
                            type="checkbox"
                            name="orientation">
                          <div class="tick-box__round"></div>
                        </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="demo-page__column">
              <div class="slider js-slider_with-scale"></div>
            </div>
          </div>
          <h2 class="subheading">Interval slider</h2>
          <div class="demo-page__row">
            <div class="demo-page__column">
              <div class="slider js-slider_interval"></div>
            </div>
            <div class="demo-page__column demo-page__options-column">
              <form class="options" action="mock-address/change-me" method="post">
                <div class="options__row">
                  <div class="options__column">
                    <label class="options__label">Min value</label>
                    <input class="input" type="number" name="min-value">
                    <label class="options__label">Max value</label>
                    <input class="input" type="number" name="max-value">
                  </div>
                  <div class="options__column">
                    <label class="options__label">Current min value</label>
                    <input class="input" type="number" name="current-value">
                    <label class="options__label">Current max value</label>
                    <input class="input" type="number" name="current-max-value">
                  </div>
                  <div class="options__column">
                    <div class="options__checkboxes-container">
                        <label class="options__label">Show tip</label>
                        <label class="tick-box">
                          <input
                            class="tick-box__input"
                            type="checkbox"
                            name="tip"
                            checked>
                          <div class="tick-box__round"></div>
                        </label>
                    </div>
                    <div class="options__checkboxes-container">
                        <label class="options__label">Show scale</label>
                        <label class="tick-box">
                          <input
                            class="tick-box__input"
                            type="checkbox"
                            name="scale">
                          <div class="tick-box__round"></div>
                        </label>
                    </div>
                    <div class="options__checkboxes-container">
                        <label class="options__label">Vertical orientation</label>
                        <label class="tick-box">
                          <input
                            class="tick-box__input"
                            type="checkbox"
                            name="orientation">
                          <div class="tick-box__round"></div>
                        </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <h2 class="subheading">Slider with step value</h2>
          <div class="demo-page__row">
            <div class="demo-page__column demo-page__options-column">
              <form class="options" action="mock-address/change-me" method="post">
                <div class="options__row">
                  <div class="options__column">
                    <label class="options__label">Min value</label>
                    <input class="input" type="number" name="min-value">
                    <label class="options__label">Max value</label>
                    <input class="input" type="number" name="max-value">
                  </div>
                  <div class="options__column">
                    <label class="options__label">Current min value</label>
                    <input class="input" type="number" name="current-value">
                    <label class="options__label">Step size</label>
                    <input class="input" type="number" name="step-size">
                  </div>
                  <div class="options__column">
                    <div class="options__checkboxes-container">
                        <label class="options__label">Show tip</label>
                        <label class="tick-box">
                          <input
                            class="tick-box__input"
                            type="checkbox"
                            name="tip"
                            checked>
                          <div class="tick-box__round"></div>
                        </label>
                    </div>
                    <div class="options__checkboxes-container">
                        <label class="options__label">Show scale</label>
                        <label class="tick-box">
                          <input
                            class="tick-box__input"
                            type="checkbox"
                            name="scale">
                          <div class="tick-box__round"></div>
                        </label>
                    </div>
                    <div class="options__checkboxes-container">
                        <label class="options__label">Vertical orientation</label>
                        <label class="tick-box">
                          <input
                            class="tick-box__input"
                            type="checkbox"
                            name="orientation">
                          <div class="tick-box__round"></div>
                        </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="demo-page__column">
              <div class="slider js-slider_with-step"></div>
            </div>
          </div>
         </div>`,
    );

    const $body: JQuery = $('body');
    $demoTemplate.appendTo($body);
  }

  private _updateSlider($element: JQuery, methodName: string): void {
    $element
      .closest('.demo-page__row')
      .find('.slider')
      .customSlider(methodName, $element.val());
  }

  private _addBodyHandlers(): void {
    const $body: JQuery = $('body');

    $body
      .on('changestartvalue.DemoView', this._updateInputValues.bind(this))
      .on('changeendvalue.DemoView', this._updateInputValues.bind(this));
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
    this._addBodyHandlers();
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

  private _setInputValue(inputName: string, methodName: string): void {
    const makeSliderMethod: (
      $element: JQuery,
      methodName: string,
    ) => number = this._makeSliderMethod;

    const $input: JQuery = $(`input[name="${inputName}"]`);

    $input.each(function() {
      const $this: JQuery = $(this);
      const currentValue: number = makeSliderMethod($this, methodName);
      $this.val(currentValue);
    });
  }

  private _updateInputValues(): void {
    this._setInputValue('current-value', 'getCurrentValue');
    this._setInputValue('current-max-value', 'getCurrentEndValue');
    this._setInputValue('min-value', 'getMinValue');
    this._setInputValue('max-value', 'getMaxValue');
    this._setInputValue('step-size', 'getStepSize');
    this._setInputValue('scale-items', 'getScaleMarksQuantity');
  }
}

new DemoView();

export default DemoView;
