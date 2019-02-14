import $ from 'jquery';
import ScaleView from '../components/slider/scale/ScaleView';

describe('ScaleView', function () {
  let scaleView;

  beforeEach(function () {
    scaleView = new ScaleView();
  });

  it('Создается экземпляр класса ScaleView', function () {
    expect(scaleView).toBeDefined();
  });

});

describe('ScaleView. Функция drawScale', function () {
  let scaleView,
      parent;

  beforeEach(function () {
    setFixtures('<div class="slider"></div>');
    parent = $('.slider');

    scaleView = new ScaleView();
    scaleView.drawScale(parent, 5, 25, 4);
  });

  it('Создает элемент slider__scale внутри указанного родителя', function () {
    expect($('.slider .slider__scale')).toExist();
  });

  it('Поддерживает вертикальный вид', function () {
    scaleView.orientation = 'vertical';
    scaleView.drawScale(parent, 5, 25, 4);
    expect($('.slider .slider__scale_vertical')).toExist();
  });

  it('Создает элементы slider__scale-item', function () {
    expect($('.slider .slider__scale .slider__scale-item')).toExist();
  });

  it('Количество элементов slider__scale-item можно установить', function () {
    expect($('.slider').eq(0).find('.slider__scale .slider__scale-item').length).toEqual(5);
  });

  it('Элемент slider__scale-item содержит корректное значение', function () {
    expect($('.slider .slider__scale .slider__scale-item').eq(0).text()).toEqual('5');
    expect($('.slider .slider__scale .slider__scale-item').eq(1).text()).toEqual('10');
    expect($('.slider .slider__scale .slider__scale-item').eq(2).text()).toEqual('15');
  });

});