import SliderView from '../components/slider/view';
import SliderModel from '../components/slider/model';
import $ from 'jquery';
import SliderController from "../components/slider/controller";

/* VIEW */

describe('Функция drawSlider должна рисовать слайдер', function () {
  let element,
      slider;

  beforeEach(function() {
    setFixtures('<div class="slider"></div>');
    element = document.getElementsByClassName('slider')[0];
    slider = new SliderView({el: element});
    slider.drawSlider();
  });

  it('Создает экземпляр класса SliderView', function () {
    expect(slider).toBeDefined();
  });

  it('подгружает fixtures', function () {
    expect($('.slider')).toExist();
  });

  it('Функция должна создавать элемент slider__progress внутри элемента slider', function () {
    expect($('.slider .slider__progress')).toExist();
  });

  it('Функция должна создавать элемент slider__progress-full внутри элемента slider__progress', function () {
    expect($('.slider .slider__progress .slider__progress-full')).toExist();
  });

  it('Функция должна создавать элемент slider__runner внутри элемента slider', function () {
    expect($('.slider .slider__runner')).toExist();
  });

  it('Функция по умолчанию должна создавать элемент slider__tip внутри элемента slider__runner', function () {
    expect($('.slider .slider__runner .slider__tip')).toExist();
  });

  it('Функция должна рисовать слайдер только один раз', function () {
    slider.drawSlider();
    expect($('.slider .slider__progress').length).toEqual(1);
  });
});

describe('Движение ползунка слайдера', function () {
  let element,
      slider,
      runner;

  beforeEach(function() {
    setFixtures('<div class="slider"></div>');
    element = document.getElementsByClassName('slider')[0];
    slider = new SliderView({el: element});
    slider.drawSlider();
    runner = element.getElementsByClassName('slider__runner')[0];
  });

  it('Ползунку можно задать положение', function () {
    slider.setRunnerPosition(10);
    expect(runner.style.left).toEqual('10px');
  });
});

/* MODEL */

describe('SliderModel', function () {
  let sliderModel,
      element;

  beforeEach(function() {
    setFixtures('<div class="slider"></div>');
    element = document.getElementsByClassName('slider')[0];
    sliderModel = new SliderModel();
  });

  it('Создает экземпляр класса', function () {
    expect(sliderModel).toBeDefined();
  });

  it('По умолчанию объект хранит значение value равное 0', function () {
    expect(sliderModel.currentValue).toEqual(0);
  });

  it('Позволяет установить текущее значение value', function () {
    sliderModel.currentValue = 10;
    expect(sliderModel.currentValue).toEqual(10);
  });

  it('Метод setExtremeValues позволяет задать максимальное и минимальное значение', function () {
    sliderModel.extremeValues = {min: 50, max: 5000};
    expect(sliderModel.extremeValues.min).toEqual(50);
    expect(sliderModel.extremeValues.max).toEqual(5000);
  });

  it('Метод getSliderType позволяет получить тип слайдера', function () {
    expect(sliderModel.sliderType).toEqual('single');
  });

  it('Метод setSliderType позволяет установить тип слайдера', function () {
    sliderModel.sliderType = 'interval';
    expect(sliderModel.sliderType).toEqual('interval');
  });

  it('Метод setSliderType не позволяет установить не предусмотренный тип', function () {
    sliderModel.sliderType = '123';
    expect(sliderModel.sliderType).toEqual('single');
  });

  it('Метод calculateValue считает текущее значение слайдера', function () {
    element.style.width = '300px';
    sliderModel.calculateValue(element, 150);
    expect(sliderModel.currentValue).toEqual(50);
  });

});

/* CONTROLLER */

describe('Controller', function () {
  let element,
      slider,
      runner,
      sliderModel,
      sliderController;

  beforeEach(function () {
    setFixtures('<div class="slider"></div>');
    element = document.getElementsByClassName('slider')[0];
    slider = new SliderView({el: element});
    slider.drawSlider();
    runner = element.getElementsByClassName('slider__runner')[0];

    sliderModel = new SliderModel();
    sliderController = new SliderController(slider, sliderModel);
    sliderController.addHandlers();
    spyOn(slider, 'moveRunner');
    spyOn(sliderController, 'removeHandlers');
    $(runner).mousedown();
    $(document).mousemove();
  });

  it('Метод moveRunner запускается при клике на runner', function () {
    expect(slider.moveRunner).toHaveBeenCalled();
  });

  it('При отпускании клавиши мыши все события прекращаются', function () {
    $(document).mouseup();
    expect(sliderController.removeHandlers).toHaveBeenCalled();
  });
});
