import Model from '../../plugin/Model/Model';

describe('Model', () => {
  let model: Model;

  beforeEach(() => {
    model = new Model({});
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

    model.normalizeConstructorOptions();

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

    expect(model.getMaxValue()).toEqual(100);
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

  describe('Метод initRangeValues', () => {
    it('Уведомляет подписчиков об установленных значениях', () => {
      model = new Model({
        type: 'interval',
      });

      const spy = spyOn(model.observableSubject, 'notifyObservers');
      model.initRangeValues();

      const options = {
        isEndValueChanging: false,
        isRangeBoundAtTheEndOfInterval: false,
        isRangeBoundAtTheStartOfInterval: false,
        isScaleInitialized: false,
        eventType: 'changevalue',
        value: 0,
        coefficient: Infinity,
      };

      expect(spy).toHaveBeenCalledWith(options);
    });
  });

  describe('Геттер getType', () => {
    it('Возвращает тип модели', () => {
      model = new Model({
        type: 'interval',
      });

      expect(model.getType()).toEqual('interval');
    });
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

  describe('Метод setBound', () => {
    it('Устанавливает значение той границы, ближе к которой оно находится', () => {
      model = new Model({
        startValue: 0,
        endValue: 100,
        minValue: 0,
        maxValue: 100,
        stepSize: 0,
        type: 'interval',
      });

      model.setBound(10);
      model.setBound(90);

      expect(model.getCurrentRoundedValue()).toEqual(10);
      expect(model.getCurrentRoundedEndValue()).toEqual(90);
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

  describe('Метод getOrientation', () => {
    it('Показывает ориентацию слайдера', () => {
      expect(model.getOrientation()).toEqual('horizontal');
    });
  });

  describe('Метод setVerticalOrientation', () => {
    it('Устанавливает вертикальную ориентацию слайдера', () => {
      model.setVerticalOrientation();

      expect(model.getOrientation()).toEqual('vertical');
    });
  });

  describe('Метод setHorizontalOrientation', () => {
    it('Устанавливает горизонтальную ориентацию слайдера', () => {
      model.setHorizontalOrientation();

      expect(model.getOrientation()).toEqual('horizontal');
    });
  });

  describe('Метод isTipShown', () => {
    it('Возвращает, показывается ли подсказка', () => {
      expect(model.isTipShown()).toEqual(true);
    });
  });

  describe('Метод hideTip', () => {
    it('Скрывает подсказку', () => {
      model.hideTip();
      expect(model.isTipShown()).toEqual(false);
    });
  });

  describe('Метод showTip', () => {
    it('Показывает подсказку', () => {
      model.showTip();
      expect(model.isTipShown()).toEqual(true);
    });
  });

  describe('Метод isScaleShown', () => {
    it('Возвращает, показывается ли шкала', () => {
      expect(model.isScaleShown()).toEqual(false);
    });
  });

  describe('Метод showScale', () => {
    it('Показывает шкалу', () => {
      model.showScale();
      expect(model.isScaleShown()).toEqual(true);
    });
  });

  describe('Метод hideScale', () => {
    it('Скрывает шкалу', () => {
      model.hideScale();
      expect(model.isScaleShown()).toEqual(false);
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
  });
});
