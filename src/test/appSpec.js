import SliderView from '../components/slider/view';
import SliderModel from '../components/slider/model';
import $ from 'jquery';

describe('Функция должна рисовать слайдер', function () {
  let element,
      slider;

  beforeEach(function() {
    setFixtures('<div class="slider"></div>');
    element = document.getElementsByClassName('slider')[0];
    slider = new SliderView({el: element});
    slider.drawSlider();
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

  it('Функция должна рисовать слайдер только один раз', function () {
    slider.drawSlider();
    expect($('.slider .slider__progress').length).toEqual(1);
  });
});

describe('Тестирование ползунка слайдера', function () {
  let element,
      slider,
      runner,
      sliderModel;

  beforeEach(function() {
    setFixtures('<div class="slider"></div>');
    element = document.getElementsByClassName('slider')[0];
    slider = new SliderView({el: element});
    slider.drawSlider();
    runner = document.querySelector('.slider .slider__runner');
    sliderModel = new SliderModel({el: element, runner: runner});
    sliderModel.addHandlers();
  });

  it('Ползунок слайдера должен переходить в положение absolute', function () {
    spyOnEvent(runner, 'mousedown');
    $(runner).mousedown();
    //expect('mousedown').toHaveBeenTriggeredOn($(runner));
    expect($(runner).css('position')).toEqual('absolute');
  });

  it('Центр ползунка слайдера должен располагаться под курсором мыши', function () {
    spyOnEvent(runner, 'mousedown');
    $(runner).mousedown();
    expect($(runner).css('left')).toEqual('0px');
  });
});
