//import $ from 'jquery';
import $ = require('jquery');
import TipView from '../components/slider/tip/TipView';
// import '../../node_modules/@types/jasmine';
// import '../../node_modules/@types/jasmine-jquery';
// import '../../node_modules/@types/jquery';

describe('TipView', function () {
  let tipView: TipView;

  beforeEach(function () {
    tipView = new TipView({
        orientation: 'horizontal'
    });
  });

  it('Создается экземпляр класса RunnerView', function () {
    expect(tipView).toBeDefined();
  });

});

describe('TipView. Функция drawTip', function () {
  let tipView: TipView,
      parent: JQuery;

  beforeEach(function () {
    setFixtures('<div class="slider"><div class="slider__runner"></div></div>');
    parent = $('.slider__runner');
    tipView = new TipView({
        orientation: 'horizontal'
    });
    tipView.drawTip(parent, 0);
  });

  it('Должна создавать элемент slider__tip внутри элемента slider__runner', function () {
    expect($('.slider .slider__runner .slider__tip')).toExist();
  });

  it('Добавляет класс slider__tip_vertical, если имеет вертикальный вид', function () {
      tipView = new TipView({
          orientation: 'vertical'
      });
    tipView.drawTip(parent, 0);
    expect($('.slider .slider__runner .slider__tip_vertical')).toExist();
  });

});

describe('TipView. Функция updateTip', function () {
    let tipView: TipView,
        parent: JQuery;

  beforeEach(function () {
    setFixtures('<div class="slider"><div class="slider__runner"></div></div>');
    parent = $('.slider__runner');
      tipView = new TipView({
          orientation: 'horizontal'
      });
    tipView.drawTip(parent, 0);
  });

  it('Должна обновлять значение внутри подсказки', function () {
    tipView.updateTip(15);
    expect($('.slider .slider__runner .slider__tip').text()).toEqual('15');
  });

});
