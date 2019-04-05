//import $ from 'jquery';
import $ = require('jquery');
import SliderView from '../plugin/SliderView';
import SliderModel from '../plugin/SliderModel';

describe('SliderView', function () {
  let element,
      slider: SliderView,
      sliderModel;

  beforeEach(function() {
    setFixtures('<div class="slider"></div>');
    element = $('.slider');
    sliderModel = new SliderModel({
        startValue: 0,
        endValue: 70.954,
        minVal: 0,
        maxVal: 100,
        step: 0,
        type: 'single'
    });
    slider = new SliderView({
        el: element,
        type: 'single',
        orientation: 'horizontal',
        model: sliderModel,
        isTip: true,
        isScale: true,
        scaleItemsQuantity: 10
    });
    slider.updateSlider();
  });

  it('Создает экземпляр класса SliderView', function () {
    expect(slider).toBeDefined();
  });
});

describe('SliderView. Функция updateSlider', function () {
  let element: JQuery,
      slider: SliderView,
      sliderModel: SliderModel;

  beforeEach(function() {
    setFixtures('<div class="slider"></div>');
    element = $('.slider');
      sliderModel = new SliderModel({
          startValue: 0,
          endValue: 70.954,
          minVal: 0,
          maxVal: 100,
          step: 0,
          type: 'single'
      });
      slider = new SliderView({
          el: element,
          type: 'single',
          orientation: 'horizontal',
          model: sliderModel,
          isTip: true,
          isScale: true,
          scaleItemsQuantity: 10
      });
    slider.updateSlider();
  });

    it('Не рисует слайдер, если элемент null либо undefined', function () {
        slider.el = null;
        expect(slider.updateSlider()).toEqual(false);
    });

    it('Добавляет корневому элементу класс vertical, если ориентация вертикальная', function () {
        slider = new SliderView({
            el: element,
            type: 'single',
            orientation: 'vertical',
            model: sliderModel,
            isTip: true,
            isScale: true,
            scaleItemsQuantity: 10
        });
        slider.updateSlider();
        expect($('.slider_vertical')).toExist();
    });

    it('Удаляет у корневого элемента класс vertical, если ориентация горизонтальная', function () {
        slider = new SliderView({
            el: element,
            type: 'single',
            orientation: 'horizontal',
            model: sliderModel,
            isTip: true,
            isScale: true,
            scaleItemsQuantity: 10
        });
        slider.updateSlider();
        expect($('.slider_vertical')).not.toExist();
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
    expect(slider.runner1!.$element).toBeDefined();
  });

  it('Записывает экземпляр класса RunnerView в свойство runner2, если тип слайдера interval', function () {
    slider.type = 'interval';
    slider.updateSlider();
    expect(slider.runner2!.$element).toBeDefined();
  });

  it('Записывает экземпляр класса TipView в свойство tip1', function () {
    expect(slider.tip1!.updateTip).toBeDefined();
  });

  it('Записывает экземпляр класса TipView в свойство tip2, если тип слайдера interval', function () {
    slider.type = 'interval';
    slider.updateSlider();
    expect(slider.tip2!.updateTip).toBeDefined();
  });

  it('Записывает экземпляр класса TrackView в свойство track', function () {
    expect(slider.track!.drawTrack).toBeDefined();
  });

  it('Записывает экземпляр класса ScaleView в свойство scale', function () {
    slider.updateSlider();
    expect(slider.scale!.drawScale).toBeDefined();
  });
});