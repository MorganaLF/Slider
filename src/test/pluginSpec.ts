import Controller from './../plugin/Controller/Controller';

describe('Функция customSlider', () => {
  let $element: JQuery;

  beforeEach(() => {
    setFixtures('<div class="slider"></div>');
    $element = $('.slider');
    $element.customSlider();
  });

  it('При инициализации сохраняет экземпляр класса Controller в data элемента', () => {
    $element.customSlider();

    expect($element.data('constructor') instanceof Controller).toBeTruthy();
  });

  it('Позволяет передать в параметры коллбек для события changevalue', () => {
    const callback = jasmine.createSpy();

    $element.customSlider({
      onChangeValue: callback,
    });

    $element.trigger('changevalue');

    expect(callback).toHaveBeenCalled();
  });

  it('Поддерживает data-аттрибуты', () => {
    setFixtures('<div class="slider" data-start-value="33"></div>');

    $element = $('.slider');
    $element.customSlider();

    expect($element.customSlider('getCurrentValue')).toEqual(33);
  });

  it('При вызове с аргументами вызывает соответствующий метод Controller', () => {
    const spyOnGetter = spyOn($element.data('constructor'), 'getCurrentValue');
    $element.customSlider('getCurrentValue');

    expect(spyOnGetter).toHaveBeenCalled();

    const spyOnSetter = spyOn($element.data('constructor'), 'setMinValue');
    $element.customSlider('setMinValue', 10);

    expect(spyOnSetter).toHaveBeenCalled();
  });
});
