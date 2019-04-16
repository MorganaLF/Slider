import SliderApp from '../plugin/SliderApp/SliderApp';

describe('Функция customSlider', () => {
  let $element: JQuery;

  beforeEach(() => {
    setFixtures('<div class="slider"></div>');
    $element = $('.slider');
    $element.customSlider();
  });

  it('При инициализации сохраняет экземпляр класса SliderApp в data элемента', () => {
    $element.customSlider();

    expect($element.data('constructor') instanceof SliderApp).toBeTruthy();
  });

  it('Поддерживает data-аттрибуты', () => {
    setFixtures('<div class="slider" data-start-value="33"></div>');

    $element = $('.slider');
    $element.customSlider();

    expect($element.data('constructor').startValue).toEqual(33);
  });

  it('При вызове с аргументами вызывает соответствующий метод SliderApp', () => {
    const spyOnGetter = spyOn($element.data('constructor'), 'getCurrentValue');
    $element.customSlider('getCurrentValue');

    expect(spyOnGetter).toHaveBeenCalled();

    const spyOnSetter = spyOn($element.data('constructor'), 'setMinValue');
    $element.customSlider('setMinValue', 10);

    expect(spyOnSetter).toHaveBeenCalled();
  });
});
