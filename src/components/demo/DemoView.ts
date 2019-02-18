import $ from "jquery";
import customSlider from '../slider/plugin';

export default class DemoView {
  constructor (options = {}) {
    $.extend(this, {
    }, options);
  }

  _createDemoPage (): void {
    let demoTemplate: object = $(
        `<div class="page">
          <div class="page__row">
            <div class="page__col">
              <div class="slider slider_simple"></div>
            </div>
            <div class="page__col">
              <form class="options">
                <div class="options__row">
                  <div class="options__col">
                    <label for="">Min value</label>
                    <input type="text" name="min-value">
                    <label for="">Max value</label>
                    <input type="text" name="max-value">
                  </div>
                  <div class="options__col">
                    <label for="">Current value</label>
                    <input type="text" name="current-value">
                  </div>
                  <div class="options__col">
                    <label for="">Show tip</label>
                    <input type="checkbox" name="tip" id="" checked>
                    <label for="">Show scale</label>
                    <input type="checkbox" name="scale" id="">
                    <label for="">Horizontal / vertical</label>
                    <input type="radio" name="orientation" value="horizontal" id="" checked>
                    <input type="radio" name="orientation" value="vertical" id="">
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="page__row">
            <div class="page__col">
              <form class="options">
                  <div class="options__row">
                    <div class="options__col">
                      <label for="">Min value</label>
                      <input type="text" name="min-value">
                      <label for="">Max value</label>
                      <input type="text" name="max-value">
                    </div>
                    <div class="options__col">
                      <label for="">Current value</label>
                      <input type="text" name="current-value">
                    </div>
                    <div class="options__col">
                      <label for="">Show tip</label>
                      <input type="checkbox" name="tip" id="">
                      <label for="">Show scale</label>
                      <input type="checkbox" name="scale" id="" checked>
                      <label for="">Horizontal / vertical</label>
                      <input type="radio" name="orientation" value="horizontal" id="" checked>
                      <input type="radio" name="orientation" value="vertical" id="">
                    </div>
                  </div>
              </form>
            </div>
            <div class="page__col">
              <div class="slider slider_istip"></div>
            </div>
          </div>
          <div class="page__row">
            <div class="page__col">
              <div class="slider slider_interval"></div>
            </div>
            <div class="page__col">
              <form class="options">
                <div class="options__row">
                  <div class="options__col">
                    <label for="">Min value</label>
                    <input type="text" name="min-value">
                    <label for="">Max value</label>
                    <input type="text" name="max-value">
                  </div>
                  <div class="options__col">
                    <label for="">Current min value</label>
                    <input type="text" name="current-value">
                    <label for="">Current max value</label>
                    <input type="text" name="current-max-value">
                  </div>
                  <div class="options__col">
                    <label for="">Show tip</label>
                    <input type="checkbox" name="tip" id="" checked>
                    <label for="">Show scale</label>
                    <input type="checkbox" name="scale" id="">
                    <label for="">Horizontal / vertical</label>
                    <input type="radio" name="orientation" value="horizontal" id="" checked>
                    <input type="radio" name="orientation" value="vertical" id="">
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="page__row">
            <div class="page__col">
              <form class="options">
                <div class="options__row">
                  <div class="options__col">
                    <label for="">Min value</label>
                    <input type="text" name="min-value">
                    <label for="">Max value</label>
                    <input type="text" name="max-value">
                  </div>
                  <div class="options__col">
                    <label for="">Current min value</label>
                    <input type="text" name="current-value">
                    <label for="">Current max value</label>
                    <input type="text" name="current-max-value">
                  </div>
                  <div class="options__col">
                    <label for="">Step size</label>
                    <input type="text" name="step-size">
                    <label for="">Show tip</label>
                    <input type="checkbox" name="tip" id="" checked>
                    <label for="">Show scale</label>
                    <input type="checkbox" name="scale" id="">
                    <label for="">Horizontal / vertical</label>
                    <input type="radio" name="orientation" value="horizontal" id="" checked>
                    <input type="radio" name="orientation" value="vertical" id="">
                  </div>
                </div>
              </form>
            </div>
            <div class="page__col">
              <div class="slider slider_step"></div>
            </div>
          </div>
         </div>`
    );

    demoTemplate.appendTo($('body'));
  }

  init (): void {
    this._createDemoPage();

    $('.slider_simple').customSlider();
    $('.slider_istip').customSlider({
      isTip: false,
      isScale: true
    });
    $('.slider_interval').customSlider({
      type: 'interval',
      startValue: 20,
      endValue: 80
    });
    $('.slider_step').customSlider({
      type: 'single',
      //minVal: 20,
      startValue: 20,
      endValue: 80,
      step: 20
    });

    this._updateInputValues();
    this._addHandlers();
  }

  _addBodyHandlers (): void {
    $('body').on('changestartvalue', () => {
      this._updateInputValues();
    });
    $('body').on('changeendvalue', () => {
      this._updateInputValues();
    });
  }

  _addTextInputHandlers (name: string, method: string): void {
    $(`input[name="${name}"]`).on('change', (e) => {
      this._updateSlider($(e.target), method);
    });
  }

  _addCheckboxHandlers (name: string, on: string, off: string): void {
    $(`input[name="${name}"]`).on('change', (e) => {
      this._updateCheckboxes($(e.target), on, off);
    });
  }

  _addRadioHandlers (): void {
    $('input[name="orientation"]').on('change', (e): void => {
      this._updateRadio($(e.target), 'setHorisontalOrientation', 'setVeticalOrientation');
    });
  }

  _addHandlers (): void {
    this._addBodyHandlers();
    this._addTextInputHandlers('min-value', 'setMinValue');
    this._addTextInputHandlers('max-value', 'setMaxValue');
    this._addTextInputHandlers('current-value', 'setCurrentValue');
    this._addTextInputHandlers('current-max-value', 'setCurrentMaxValue');
    this._addTextInputHandlers('step-size', 'setStepSize');
    this._addCheckboxHandlers('tip', 'showTip', 'hideTip');
    this._addCheckboxHandlers('scale', 'showScale', 'hideScale');
    this._addRadioHandlers();
  }

  _getSliderMethod (el, method: string): number {
    return el
                .closest('.page__row')
                .find('.slider')
                .customSlider(method);
  }

  _updateSlider (el, method: string): void {
    el
        .closest('.page__row')
        .find('.slider')
        .customSlider(method, el.val());
  }

  _setInputVal (name, method: string): void {
    let self = this;
    $(`input[name="${name}"]`).each(function () {
      let currentValue: number = self._getSliderMethod($(this), method);
      $(this).val(currentValue);
    });
  }

  _updateInputValues (): void {
    this._setInputVal('current-value', 'currentValue');
    this._setInputVal('current-max-value', 'currentMaxValue');
    this._setInputVal('min-value', 'minValue');
    this._setInputVal('max-value', 'maxValue');
    this._setInputVal('step-size', 'stepSize');
  }

  _updateCheckboxes (el, on: string, off: string): void {
      if (el.prop('checked')) {
        this._getSliderMethod(el, on);
      } else {
        this._getSliderMethod(el, off);
      }
  }

  _updateRadio (el, on: string, off: string): void {
    let radioGroup: object =
        el
            .closest('.page__row')
            .find($('input[name="orientation"]:checked'));

    if (radioGroup.val() === 'horizontal') {
      this._getSliderMethod(el, on);
    } else {
      this._getSliderMethod(el, off);
    }
  }
}

