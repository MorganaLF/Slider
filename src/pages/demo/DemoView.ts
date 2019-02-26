//import $ from "jquery";
import $ = require('jquery');
import SliderApp from '../../plugin/SliderApp';
import {SliderAppOptions} from '../../plugin/interfaces';
let result: (method: string, arg: string) => void;

export default class DemoView {
  constructor () {

  }

  private _createDemoPage (): void {
    let demoTemplate: JQuery = $(
        `<div class="page">
          <h1 class="subheading">Simple slider</h1>
          <div class="page__row">
            <div class="page__col">
              <div class="slider slider_simple"></div>
            </div>
            <div class="page__col page__options-col">
              <form class="options">
                <div class="options__row">
                  <div class="options__col">
                    <label for="">Min value</label>
                    <input class="input" type="text" name="min-value">
                    <label for="">Max value</label>
                    <input class="input" type="text" name="max-value">
                  </div>
                  <div class="options__col">
                    <label for="">Current value</label>
                    <input class="input" type="text" name="current-value">
                  </div>
                  <div class="options__col">
                    <div class="checkboxes">
                        <label for="">Show tip</label>
                        <label class="tick-box" for="tip">
                          <input class="tick-box__input" type="checkbox" name="tip" id="tip" checked>
                          <div class="tick-box__round"></div>
                        </label>
                    </div>
                    <div class="checkboxes">
                        <label for="">Show scale</label>
                        <label class="tick-box" for="scale">
                          <input class="tick-box__input" type="checkbox" name="scale" id="scale">
                          <div class="tick-box__round"></div>
                        </label> 
                    </div>
                    <div class="checkboxes">
                        <label for="">Vertical orientation</label>
                        <label class="tick-box" for="orientation">
                          <input class="tick-box__input" type="checkbox" name="orientation" id="orientation">
                          <div class="tick-box__round"></div>
                        </label> 
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <h2 class="subheading">Slider with scale</h2>
          <div class="page__row">
            <div class="page__col page__options-col">
              <form class="options">
                <div class="options__row">
                  <div class="options__col">
                    <label for="">Min value</label>
                    <input class="input" type="text" name="min-value">
                    <label for="">Max value</label>
                    <input class="input" type="text" name="max-value">
                  </div>
                  <div class="options__col">
                    <label for="">Current value</label>
                    <input class="input" type="text" name="current-value">
                    <label for="">Quantity of scale parts </label>
                    <input class="input" type="text" name="scale-items">
                  </div>
                  <div class="options__col">
                    <div class="checkboxes">
                        <label for="">Show tip</label>
                        <label class="tick-box" for="tip2">
                          <input class="tick-box__input" type="checkbox" name="tip" id="tip2">
                          <div class="tick-box__round"></div>
                        </label>
                    </div>
                    <div class="checkboxes">
                        <label for="">Show scale</label>
                        <label class="tick-box" for="scale2">
                          <input class="tick-box__input" type="checkbox" name="scale" id="scale2" checked>
                          <div class="tick-box__round"></div>
                        </label> 
                    </div>
                    <div class="checkboxes">
                        <label for="">Vertical orientation</label>
                        <label class="tick-box" for="orientation2">
                          <input class="tick-box__input" type="checkbox" name="orientation" id="orientation2">
                          <div class="tick-box__round"></div>
                        </label> 
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="page__col">
              <div class="slider slider_istip"></div>
            </div>
          </div>
          <h2 class="subheading">Interval slider</h2>
          <div class="page__row">
            <div class="page__col">
              <div class="slider slider_interval"></div>
            </div>
            <div class="page__col page__options-col">
              <form class="options">
                <div class="options__row">
                  <div class="options__col">
                    <label for="">Min value</label>
                    <input class="input" type="text" name="min-value">
                    <label for="">Max value</label>
                    <input class="input" type="text" name="max-value">
                  </div>
                  <div class="options__col">
                    <label for="">Current min value</label>
                    <input class="input" type="text" name="current-value">
                    <label for="">Current max value</label>
                    <input class="input" type="text" name="current-max-value">
                  </div>
                  <div class="options__col">
                    <div class="checkboxes">
                        <label for="">Show tip</label>
                        <label class="tick-box" for="tip3">
                          <input class="tick-box__input" type="checkbox" name="tip" id="tip3" checked>
                          <div class="tick-box__round"></div>
                        </label>  
                    </div>
                    <div class="checkboxes">
                        <label for="">Show scale</label>
                        <label class="tick-box" for="scale3">
                          <input class="tick-box__input" type="checkbox" name="scale" id="scale3">
                          <div class="tick-box__round"></div>
                        </label>
                    </div>
                    <div class="checkboxes">
                        <label for="">Vertical orientation</label>
                        <label class="tick-box" for="orientation3">
                          <input class="tick-box__input" type="checkbox" name="orientation" id="orientation3">
                          <div class="tick-box__round"></div>
                        </label> 
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <h2 class="subheading">Slider with step value</h2>
          <div class="page__row">
            <div class="page__col page__options-col">
              <form class="options">
                <div class="options__row">
                  <div class="options__col">
                    <label for="">Min value</label>
                    <input class="input" type="text" name="min-value">
                    <label for="">Max value</label>
                    <input class="input" type="text" name="max-value">
                  </div>
                  <div class="options__col">
                    <label for="">Current min value</label>
                    <input class="input" type="text" name="current-value">
                    <label for="">Step size</label>
                    <input class="input" type="text" name="step-size">
                  </div>
                  <div class="options__col">
                    <div class="checkboxes">
                        <label for="">Show tip</label>
                        <label class="tick-box" for="tip4">
                          <input class="tick-box__input" type="checkbox" name="tip" id="tip4" checked>
                          <div class="tick-box__round"></div>
                        </label>
                    </div>
                    <div class="checkboxes">
                        <label for="">Show scale</label>
                        <label class="tick-box" for="scale4">
                          <input class="tick-box__input" type="checkbox" name="scale" id="scale4">
                          <div class="tick-box__round"></div>
                        </label>
                    </div>
                    <div class="checkboxes">
                        <label for="">Vertical orientation</label>
                        <label class="tick-box" for="orientation4">
                          <input class="tick-box__input" type="checkbox" name="orientation" id="orientation4">
                          <div class="tick-box__round"></div>
                        </label> 
                    </div>
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
      this._updateInputValues();
    });
  }

  private _addCheckboxHandlers (name: string, on: string, off: string): void {
    $(`input[name="${name}"]`).on('change', (e) => {
      this._updateCheckboxes($(e.target), on, off);
    });
  }

  private _addHandlers (): void {
    this._addBodyHandlers();
    this._addTextInputHandlers('min-value', 'setMinValue');
    this._addTextInputHandlers('max-value', 'setMaxValue');
    this._addTextInputHandlers('current-value', 'setCurrentValue');
    this._addTextInputHandlers('current-max-value', 'setCurrentMaxValue');
    this._addTextInputHandlers('step-size', 'setStepSize');
    this._addTextInputHandlers('scale-items', 'setScaleItemsQuantity');
    this._addCheckboxHandlers('tip', 'showTip', 'hideTip');
    this._addCheckboxHandlers('scale', 'showScale', 'hideScale');
    this._addCheckboxHandlers('orientation', 'setVeticalOrientation', 'setHorisontalOrientation');
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
    this._setInputVal('scale-items', 'getScaleItemsQuantity');
  }

  private _updateCheckboxes (el: JQuery, on: string, off: string): void {
      if (el.prop('checked')) {
        this._getSliderMethod(el, on);
      } else {
        this._getSliderMethod(el, off);
      }
  }
}

