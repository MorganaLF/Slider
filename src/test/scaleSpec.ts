import ScaleView from '../plugin/scale/ScaleView';

describe('ScaleView', function() {
  let scaleView: ScaleView;

  beforeEach(function() {
    setFixtures('<div class="slider"></div>');
    scaleView = new ScaleView({
      parentWidth: 300,
      parentHeight: 300,
      orientation: 'horizontal',
      marksQuantity: 10,
    });
  });

  it('Создается экземпляр класса ScaleView', function() {
    expect(scaleView).toBeDefined();
  });

});

describe('ScaleView. Функция drawScale', function() {
  let scaleView: ScaleView,
    parent: JQuery;

  beforeEach(function() {
    setFixtures('<div class="slider"></div>');
    parent = $('.slider');
    scaleView = new ScaleView({
      parentWidth: 300,
      parentHeight: 300,
      orientation: 'horizontal',
      marksQuantity: 4,
    });
    scaleView.drawScale({ minValue: 5, maxValue: 25 });
  });

  it('Не создает вложенные элементы, если корневой элемент неопределен', function() {
    (<any>scaleView).el = null;
    expect((<any>scaleView)._drawScaleItem()).toEqual(false);
  });

  it('Создает элемент slider__scale внутри указанного родителя', function() {
    expect($('.slider .slider__scale')).toExist();
  });

  it('Поддерживает вертикальный вид', function() {
    scaleView = new ScaleView({
      parentWidth: 300,
      parentHeight: 300,
      orientation: 'vertical',
      marksQuantity: 4,
    });
    scaleView.drawScale({ minValue: 5, maxValue: 25 });
    expect($('.slider .slider__scale_vertical')).toExist();
  });

  it('Создает элементы slider__scale-item', function() {
    expect($('.slider .slider__scale .slider__scale-item')).toExist();
  });

  it('Количество элементов slider__scale-item можно установить', function() {
    expect($('.slider').eq(0).find('.slider__scale .slider__scale-item').length).toEqual(5);
  });

  it('Элемент slider__scale-item содержит корректное значение', function() {
    expect($('.slider .slider__scale .slider__scale-item').eq(0).text()).toEqual('5');
    expect($('.slider .slider__scale .slider__scale-item').eq(1).text()).toEqual('10');
    expect($('.slider .slider__scale .slider__scale-item').eq(2).text()).toEqual('15');
  });

});
