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

    expect(model.getMinValue()).toEqual(0);
    expect(model.getMaxValue()).toEqual(100);
    expect(model.getCurrentRoundedValue()).toEqual(0);
    expect(model.getCurrentRoundedEndValue()).toEqual(100);
    expect(model.getStepSize()).toEqual(0);
  });

  it('Минимальное значение не может быть меньше нуля', () => {
    model = new Model({
      minValue: -10,
    });

    expect(model.getMinValue()).toEqual(10);
  });

  it('Минимальное значение не может быть больше максимального', () => {
    model = new Model({
      minValue: 150,
      maxValue: 100,
    });

    expect(model.getMinValue()).toEqual(99);
  });

  it('Минимальное значение не может быть больше максимального, с учетом размера шага', () => {
    model = new Model({
      minValue: 150,
      maxValue: 100,
      stepSize: 5,
    });

    expect(model.getMinValue()).toEqual(95);
  });

  it('Максимальное значение не может быть меньше нуля', () => {
    model = new Model({
      maxValue: -100,
    });

    expect(model.getMaxValue()).toEqual(100);
  });

  it('Стартовое значение не меньше, чем минимальное значение', () => {
    model = new Model({
      startValue: 5,
      minValue: 10,
    });

    expect(model.getCurrentRoundedValue()).toEqual(10);
  });

  it('Стартовое значение не больше, чем максимальное значение', () => {
    model = new Model({
      startValue: 105,
      maxValue: 100,
    });

    expect(model.getCurrentRoundedValue()).toEqual(100);
  });

  it('Конечное значение не больше, чем максимальное значение', () => {
    model = new Model({
      endValue: 105,
      maxValue: 100,
    });

    expect(model.getCurrentRoundedEndValue()).toEqual(100);
  });

  it('Конечное значение не меньше, чем минимальное значение', () => {
    model = new Model({
      endValue: 5,
      minValue: 10,
    });

    expect(model.getMaxValue()).toEqual(10);
  });

  it('Если установлен размер шага, минимальное и максимальное значение кратны этому шагу', () => {
    model = new Model({
      minValue: 16,
      maxValue: 46,
      stepSize: 30,
    });

    expect(model.getMinValue()).toEqual(30);
    expect(model.getMaxValue()).toEqual(60);
  });

  it('Если установлен размер шага, начальное и конечное значение кратны этому шагу', () => {
    model = new Model({
      startValue: 23,
      endValue: 48,
      stepSize: 25,
    });

    expect(model.getCurrentRoundedValue()).toEqual(25);
    expect(model.getCurrentRoundedEndValue()).toEqual(50);
  });

  describe('Геттер getCurrentRoundedValue', () => {
    it('Получает округленное текущее начальное значение', () => {
      model.setMinValue(1.957);

      expect(model.getCurrentRoundedValue()).toEqual(2);
    });
  });

  describe('Геттер getCurrentRoundedEndValue', () => {
    it('Получает округленное текущее начальное значение', () => {
      model.setMaxValue(56.95627);

      expect(model.getCurrentRoundedEndValue()).toEqual(57);
    });
  });

  describe('Сеттер setCurrentValue', () => {
    it('Устанавливает начальное значение', () => {
      model.setCurrentValue(10);

      expect(model.getCurrentRoundedValue()).toEqual(10);
    });

    it('Устанавливает только числовое значение', () => {
      model.setCurrentValue(<any>'dgsdA');

      expect(model.getCurrentRoundedValue()).toEqual(0);
    });

    it('Не устанавливает значение, большее, чем конечное', () => {
      (<any>model).type = 'interval';
      model.setCurrentEndValue(80);
      model.setCurrentValue(90);

      expect(model.getCurrentRoundedValue()).toEqual(80);
    });

    it('Устанавливает значение не меньше, чем минимальное', () => {
      model = new Model({
        minValue: 30,
      });

      model.setCurrentValue(10);

      expect(model.getCurrentRoundedValue()).toEqual(30);
    });

    it('Если установлен размер шага, устанавливает кратное шагу значение', () => {
      model.setStepSize(20);
      model.setCurrentValue(19);

      expect(model.getCurrentRoundedValue()).toEqual(20);
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

      expect(model.getCurrentRoundedEndValue()).toEqual(70);
    });

    it('Устанавливает только числовое значение', () => {
      model.setCurrentEndValue(<any>'dgsdA');

      expect(model.getCurrentRoundedEndValue()).toEqual(100);
    });

    it('Не устанавливает значение, меньшее, чем начальное', () => {
      model.setCurrentValue(10);
      model.setCurrentEndValue(5);

      expect(model.getCurrentRoundedEndValue()).toEqual(10);
    });

    it('Устанавливает значение не меньше, чем минимальное', () => {
      model = new Model({
        minValue: 30,
      });

      model.setCurrentEndValue(10);

      expect(model.getCurrentRoundedValue()).toEqual(30);
    });

    it('Если установлен размер шага, устанавливает кратное шагу значение', () => {
      model.setStepSize(20);
      model.setCurrentEndValue(56);

      expect(model.getCurrentRoundedEndValue()).toEqual(60);
    });
  });

  describe('Метод setCurrentValueByRatio', () => {
    it('Считает текущее значение слайдера в зависимости от позиции курсора', () => {
      model.setRangeBoundByRatio(2, 'startValue');
      expect(model.getCurrentRoundedValue()).toEqual(50);

      model.setRangeBoundByRatio(1, 'endValue');
      expect(model.getCurrentRoundedEndValue()).toEqual(100);
    });

    it('Если установлен размер шага, устанавливается значение, кратное шагу', () => {
      model.setStepSize(40);
      model.setRangeBoundByRatio(2, 'startValue');

      expect(model.getCurrentRoundedValue()).toEqual(40);
    });

    it('Не устанавливает максимальное значение, меньшее, чем минимальное', () => {
      (<any>model).type = 'interval';
      model.setCurrentValue(90);
      model.setRangeBoundByRatio(2, 'endValue');

      expect(model.getCurrentRoundedEndValue()).toEqual(90);
    });

    it('Не устанавливает минимальное значение, большее, чем максимальное', () => {
      (<any>model).type = 'interval';
      model.setCurrentEndValue(30);
      model.setRangeBoundByRatio(2, 'startValue');

      expect(model.getCurrentRoundedValue()).toEqual(30);
    });

    it('Позволяет посчитать текущее значение с учетом размера шага', () => {
      model.setStepSize(20);
      model.setRangeBoundByRatio(2, 'startValue');

      expect(model.getCurrentRoundedValue()).toEqual(60);
    });
  });
});
