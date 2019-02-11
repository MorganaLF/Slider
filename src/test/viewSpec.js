import $ from 'jquery';
import SliderView from '../components/slider/view';
import SliderModel from '../components/slider/model';

describe('SliderView', function () {
  let element,
      slider,
      sliderModel;

  beforeEach(function() {
    setFixtures('<div class="slider"></div>');
    element = $('.slider');
    sliderModel = new SliderModel();
    slider = new SliderView({el: element, model: sliderModel});
    slider.updateSlider();
  });

  it('Создает экземпляр класса SliderView', function () {
    expect(slider).toBeDefined();
  });
});

describe('SliderView. Функция updateSlider', function () {
  let element,
      slider,
      sliderModel;

  beforeEach(function() {
    setFixtures('<div class="slider"></div>');
    element = $('.slider');
    sliderModel = new SliderModel();
    slider = new SliderView({el: element, model: sliderModel});
    slider.updateSlider();
  });

  it('Должна создавать элемент slider__track внутри указанного элемента', function () {
    expect($('.slider .slider__track')).toExist();
  });

  it('Должна создавать элемент slider__track-full внутри элемента slider__track', function () {
    expect($('.slider .slider__track .slider__track-full')).toExist();
  });

  it('Должна создавать элемент slider__runner внутри элемента slider', function () {
    expect($('.slider .slider__runner')).toExist();
  });

  it('Создает два элемента slider__runner, если тип слайдера "interval"', function () {
    slider.type = 'interval';
    slider.updateSlider();
    expect($('.slider .slider__runner').length).toEqual(2);
  });

  it('По умолчанию должна создавать элемент slider__tip внутри элемента slider__runner', function () {
    expect($('.slider .slider__runner .slider__tip')).toExist();
  });

  it('Создает два элемента slider__tip, если тип слайдера "interval"', function () {
    slider.type = 'interval';
    slider.updateSlider();
    expect($('.slider .slider__runner .slider__tip').length).toEqual(2);
  });

  it('Должна рисовать слайдер только один раз', function () {
    slider.updateSlider();
    slider.updateSlider();
    slider.updateSlider();
    expect($('.slider .slider__track').length).toEqual(1);
  });

  it('Очищает содержимое родительского элемента перед созданием слайдера', function () {
    $('.slider').html('<div class="test"></div>');
    expect($('.slider .test')).toExist();
    slider.updateSlider();
    expect($('.slider .test')).not.toExist();
  });

  it('Записывает экземпляр класса RunnerView в свойство runner1', function () {
    expect(slider.runner1.el).toBeDefined();
  });

  it('Записывает экземпляр класса RunnerView в свойство runner2, если тип слайдера interval', function () {
    slider.type = 'interval';
    slider.updateSlider();
    expect(slider.runner2.el).toBeDefined();
  });

  it('Записывает экземпляр класса TipView в свойство tip1', function () {
    expect(slider.tip1.el).toBeDefined();
  });

  it('Записывает экземпляр класса TipView в свойство tip2, если тип слайдера interval', function () {
    slider.type = 'interval';
    slider.updateSlider();
    expect(slider.tip2.el).toBeDefined();
  });

  it('Записывает экземпляр класса TrackView в свойство track', function () {
    expect(slider.track.el).toBeDefined();
  });

  it('Записывает экземпляр класса ScaleView в свойство scale', function () {
    slider.isScale = true;
    slider.updateSlider();
    expect(slider.scale.el).toBeDefined();
  });
});