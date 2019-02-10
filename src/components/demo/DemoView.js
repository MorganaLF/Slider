import $ from "jquery";
//import customSlider from '../slider/app';

export default class DemoView {
  constructor (options = {}) {
    $.extend(this, {
      el: options.el
    }, options);
  }

  createDemoPage () {
    let demoTemplate = $(
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
         </div>`
    );

    demoTemplate.appendTo($('body'));
  }

  init () {

    this.createDemoPage();

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

    this.updateValToInput();
    this.addHandlers();

  }

  addHandlers () {
    $('body').on('changestartvalue', () => {
      this.updateValToInput();
    });
    $('body').on('changeendvalue', () => {
      this.updateValToInput();
    });
    $('input[name="tip"]').on('change', (e) => {
      this.updateCheckboxes($(e.target), 'showTip', 'hideTip');
    });
    $('input[name="scale"]').on('change', (e) => {
      this.updateCheckboxes($(e.target), 'showScale', 'hideScale');
    });
    $('input[name="orientation"]').on('change', (e) => {
      this.updateRadio($(e.target), 'setHorisontalOrientation', 'setVeticalOrientation');
    });
    $('input[name="min-value"]').on('change', (e) => {
      this.updateSlider($(e.target), 'setMinValue');
    });
    $('input[name="max-value"]').on('change', (e) => {
      this.updateSlider($(e.target), 'setMaxValue');
    });
    $('input[name="current-value"]').on('change', (e) => {
      this.updateSlider($(e.target), 'setCurrentValue');
    });
    $('input[name="current-max-value"]').on('change', (e) => {
      this.updateSlider($(e.target), 'setCurrentMaxValue');
    });
  }

  updateValToInput () {
    $('input[name="current-value"]').each(function () {
      let currentValue =
          $(this)
              .closest('.page__row')
              .find('.slider')
              .customSlider('currentValue');
      $(this).val(currentValue);
    });

    $('input[name="current-max-value"]').each(function () {
      let currentValue =
          $(this)
              .closest('.page__row')
              .find('.slider')
              .customSlider('currentMaxValue');
      $(this).val(currentValue);
    });

    $('input[name="min-value"]').each(function () {
      let currentValue =
          $(this)
              .closest('.page__row')
              .find('.slider')
              .customSlider('minValue');
      $(this).val(currentValue);
    });

    $('input[name="max-value"]').each(function () {
      let currentValue =
          $(this)
              .closest('.page__row')
              .find('.slider')
              .customSlider('maxValue');
      $(this).val(currentValue);
    })

  }

  updateCheckboxes (el, on, off) {
      if (el.prop('checked')) {
        el
            .closest('.page__row')
            .find('.slider')
            .customSlider(on);
      } else {
        el
            .closest('.page__row')
            .find('.slider')
            .customSlider(off);
      }
  }

  updateRadio (el, on, off) {
    let radioGroup =
        el
            .closest('.page__row')
            .find($('input[name="orientation"]:checked'));

    if (radioGroup.val() === 'horizontal') {
      el
          .closest('.page__row')
          .find('.slider')
          .customSlider(on);
    } else {
      el
          .closest('.page__row')
          .find('.slider')
          .customSlider(off);
    }
  }

  updateSlider (el, method) {
    el
        .closest('.page__row')
        .find('.slider')
        .customSlider(method, el.val());
  }
}

let demoView = new DemoView();
demoView.init();