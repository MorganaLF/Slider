import TipView from '../plugin/tip/TipView';

describe('TipView', function() {
  let tipView: TipView;

  beforeEach(function() {
    setFixtures('<div class="slider"><div class="slider__runner"></div></div>');
    const $parent = $('.slider__runner');

    tipView = new TipView({
      $parent,
      orientation: 'horizontal',
    });
  });

  it('Создается экземпляр класса RunnerView', function() {
    expect(tipView).toBeDefined();
  });

});

describe('TipView. Функция drawTip', function() {
  let tipView: TipView,
    $parent: JQuery;

  beforeEach(function() {
    setFixtures('<div class="slider"><div class="slider__runner"></div></div>');
    $parent = $('.slider__runner');
    tipView = new TipView({
      $parent,
      orientation: 'horizontal',
    });
    tipView.drawTip();
  });

  it('Должна создавать элемент slider__tip внутри элемента slider__runner', function() {
    expect($('.slider .slider__runner .slider__tip')).toExist();
  });

  it('Добавляет класс slider__tip_vertical, если имеет вертикальный вид', function() {
    tipView = new TipView({
      $parent,
      orientation: 'vertical',
    });
    tipView.drawTip();
    expect($('.slider .slider__runner .slider__tip_vertical')).toExist();
  });

});

describe('TipView. Функция updateTip', function() {
  let tipView: TipView,
    $parent: JQuery;

  beforeEach(function() {
    setFixtures('<div class="slider"><div class="slider__runner"></div></div>');
    $parent = $('.slider__runner');
    tipView = new TipView({
      $parent,
      orientation: 'horizontal',
    });
    tipView.drawTip();
  });

  it('Должна обновлять значение внутри подсказки', function() {
    tipView.updateTip(15);
    expect($('.slider .slider__runner .slider__tip').text()).toEqual('15');
  });

});
