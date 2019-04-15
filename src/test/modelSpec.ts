import SliderModel from '../plugin/SliderModel/SliderModel';

describe('SliderModel', function() {
  let sliderModel: SliderModel;

  beforeEach(function() {
    sliderModel = new SliderModel({
      startValue: 0,
      endValue: 100,
      minValue: 0,
      maxValue: 100,
      stepSize: 0,
      type: 'single',
    });
  });

  it('Создает экземпляр класса', function() {
    expect(sliderModel).toBeDefined();
  });

  it('MinVal, MaxVal, StartValue, EndValue, step может быть только числом', function() {
    sliderModel = new (<any>SliderModel)({
      minVal: 'dgsdg',
      maxVal: 'asf2',
      startValue: 'asgwet',
      endValue: 'safan',
      step: 'sah',
      type: 'single',
    });
    expect(sliderModel.minValue).toEqual(0);
    expect(sliderModel.maxValue).toEqual(100);
    expect(sliderModel.startValue).toEqual(0);
    expect(sliderModel.endValue).toEqual(100);
    expect(sliderModel.step).toEqual(0);
  });

  it('Минимальное значение не может быть меньше нуля', function() {
    sliderModel = new SliderModel({
      startValue: 0,
      endValue: 100,
      minValue: -10,
      maxValue: 100,
      stepSize: 0,
      type: 'single',
    });
    expect(sliderModel.minVal).toEqual(10);
  });

  it('Минимальное значение не может быть больше максимального', function() {
    sliderModel = new SliderModel({
      startValue: 0,
      endValue: 100,
      minValue: 150,
      maxValue: 100,
      stepSize: 0,
      type: 'single',
    });
    expect(sliderModel.minValue).toEqual(99);
  });

  it('Максимальное значение не может быть меньше нуля', function() {
    sliderModel = new SliderModel({
      startValue: 0,
      endValue: 100,
      minValue: 0,
      maxValue: -100,
      stepSize: 0,
      type: 'single',
    });
    expect(sliderModel.maxValue).toEqual(100);
  });

  it('Стартовое значение не меньше, чем минимальное значение', function() {
    sliderModel = new SliderModel({
      startValue: 5,
      endValue: 100,
      minValue: 10,
      maxValue: 100,
      stepSize: 0,
      type: 'single',
    });
    expect(sliderModel.startValue).toEqual(10);
  });

  it('Стартовое значение не больше, чем максимальное значение', function() {
    sliderModel = new SliderModel({
      startValue: 105,
      endValue: 100,
      minValue: 0,
      maxValue: 100,
      stepSize: 0,
      type: 'single',
    });
    expect(sliderModel.startValue).toEqual(100);
  });

  it('Конечное значение не больше, чем максимальное значение', function() {
    sliderModel = new SliderModel({
      startValue: 0,
      endValue: 105,
      minValue: 0,
      maxValue: 100,
      stepSize: 0,
      type: 'single',
    });
    expect(sliderModel.endValue).toEqual(100);
  });

  it('Конечное значение не меньше, чем минимальное значение', function() {
    sliderModel = new SliderModel({
      startValue: 0,
      endValue: 5,
      minValue: 10,
      maxValue: 100,
      stepSize: 0,
      type: 'single',
    });
    expect(sliderModel.endValue).toEqual(10);
  });

  it('Если установлен размер шага, минимальное и максимальное значение кратны этому шагу', function() {
    sliderModel = new SliderModel({
      startValue: 0,
      endValue: 100,
      minValue: 16,
      maxValue: 46,
      stepSize: 30,
      type: 'single',
    });
    expect(sliderModel.minValue).toEqual(30);
    expect(sliderModel.maxValue).toEqual(60);
  });

  it('Если установлен размер шага, начальное и конечное значение кратны этому шагу', function() {
    sliderModel = new SliderModel({
      startValue: 23,
      endValue: 48,
      minValue: 0,
      maxValue: 100,
      stepSize: 25,
      type: 'single',
    });
    expect(sliderModel.startValue).toEqual(25);
    expect(sliderModel.endValue).toEqual(50);
  });

});

describe('SliderModel. Геттер currentRoundValue', function() {
  let sliderModel: SliderModel;

  beforeEach(function() {
    sliderModel = new SliderModel({
      startValue: 0,
      endValue: 100,
      minValue: 0,
      maxValue: 100,
      stepSize: 0,
      type: 'single',
    });
  });

  it('Получает округленное текущее начальное значение', function() {
    sliderModel.startValue = 1.957;
    expect(sliderModel.getCurrentRoundedValue()).toEqual(2);
  });
});

describe('SliderModel. Геттер currentRoundEndValue', function() {
  let sliderModel: SliderModel;

  beforeEach(function() {
    sliderModel = new SliderModel({
      startValue: 0,
      endValue: 100,
      minValue: 0,
      maxValue: 100,
      stepSize: 0,
      type: 'single',
    });
  });

  it('Получает округленное текущее начальное значение', function() {
    sliderModel.endValue = 56.95627;
    expect(sliderModel.getCurrentRoundedEndValue()).toEqual(57);
  });
});

describe('SliderModel. Сеттер currentValue', function() {
  let sliderModel: SliderModel;

  beforeEach(function() {
    sliderModel = new SliderModel({
      startValue: 0,
      endValue: 100,
      minValue: 0,
      maxValue: 100,
      stepSize: 0,
      type: 'single',
    });
  });

  it('Устанавливает начальное значение', function() {
    sliderModel.setCurrentValue(10);
    expect(sliderModel.startValue).toEqual(10);
  });

  it('Устанавливает только числовое значение', function() {
    sliderModel.setCurrentValue(<any>'dgsdA');
    expect(sliderModel.startValue).toEqual(0);
  });

  it('Не устанавливает значение, большее, чем конечное', function() {
    sliderModel.type = 'interval';
    sliderModel.endValue = 80;
    sliderModel.setCurrentValue(90);
    expect(sliderModel.startValue).toEqual(80);
  });

  it('Устанавливает значение не меньше, чем минимальное', function() {
    sliderModel = new SliderModel({
      startValue: 0,
      endValue: 100,
      minValue: 30,
      maxValue: 100,
      stepSize: 0,
      type: 'single',
    });
    sliderModel.currentMaxValue = 10; /// ????
    expect(sliderModel.startValue).toEqual(30);
  });

  it('Если установлен размер шага, устанавливает кратное шагу значение', function() {
    sliderModel.stepSize = 20;
    sliderModel.setCurrentValue(19);
    expect(sliderModel.startValue).toEqual(20);
  });

  it('Генерирует событие', function() {
    spyOn(sliderModel, '_dispatchChangeValue');
    spyOnEvent('body', 'changestartvalue');
    sliderModel.setCurrentValue(19);
    expect($('body')).toHandle('changestartvalue');
    // expect(sliderModel._dispatchChangeValue).toHaveBeenCalled();
  });
});

describe('SliderModel. Сеттер currentMaxValue', function() {
  let sliderModel: SliderModel;

  beforeEach(function() {
    sliderModel = new SliderModel({
      startValue: 0,
      endValue: 100,
      minValue: 0,
      maxValue: 100,
      stepSize: 0,
      type: 'interval',
    });
  });

  it('Устанавливает конечное значение', function() {
    sliderModel.setCurrentEndValue(70);
    expect(sliderModel.endValue).toEqual(70);
  });

  it('Устанавливает только числовое значение', function() {
    sliderModel.setCurrentEndValue(<any>'dgsdA');
    expect(sliderModel.endValue).toEqual(100);
  });

  it('Не устанавливает значение, меньшее, чем начальное', function() {
    sliderModel.startValue = 10;
    sliderModel.setCurrentEndValue(5);
    expect(sliderModel.endValue).toEqual(10);
  });

  it('Устанавливает значение не меньше, чем минимальное', function() {
    sliderModel = new SliderModel({
      startValue: 0,
      endValue: 100,
      minValue: 30,
      maxValue: 100,
      stepSize: 0,
      type: 'single',
    });
    sliderModel.setCurrentEndValue(10);
    expect(sliderModel.startValue).toEqual(30);
  });

  it('Если установлен размер шага, устанавливает кратное шагу значение', function() {
    sliderModel.stepSize = 20;
    sliderModel.setCurrentEndValue(56);
    expect(sliderModel.endValue).toEqual(60);
  });

  it('Генерирует событие', function() {
    spyOnEvent('body', 'changeendvalue');
    sliderModel.setCurrentEndValue(49);
    expect($('body')).toHandle('changeendvalue');
  });
});

describe('SliderModel. Метод setCurrentValueByRatio', function() {
  let sliderModel: SliderModel;

  beforeEach(function() {
    sliderModel = new SliderModel({
      startValue: 0,
      endValue: 100,
      minValue: 0,
      maxValue: 100,
      stepSize: 0,
      type: 'single',
    });
  });

  it('Считает текущее значение слайдера в зависимости от позиции курсора', function() {
    sliderModel.setCurrentValueByRatio(2, 'startValue');
    expect(sliderModel.startValue).toEqual(50);

    sliderModel.setCurrentValueByRatio(1, 'endValue');
    expect(sliderModel.endValue).toEqual(100);
  });

  it('Если установлен размер шага, устанавливается значение, кратное шагу', function() {
    sliderModel.stepSize = 40;
    sliderModel.setCurrentValueByRatio(2, 'startValue');
    expect(sliderModel.startValue).toEqual(40);
  });

  it('Не устанавливает максимальное значение, меньшее, чем минимальное', function() {
    sliderModel.type = 'interval';
    sliderModel.startValue = 90;
    sliderModel.setCurrentValueByRatio(2, 'endValue');
    expect(sliderModel.endValue).toEqual(90);
  });

  it('Не устанавливает минимальное значение, большее, чем максимальное', function() {
    sliderModel.type = 'interval';
    sliderModel.endValue = 30;
    sliderModel.setCurrentValueByRatio(2, 'startValue');
    expect(sliderModel.startValue).toEqual(30);
  });

  it('Генерирует событие при изменении свойства startValue', function() {
    spyOnEvent('body', 'changestartvalue');
    sliderModel.setCurrentValueByRatio(2, 'startValue');
    expect($('body')).toHandle('changestartvalue');
  });

  it('Генерирует событие при изменении свойства endValue', function() {
    sliderModel.type = 'interval';
    spyOnEvent('body', 'changeendvalue');
    sliderModel.setCurrentValueByRatio(2, 'endValue');
    expect($('body')).toHandle('changeendvalue');
  });

  it('Позволяет посчитать текущее значение с учетом размера шага', function() {
    sliderModel.stepSize = 20;
    sliderModel.setCurrentValueByRatio(2, 'startValue');
    expect(sliderModel.startValue).toEqual(60);
  });

});
