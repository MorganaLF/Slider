import SliderModel from '../plugin/SliderModel/SliderModel';

describe('SliderModel', () => {
  const $body: JQuery = $('body');
  let sliderModel: SliderModel;

  beforeEach(() => {
    sliderModel = new SliderModel({
      startValue: 0,
      endValue: 100,
      minValue: 0,
      maxValue: 100,
      stepSize: 0,
      type: 'single',
    });
  });

  it('Создает экземпляр класса', () => {
    expect(sliderModel).toBeDefined();
  });

  it('MinValue, MaxValue, StartValue, EndValue, stepSize может быть только числом', () => {
    sliderModel = new (<any>SliderModel)({
      minValue: 'dgsdg',
      maxValue: 'asf2',
      startValue: 'asgwet',
      endValue: 'safan',
      stepSize: 'sah',
      type: 'single',
    });

    expect(sliderModel.minValue).toEqual(0);
    expect(sliderModel.maxValue).toEqual(100);
    expect(sliderModel.startValue).toEqual(0);
    expect(sliderModel.endValue).toEqual(100);
    expect(sliderModel.stepSize).toEqual(0);
  });

  it('Минимальное значение не может быть меньше нуля', () => {
    sliderModel = new SliderModel({
      minValue: -10,
    });

    expect(sliderModel.minValue).toEqual(10);
  });

  it('Минимальное значение не может быть больше максимального', () => {
    sliderModel = new SliderModel({
      minValue: 150,
      maxValue: 100,
    });

    expect(sliderModel.minValue).toEqual(99);
  });

  it('Минимальное значение не может быть больше максимального, с учетом размера шага', () => {
    sliderModel = new SliderModel({
      minValue: 150,
      maxValue: 100,
      stepSize: 5,
    });

    expect(sliderModel.minValue).toEqual(95);
  });

  it('Максимальное значение не может быть меньше нуля', () => {
    sliderModel = new SliderModel({
      maxValue: -100,
    });

    expect(sliderModel.maxValue).toEqual(100);
  });

  it('Стартовое значение не меньше, чем минимальное значение', () => {
    sliderModel = new SliderModel({
      startValue: 5,
      minValue: 10,
    });

    expect(sliderModel.startValue).toEqual(10);
  });

  it('Стартовое значение не больше, чем максимальное значение', () => {
    sliderModel = new SliderModel({
      startValue: 105,
      maxValue: 100,
    });

    expect(sliderModel.startValue).toEqual(100);
  });

  it('Конечное значение не больше, чем максимальное значение', () => {
    sliderModel = new SliderModel({
      endValue: 105,
      maxValue: 100,
    });

    expect(sliderModel.endValue).toEqual(100);
  });

  it('Конечное значение не меньше, чем минимальное значение', () => {
    sliderModel = new SliderModel({
      endValue: 5,
      minValue: 10,
    });

    expect(sliderModel.endValue).toEqual(10);
  });

  it('Если установлен размер шага, минимальное и максимальное значение кратны этому шагу', () => {
    sliderModel = new SliderModel({
      minValue: 16,
      maxValue: 46,
      stepSize: 30,
    });

    expect(sliderModel.minValue).toEqual(30);
    expect(sliderModel.maxValue).toEqual(60);
  });

  it('Если установлен размер шага, начальное и конечное значение кратны этому шагу', () => {
    sliderModel = new SliderModel({
      startValue: 23,
      endValue: 48,
      stepSize: 25,
    });

    expect(sliderModel.startValue).toEqual(25);
    expect(sliderModel.endValue).toEqual(50);
  });

  describe('Метод initValues', () => {
    it('Уведомляет об установлении начального и конечного значений', () => {
      const spy = spyOn(sliderModel, '_dispatchValueChange');
      sliderModel.initValues();

      expect(spy).toHaveBeenCalledWith('setstartvalue', 0);
      expect(spy).toHaveBeenCalledWith('setendvalue', 100);
    });
  });

  describe('Геттер getCurrentRoundedValue', () => {
    it('Получает округленное текущее начальное значение', () => {
      sliderModel.startValue = 1.957;

      expect(sliderModel.getCurrentRoundedValue()).toEqual(2);
    });
  });

  describe('Геттер getCurrentRoundedEndValue', () => {
    it('Получает округленное текущее начальное значение', () => {
      sliderModel.endValue = 56.95627;

      expect(sliderModel.getCurrentRoundedEndValue()).toEqual(57);
    });
  });

  describe('Сеттер setCurrentValue', () => {
    it('Устанавливает начальное значение', () => {
      sliderModel.setCurrentValue(10);

      expect(sliderModel.startValue).toEqual(10);
    });

    it('Устанавливает только числовое значение', () => {
      sliderModel.setCurrentValue(<any>'dgsdA');

      expect(sliderModel.startValue).toEqual(0);
    });

    it('Не устанавливает значение, большее, чем конечное', () => {
      sliderModel.type = 'interval';
      sliderModel.endValue = 80;
      sliderModel.setCurrentValue(90);

      expect(sliderModel.startValue).toEqual(80);
    });

    it('Устанавливает значение не меньше, чем минимальное', () => {
      sliderModel = new SliderModel({
        minValue: 30,
      });

      sliderModel.setCurrentValue(10);

      expect(sliderModel.startValue).toEqual(30);
    });

    it('Если установлен размер шага, устанавливает кратное шагу значение', () => {
      sliderModel.stepSize = 20;
      sliderModel.setCurrentValue(19);

      expect(sliderModel.startValue).toEqual(20);
    });

    it('Генерирует событие', () => {
      spyOn(sliderModel, '_dispatchValueChange');
      spyOnEvent('body', 'changestartvalue');

      sliderModel.setCurrentValue(19);

      expect($body).toHandle('changestartvalue');
      expect((<any>sliderModel)._dispatchValueChange).toHaveBeenCalled();
    });
  });

  describe('Сеттер setCurrentEndValue', () => {
    beforeEach(() => {
      sliderModel = new SliderModel({
        startValue: 0,
        endValue: 100,
        minValue: 0,
        maxValue: 100,
        stepSize: 0,
        type: 'interval',
      });
    });

    it('Устанавливает конечное значение', () => {
      sliderModel.setCurrentEndValue(70);

      expect(sliderModel.endValue).toEqual(70);
    });

    it('Устанавливает только числовое значение', () => {
      sliderModel.setCurrentEndValue(<any>'dgsdA');

      expect(sliderModel.endValue).toEqual(100);
    });

    it('Не устанавливает значение, меньшее, чем начальное', () => {
      sliderModel.startValue = 10;
      sliderModel.setCurrentEndValue(5);

      expect(sliderModel.endValue).toEqual(10);
    });

    it('Устанавливает значение не меньше, чем минимальное', () => {
      sliderModel = new SliderModel({
        minValue: 30,
      });

      sliderModel.setCurrentEndValue(10);

      expect(sliderModel.startValue).toEqual(30);
    });

    it('Если установлен размер шага, устанавливает кратное шагу значение', () => {
      sliderModel.stepSize = 20;
      sliderModel.setCurrentEndValue(56);

      expect(sliderModel.endValue).toEqual(60);
    });

    it('Генерирует событие', () => {
      spyOn(sliderModel, '_dispatchValueChange');
      spyOnEvent('body', 'changeendvalue');

      sliderModel.setCurrentEndValue(49);

      expect($body).toHandle('changeendvalue');
      expect((<any>sliderModel)._dispatchValueChange).toHaveBeenCalled();
    });
  });

  describe('Метод setCurrentValueByRatio', () => {
    it('Считает текущее значение слайдера в зависимости от позиции курсора', () => {
      sliderModel.setCurrentValueByRatio(2, 'startValue');
      expect(sliderModel.startValue).toEqual(50);

      sliderModel.setCurrentValueByRatio(1, 'endValue');
      expect(sliderModel.endValue).toEqual(100);
    });

    it('Если установлен размер шага, устанавливается значение, кратное шагу', () => {
      sliderModel.stepSize = 40;
      sliderModel.setCurrentValueByRatio(2, 'startValue');

      expect(sliderModel.startValue).toEqual(40);
    });

    it('Не устанавливает максимальное значение, меньшее, чем минимальное', () => {
      sliderModel.type = 'interval';
      sliderModel.startValue = 90;
      sliderModel.setCurrentValueByRatio(2, 'endValue');

      expect(sliderModel.endValue).toEqual(90);
    });

    it('Не устанавливает минимальное значение, большее, чем максимальное', () => {
      sliderModel.type = 'interval';
      sliderModel.endValue = 30;
      sliderModel.setCurrentValueByRatio(2, 'startValue');

      expect(sliderModel.startValue).toEqual(30);
    });

    it('Позволяет посчитать текущее значение с учетом размера шага', () => {
      sliderModel.stepSize = 20;
      sliderModel.setCurrentValueByRatio(2, 'startValue');

      expect(sliderModel.startValue).toEqual(60);
    });

    it('Генерирует событие при изменении свойства startValue', () => {
      spyOnEvent('body', 'changestartvalue');
      spyOn(sliderModel, '_dispatchValueChange');

      sliderModel.setCurrentValueByRatio(2, 'startValue');

      expect($('body')).toHandle('changestartvalue');
      expect((<any>sliderModel)._dispatchValueChange).toHaveBeenCalled();
    });

    it('Генерирует событие при изменении свойства endValue', () => {
      sliderModel.type = 'interval';

      spyOnEvent('body', 'changeendvalue');
      spyOn(sliderModel, '_dispatchValueChange');

      sliderModel.setCurrentValueByRatio(2, 'endValue');

      expect($('body')).toHandle('changeendvalue');
      expect((<any>sliderModel)._dispatchValueChange).toHaveBeenCalled();
    });
  });
});
