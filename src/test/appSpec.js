import SliderView from '../components/slider/view';
import SliderModel from '../components/slider/model';
import $ from 'jquery';

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

describe('Функция moveRunner должна двигать ползунок слайдера', function () {
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

  it('Ползунок двигается на указанные координаты', function () {
    slider.moveRunner({coordX: 10});
    expect(runner.style.left).toEqual('10px');
  });
});

/* MODEL */

describe('SliderModel', function () {
  let element,
      sliderModel;

  // beforeEach(function() {
  //   setFixtures('<div class="slider"></div>');
  //   element = document.getElementsByClassName('slider')[0];
  //   sliderModel = new SliderModel({el: element});
  // });
  //
  // it('Функция prepareRunner переводит ползунок в положение absolute', function () {
  //   sliderModel.prepareRunner();
  //   expect(sliderModel.pos).toEqual('absolute');
  // });

  // it('Центр ползунка слайдера должен располагаться под курсором мыши', function () {
  //   spyOnEvent(runner, 'mousedown');
  //   $(runner).mousedown();
  //   expect($(runner).css('left')).toEqual('0px');
  // });
  //
  // it('Ползунок слайдера должен двигаться при зажатой над ним клавиши мыши', function () {
  //   spyOnEvent(runner, 'mousedown');
  //   $(runner).mousedown();
  //
  //   spyOnEvent($(document), 'mousemove');
  //   let e = new jQuery.Event("mousemove");
  //   e.pageX = 10;
  //   $(document).trigger(e);
  //   let sliderOffset = element.getBoundingClientRect().left + pageXOffset;
  //   expect($(runner).css('left')).toEqual(e.pageX - sliderOffset + 'px');
  //
  //   e.pageX = 40;
  //   $(document).trigger(e);
  //   expect($(runner).css('left')).toEqual(e.pageX - sliderOffset + 'px');
  // });
});
