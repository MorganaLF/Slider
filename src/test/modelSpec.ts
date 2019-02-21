import SliderModel from '../components/slider/model';
//import $ from "jquery";
import $ = require('jquery');
// import '../../node_modules/@types/jasmine';
// import '../../node_modules/@types/jasmine-jquery';
// import '../../node_modules/@types/jquery';

describe('SliderModel', function () {
  let sliderModel: SliderModel;

  beforeEach(function() {
    sliderModel = new SliderModel({
        startValue: 0,
        endValue: 100,
        minVal: 0,
        maxVal: 100,
        step: 0,
        type: 'single'
    });
  });

  it('Создает экземпляр класса', function () {
    expect(sliderModel).toBeDefined();
  });

  it('MinVal, MaxVal, StartValue, EndValue, step может быть только числом', function () {
    sliderModel = new (<any>SliderModel)({
      minVal: 'dgsdg',
      maxVal: 'asf2',
      startValue: 'asgwet',
      endValue: 'safan',
      step: 'sah',
      type: 'single'
    });
    expect(sliderModel.minVal).toEqual(0);
    expect(sliderModel.maxVal).toEqual(0);
    expect(sliderModel.startValue).toEqual(0);
    expect(sliderModel.endValue).toEqual(0);
    expect(sliderModel.step).toEqual(0);
  });

  it('Минимальное значение не может быть меньше нуля', function () {
    sliderModel = new SliderModel({
        startValue: 0,
        endValue: 100,
        minVal: -10,
        maxVal: 100,
        step: 0,
        type: 'single'
    });
    expect(sliderModel.minVal).toEqual(10);
  });

  it('Максимальное значение не может быть меньше нуля', function () {
    sliderModel = new SliderModel({
        startValue: 0,
        endValue: 100,
        minVal: 0,
        maxVal: -100,
        step: 0,
        type: 'single'
    });
    expect(sliderModel.maxVal).toEqual(100);
  });

  it('Стартовое значение не меньше, чем минимальное значение', function () {
    sliderModel = new SliderModel({
        startValue: 5,
        endValue: 100,
        minVal: 10,
        maxVal: 100,
        step: 0,
        type: 'single'
    });
    expect(sliderModel.startValue).toEqual(10);
  });

  it('Стартовое значение не больше, чем максимальное значение', function () {
    sliderModel = new SliderModel({
        startValue: 105,
        endValue: 100,
        minVal: 0,
        maxVal: 100,
        step: 0,
        type: 'single'
    });
    expect(sliderModel.startValue).toEqual(100);
  });

  it('Конечное значение не больше, чем максимальное значение', function () {
    sliderModel = new SliderModel({
        startValue: 0,
        endValue: 105,
        minVal: 0,
        maxVal: 100,
        step: 0,
        type: 'single'
    });
    expect(sliderModel.endValue).toEqual(100);
  });

  it('Конечное значение не меньше, чем минимальное значение', function () {
    sliderModel = new SliderModel({
        startValue: 0,
        endValue: 5,
        minVal: 10,
        maxVal: 100,
        step: 0,
        type: 'single'
    });
    expect(sliderModel.endValue).toEqual(10);
  });

  it('Если установлен размер шага, минимальное и максимальное значение кратны этому шагу', function () {
    sliderModel = new SliderModel({
        startValue: 0,
        endValue: 100,
        minVal: 16,
        maxVal: 46,
        step: 30,
        type: 'single'
    });
    expect(sliderModel.minVal).toEqual(30);
    expect(sliderModel.maxVal).toEqual(60);
  });

  it('Если установлен размер шага, начальное и конечное значение кратны этому шагу', function () {
    sliderModel = new SliderModel({
        startValue: 23,
        endValue: 48,
        minVal: 0,
        maxVal: 100,
        step: 25,
        type: 'single'
    });
    expect(sliderModel.startValue).toEqual(25);
    expect(sliderModel.endValue).toEqual(50);
  });

});

describe('SliderModel. Геттер currentRoundValue', function () {
  let sliderModel: SliderModel;

  beforeEach(function() {
    sliderModel = new SliderModel({
        startValue: 0,
        endValue: 100,
        minVal: 0,
        maxVal: 100,
        step: 0,
        type: 'single'
    });
  });

  it('Получает округленное текущее начальное значение', function () {
    sliderModel.startValue = 1.957;
    expect(sliderModel.currentRoundValue).toEqual(2);
  });
});

describe('SliderModel. Геттер currentRoundEndValue', function () {
  let sliderModel: SliderModel;

  beforeEach(function() {
    sliderModel = new SliderModel({
        startValue: 0,
        endValue: 100,
        minVal: 0,
        maxVal: 100,
        step: 0,
        type: 'single'
    });
  });

  it('Получает округленное текущее начальное значение', function () {
    sliderModel.endValue = 56.95627;
    expect(sliderModel.currentRoundEndValue).toEqual(57);
  });
});

describe('SliderModel. Сеттер currentValue', function () {
  let sliderModel: SliderModel;

  beforeEach(function() {
    sliderModel = new SliderModel({
        startValue: 0,
        endValue: 100,
        minVal: 0,
        maxVal: 100,
        step: 0,
        type: 'single'
    });
  });

  it('Устанавливает начальное значение', function () {
    sliderModel.currentValue = 10;
    expect(sliderModel.startValue).toEqual(10);
  });

  it('Устанавливает только числовое значение', function () {
    (<any>sliderModel.currentValue) = 'dgsdA';
    expect(sliderModel.startValue).toEqual(0);
  });

  it('Не устанавливает значение, большее, чем конечное', function () {
    sliderModel.type = 'interval';
    sliderModel.endValue = 80;
    sliderModel.currentValue = 90;
    expect(sliderModel.startValue).toEqual(80);
  });

  it('Устанавливает значение не меньше, чем минимальное', function () {
    sliderModel = new SliderModel({
        startValue: 0,
        endValue: 100,
        minVal: 30,
        maxVal: 100,
        step: 0,
        type: 'single'
    });
    sliderModel.currentMaxValue = 10;
    expect(sliderModel.startValue).toEqual(30);
  });

  it('Если установлен размер шага, устанавливает кратное шагу значение', function () {
    sliderModel.step = 20;
    sliderModel.currentValue = 19;
    expect(sliderModel.startValue).toEqual(20);
  });

  it('Генерирует событие', function () {
    spyOn(sliderModel, '_dispatchChangeValue');
    spyOnEvent('body', 'changestartvalue');
    sliderModel.currentValue = 19;
    expect($('body')).toHandle("changestartvalue");
    //expect(sliderModel._dispatchChangeValue).toHaveBeenCalled();
  });
});

describe('SliderModel. Сеттер currentMaxValue', function () {
  let sliderModel: SliderModel;

  beforeEach(function() {
    sliderModel = new SliderModel({
        startValue: 0,
        endValue: 100,
        minVal: 0,
        maxVal: 100,
        step: 0,
        type: 'interval'
    });
  });

  it('Устанавливает конечное значение', function () {
    sliderModel.currentMaxValue = 70;
    expect(sliderModel.endValue).toEqual(70);
  });

  it('Устанавливает только числовое значение', function () {
    (<any>sliderModel.currentMaxValue) = 'dgsdA';
    expect(sliderModel.endValue).toEqual(0);
  });

  it('Не устанавливает значение, меньшее, чем начальное', function () {
    sliderModel.startValue = 10;
    sliderModel.currentMaxValue = 5;
    expect(sliderModel.endValue).toEqual(10);
  });

  it('Устанавливает значение не меньше, чем минимальное', function () {
    sliderModel = new SliderModel({
        startValue: 0,
        endValue: 100,
        minVal: 30,
        maxVal: 100,
        step: 0,
        type: 'single'
    });
    sliderModel.currentMaxValue = 10;
    expect(sliderModel.startValue).toEqual(30);
  });

  it('Если установлен размер шага, устанавливает кратное шагу значение', function () {
    sliderModel.step = 20;
    sliderModel.currentMaxValue = 56;
    expect(sliderModel.endValue).toEqual(60);
  });

  it('Генерирует событие', function () {
    spyOnEvent('body', 'changeendvalue');
    sliderModel.currentMaxValue = 49;
    expect($('body')).toHandle("changeendvalue");
  });
});

describe('SliderModel. Метод calculateValue', function () {
  let sliderModel: SliderModel;

  beforeEach(function() {
    sliderModel = new SliderModel({
        startValue: 0,
        endValue: 100,
        minVal: 0,
        maxVal: 100,
        step: 0,
        type: 'single'
    });
  });

  it('Считает текущее значение слайдера в зависимости от позиции курсора', function () {
    sliderModel.calculateValue(2, 'startValue');
    expect(sliderModel.startValue).toEqual(50);

    sliderModel.calculateValue(1, 'endValue');
    expect(sliderModel.endValue).toEqual(100);
  });

  it('Если установлен размер шага, устанавливается значение, кратное шагу', function () {
    sliderModel.step = 40;
    sliderModel.calculateValue(2, 'startValue');
    expect(sliderModel.startValue).toEqual(40);
  });

  it('Не устанавливает максимальное значение, меньшее, чем минимальное', function () {
    sliderModel.type = 'interval';
    sliderModel.startValue = 90;
    sliderModel.calculateValue(2, 'endValue');
    expect(sliderModel.endValue).toEqual(90);
  });

  it('Не устанавливает минимальное значение, большее, чем максимальное', function () {
    sliderModel.type = 'interval';
    sliderModel.endValue = 30;
    sliderModel.calculateValue(2, 'startValue');
    expect(sliderModel.startValue).toEqual(30);
  });

  it('Генерирует событие при изменении свойства startValue', function () {
    spyOnEvent('body', 'changestartvalue');
    sliderModel.calculateValue(2, 'startValue');
    expect($('body')).toHandle("changestartvalue");
  });

  it('Генерирует событие при изменении свойства endValue', function () {
    sliderModel.type = 'interval';
    spyOnEvent('body', 'changeendvalue');
    sliderModel.calculateValue(2, 'endValue');
    expect($('body')).toHandle("changeendvalue");
  });

  it('Позволяет посчитать текущее значение с учетом размера шага', function () {
    sliderModel.step = 20;
    sliderModel.calculateValue(2, 'startValue');
    expect(sliderModel.startValue).toEqual(60);
  });

});
