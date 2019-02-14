import $ from 'jquery';
import TipView from '../components/slider/tip/TipView';

/* TIP VIEW */

describe('TipView', function () {
  let tipView;

  beforeEach(function () {
    tipView = new TipView();
  });

  it('Создается экземпляр класса RunnerView', function () {
    expect(tipView).toBeDefined();
  });

});

describe('TipView. Функция drawTip', function () {
  let tipView,
      parent;

  beforeEach(function () {
    setFixtures('<div class="slider"><div class="slider__runner"></div></div>');
    parent = $('.slider__runner');
    tipView = new TipView();
    tipView.drawTip(parent);
  });

  it('Должна создавать элемент slider__tip внутри элемента slider__runner', function () {
    expect($('.slider .slider__runner .slider__tip')).toExist();
  });

  it('Добавляет класс slider__tip_vertical, если имеет вертикальный вид', function () {
    tipView.orientation = 'vertical';
    tipView.drawTip(parent);
    expect($('.slider .slider__runner .slider__tip_vertical')).toExist();
  });

});

describe('TipView. Функция updateTip', function () {
  let tipView,
      parent;

  beforeEach(function () {
    setFixtures('<div class="slider"><div class="slider__runner"></div></div>');
    parent = $('.slider__runner');
    tipView = new TipView();
    tipView.drawTip(parent);
  });

  it('Должна обновлять значение внутри подсказки', function () {
    tipView.updateTip(15);
    expect($('.slider .slider__runner .slider__tip').text()).toEqual('15');
  });

});
