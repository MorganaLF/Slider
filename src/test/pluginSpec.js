import $ from "jquery";
import customSlider from '../components/slider/plugin';
import SliderApp from "../components/slider/app";

describe('Функция customSlider', function () {
  let el;
  beforeEach(function () {
    setFixtures('<div class="slider"></div>');
    el = $('.slider');
    el.customSlider();
  });
  it('При инициализации сохраняет экземпляр класса SliderApp в data элемента', function () {
    el.customSlider();
    expect(el.data('constructor') instanceof SliderApp).toBeTruthy();
  });

  it('Поддерживает data-аттрибуты', function () {
    setFixtures('<div class="slider" data-start-value="33"></div>');
    el = $('.slider');
    el.customSlider();
    expect(el.data('constructor').startValue).toEqual(33);
  });

  it('При вызове с аргументами вызывает соответствующий метод SliderApp', function () {
    let spy = spyOn(el.data('constructor'), 'currentValue');
    el.customSlider('currentValue');
    expect(spy).toHaveBeenCalled();

    let spy2 = spyOn(el.data('constructor'), 'setMinValue');
    el.customSlider('setMinValue', 10);
    expect(spy2).toHaveBeenCalled();
  });
});