import Model from '../plugin/Model/Model';

describe('Model', () => {
  const $body: JQuery = $('body');
  let model: Model;

  beforeEach(() => {
    model = new Model({
      startValue: 0,
      endValue: 100,
      minValue: 0,
      maxValue: 100,
      stepSize: 0,
      type: 'single',
    });
  });

  it('Создает экземпляр класса', () => {
    expect(model).toBeDefined();
  });

  it('MinValue, MaxValue, StartValue, EndValue, stepSize может быть только числом', () => {
    model = new (<any>Model)({
      minValue: 'dgsdg',
      maxValue: 'asf2',
      startValue: 'asgwet',
      endValue: 'safan',
      stepSize: 'sah',
      type: 'single',
    });

    expect(model.minValue).toEqual(0);
    expect(model.maxValue).toEqual(100);
    expect(model.startValue).toEqual(0);
    expect(model.endValue).toEqual(100);
    expect(model.stepSize).toEqual(0);
  });

  it('Минимальное значение не может быть меньше нуля', () => {
    model = new Model({
      minValue: -10,
    });

    expect(model.minValue).toEqual(10);
  });

  it('Минимальное значение не может быть больше максимального', () => {
    model = new Model({
      minValue: 150,
      maxValue: 100,
    });

    expect(model.minValue).toEqual(99);
  });

  it('Минимальное значение не может быть больше максимального, с учетом размера шага', () => {
    model = new Model({
      minValue: 150,
      maxValue: 100,
      stepSize: 5,
    });

    expect(model.minValue).toEqual(95);
  });

  it('Максимальное значение не может быть меньше нуля', () => {
    model = new Model({
      maxValue: -100,
    });

    expect(model.maxValue).toEqual(100);
  });

  it('Стартовое значение не меньше, чем минимальное значение', () => {
    model = new Model({
      startValue: 5,
      minValue: 10,
    });

    expect(model.startValue).toEqual(10);
  });

  it('Стартовое значение не больше, чем максимальное значение', () => {
    model = new Model({
      startValue: 105,
      maxValue: 100,
    });

    expect(model.startValue).toEqual(100);
  });

  it('Конечное значение не больше, чем максимальное значение', () => {
    model = new Model({
      endValue: 105,
      maxValue: 100,
    });

    expect(model.endValue).toEqual(100);
  });

  it('Конечное значение не меньше, чем минимальное значение', () => {
    model = new Model({
      endValue: 5,
      minValue: 10,
    });

    expect(model.endValue).toEqual(10);
  });

  it('Если установлен размер шага, минимальное и максимальное значение кратны этому шагу', () => {
    model = new Model({
      minValue: 16,
      maxValue: 46,
      stepSize: 30,
    });

    expect(model.minValue).toEqual(30);
    expect(model.maxValue).toEqual(60);
  });

  it('Если установлен размер шага, начальное и конечное значение кратны этому шагу', () => {
    model = new Model({
      startValue: 23,
      endValue: 48,
      stepSize: 25,
    });

    expect(model.startValue).toEqual(25);
    expect(model.endValue).toEqual(50);
  });

  describe('Геттер getCurrentRoundedValue', () => {
    it('Получает округленное текущее начальное значение', () => {
      model.startValue = 1.957;

      expect(model.getCurrentRoundedValue()).toEqual(2);
    });
  });

  describe('Геттер getCurrentRoundedEndValue', () => {
    it('Получает округленное текущее начальное значение', () => {
      model.endValue = 56.95627;

      expect(model.getCurrentRoundedEndValue()).toEqual(57);
    });
  });

  describe('Сеттер setCurrentValue', () => {
    it('Устанавливает начальное значение', () => {
      model.setCurrentValue(10);

      expect(model.startValue).toEqual(10);
    });

    it('Устанавливает только числовое значение', () => {
      model.setCurrentValue(<any>'dgsdA');

      expect(model.startValue).toEqual(0);
    });

    it('Не устанавливает значение, большее, чем конечное', () => {
      model.type = 'interval';
      model.endValue = 80;
      model.setCurrentValue(90);

      expect(model.startValue).toEqual(80);
    });

    it('Устанавливает значение не меньше, чем минимальное', () => {
      model = new Model({
        minValue: 30,
      });

      model.setCurrentValue(10);

      expect(model.startValue).toEqual(30);
    });

    it('Если установлен размер шага, устанавливает кратное шагу значение', () => {
      model.stepSize = 20;
      model.setCurrentValue(19);

      expect(model.startValue).toEqual(20);
    });
  });

  describe('Сеттер setCurrentEndValue', () => {
    beforeEach(() => {
      model = new Model({
        startValue: 0,
        endValue: 100,
        minValue: 0,
        maxValue: 100,
        stepSize: 0,
        type: 'interval',
      });
    });

    it('Устанавливает конечное значение', () => {
      model.setCurrentEndValue(70);

      expect(model.endValue).toEqual(70);
    });

    it('Устанавливает только числовое значение', () => {
      model.setCurrentEndValue(<any>'dgsdA');

      expect(model.endValue).toEqual(100);
    });

    it('Не устанавливает значение, меньшее, чем начальное', () => {
      model.startValue = 10;
      model.setCurrentEndValue(5);

      expect(model.endValue).toEqual(10);
    });

    it('Устанавливает значение не меньше, чем минимальное', () => {
      model = new Model({
        minValue: 30,
      });

      model.setCurrentEndValue(10);

      expect(model.startValue).toEqual(30);
    });

    it('Если установлен размер шага, устанавливает кратное шагу значение', () => {
      model.stepSize = 20;
      model.setCurrentEndValue(56);

      expect(model.endValue).toEqual(60);
    });
  });

  describe('Метод setCurrentValueByRatio', () => {
    it('Считает текущее значение слайдера в зависимости от позиции курсора', () => {
      model.setCurrentValueByRatio(2, 'startValue');
      expect(model.startValue).toEqual(50);

      model.setCurrentValueByRatio(1, 'endValue');
      expect(model.endValue).toEqual(100);
    });

    it('Если установлен размер шага, устанавливается значение, кратное шагу', () => {
      model.stepSize = 40;
      model.setCurrentValueByRatio(2, 'startValue');

      expect(model.startValue).toEqual(40);
    });

    it('Не устанавливает максимальное значение, меньшее, чем минимальное', () => {
      model.type = 'interval';
      model.startValue = 90;
      model.setCurrentValueByRatio(2, 'endValue');

      expect(model.endValue).toEqual(90);
    });

    it('Не устанавливает минимальное значение, большее, чем максимальное', () => {
      model.type = 'interval';
      model.endValue = 30;
      model.setCurrentValueByRatio(2, 'startValue');

      expect(model.startValue).toEqual(30);
    });

    it('Позволяет посчитать текущее значение с учетом размера шага', () => {
      model.stepSize = 20;
      model.setCurrentValueByRatio(2, 'startValue');

      expect(model.startValue).toEqual(60);
    });
  });
});
