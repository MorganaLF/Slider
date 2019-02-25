//import $ from "jquery";
import $ = require('jquery');
import SliderApp from '../slider/app';
import {SliderAppOptions} from '../interfaces';
let result: (method: string, arg: string) => void;

$.fn.customSlider = function(options?: SliderAppOptions, ...rest: any[]): any {

    let args = arguments;

    this.each(function () {

        if (typeof options === 'object' || ! options) {
            let dataConfig: SliderAppOptions = {
                startValue: $(this).data('start-value'),
                endValue: $(this).data('end-value'),
                minVal: $(this).data('min-value'),
                maxVal: $(this).data('max-value'),
                type: $(this).data('type'),
                orientation: $(this).data('orientation'),
                step: $(this).data('step'),
                isTip: $(this).data('tip'),
                isScale: $(this).data('scale')
            };

            options = $.extend({el: $(this)}, options, dataConfig);
            $(this).data('constructor', new SliderApp(options));
            result = $(this).data('constructor').init();

        } else if (typeof options === 'string') {

            result = $(this).data('constructor')[options].apply($(this).data('constructor'), Array.prototype.slice.call( args, 1 ));
        }

    });

    return result;
};

export default class DemoView {
  constructor () {

  }

  private _createDemoPage (): void {
    let demoTemplate: JQuery = $(
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

  public init (): void {
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
      minVal: 16,
      startValue: 20,
      endValue: 80,
      step: 20
    });

    this._updateInputValues();
    this._addHandlers();
  }

  private _addBodyHandlers (): void {
    $('body').on('changestartvalue', () => {
      this._updateInputValues();
    });
    $('body').on('changeendvalue', () => {
      this._updateInputValues();
    });
  }

  private _addTextInputHandlers (name: string, method: string): void {
    $(`input[name="${name}"]`).on('change', (e) => {
      this._updateSlider($(e.target), method);
    });
  }

  private _addCheckboxHandlers (name: string, on: string, off: string): void {
    $(`input[name="${name}"]`).on('change', (e) => {
      this._updateCheckboxes($(e.target), on, off);
    });
  }

  private _addRadioHandlers (): void {
    $('input[name="orientation"]').on('change', (e): void => {
      this._updateRadio($(e.target), 'setHorisontalOrientation', 'setVeticalOrientation');
    });
  }

  private _addHandlers (): void {
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

  private _getSliderMethod (el: JQuery, method: string): number {
    return el
                .closest('.page__row')
                .find('.slider')
                .customSlider(method);
  }

  private _updateSlider (el: JQuery, method: string): void {
    el
        .closest('.page__row')
        .find('.slider')
        .customSlider(method, el.val());
  }

  private _setInputVal (name: string, method: string): void {
    let self = this;
    $(`input[name="${name}"]`).each(function () {
      let currentValue: number = self._getSliderMethod($(this), method);
      $(this).val(currentValue);
    });
  }

  private _updateInputValues (): void {
    this._setInputVal('current-value', 'getCurrentValue');
    this._setInputVal('current-max-value', 'getCurrentMaxValue');
    this._setInputVal('min-value', 'getMinValue');
    this._setInputVal('max-value', 'getMaxValue');
    this._setInputVal('step-size', 'getStepSize');
  }

  private _updateCheckboxes (el: JQuery, on: string, off: string): void {
      if (el.prop('checked')) {
        this._getSliderMethod(el, on);
      } else {
        this._getSliderMethod(el, off);
      }
  }

  private _updateRadio (el: JQuery, on: string, off: string): void {
    let radioGroup: JQuery =
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

