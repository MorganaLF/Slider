import App from '../plugin/App/App';
import { IApp } from '../plugin/App/AppInterfaces';
import Model from '../plugin/Model/Model';
import Controller from '../plugin/Controller/Controller';
import View from '../plugin/views/View/View';

describe('App', () => {
  let app: IApp;
  let $element: JQuery;

  beforeEach(() => {
    setFixtures('<div class="slider"></div>');
    $element = $('.slider');
    app = new App({ $element });
    app.init();
  });

  it('Создает экземпляр класса App', () => {
    expect(app).toBeDefined();
  });

  describe('Метод init', () => {
    it('Создает экземпляр класса Model', () => {
      expect(app.model instanceof Model).toBeTruthy();
    });

    it('Создает экземпляр класса View', () => {
      expect(app.view instanceof View).toBeTruthy();
    });

    it('Обновляет вид', () => {
      expect(app.view!.startValueRunner).toBeDefined();
      expect(app.view!.track).toBeDefined();
    });

    it('Создает экземпляр класса Controller', () => {
      expect(app.controller instanceof Controller).toBeTruthy();
    });
  });

  describe('Метод getCurrentValue', () => {
    it('Возвращает округленное значение startValue модели', () => {
      app.model!.startValue = 30.154;
      expect(app.getCurrentValue()).toEqual(30);
    });

    it('Возвращает 0, если модель не определена', () => {
      app.model = null;
      expect(app.getCurrentValue()).toEqual(0);
    });
  });

  describe('Метод getCurrentEndValue', () => {
    it('Возвращает округленное значение endValue модели', () => {
      app.model!.endValue = 70.954;
      expect(app.getCurrentEndValue()).toEqual(71);
    });

    it('Возвращает 0, если модель не определена', () => {
      app.model = null;
      expect(app.getCurrentEndValue()).toEqual(0);
    });
  });

  describe('Метод getMinValue', () => {
    it('Возвращает значение minVal модели', () => {
      app.model!.minValue = 10;
      expect(app.getMinValue()).toEqual(10);
    });

    it('Возвращает 0, если модель не определена', () => {
      app.model = null;
      expect(app.getMinValue()).toEqual(0);
    });
  });

  describe('Метод getMaxValue', () => {
    it('Возвращает значение maxValue модели', () => {
      app.model!.maxValue = 80;
      expect(app.getMaxValue()).toEqual(80);
    });

    it('Возвращает 0, если модель не определена', () => {
      app.model = null;
      expect(app.getMaxValue()).toEqual(0);
    });
  });

  describe('Метод getStepSize', () => {
    it('Возвращает значение stepSize модели', () => {
      app.model!.stepSize = 15;
      expect(app.getStepSize()).toEqual(15);
    });

    it('Возвращает 0, если модель не определена', () => {
      app.model = null;
      expect(app.getStepSize()).toEqual(0);
    });
  });

  describe('Метод setMinValue', () => {
    it('Устанавливает значение minValue модели', () => {
      app.setMinValue(5);
      expect(app.model!.minValue).toEqual(5);
    });

    it('Заменяет строку на число', () => {
      app.setMinValue('15');
      expect(app.model!.minValue).toEqual(15);
    });

    it('Инициализирует плагин заново', () => {
      const spy = spyOn(app, 'init');
      app.setMinValue(5);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Метод setMaxValue', () => {
    it('Устанавливает значение maxValue модели', () => {
      app.setMaxValue(75);
      expect(app.model!.maxValue).toEqual(75);
    });

    it('Заменяет строку на число', () => {
      app.setMaxValue('65');
      expect(app.model!.maxValue).toEqual(65);
    });

    it('Инициализирует плагин заново', () => {
      const spy = spyOn(app, 'init');
      app.setMaxValue(95);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Метод setCurrentValue', () => {
    it('Устанавливает значение startValue модели', () => {
      app.setCurrentValue(20);
      expect(app.model!.startValue).toEqual(20);
    });

    it('Если модель не определена, возвращает false', () => {
      app.model = null;
      expect(app.setCurrentValue(20)).toEqual(false);
    });
  });

  describe('Метод setCurrentEndValue', () => {
    it('Устанавливает значение endValue модели', () => {
      app.model!.type = 'interval';
      app.setCurrentEndValue(60);
      expect(app.model!.endValue).toEqual(60);
    });

    it('Если модель не определена, возвращает false', () => {
      app.model = null;
      expect(app.setCurrentEndValue(60)).toEqual(false);
    });
  });

  describe('Метод setStepSize', () => {
    it('Устанавливает значение stepSize модели', () => {
      app.setStepSize(7);
      expect(app.model!.stepSize).toEqual(7);
    });

    it('Инициализирует плагин заново', () => {
      const spy = spyOn(app, 'init');
      app.setStepSize(7);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Метод showTip', () => {
    it('Устанавливает значение withTip вида в положение true', () => {
      app.showTip();
      expect(app.view!.withTip).toBeTruthy();
    });

    it('Перерисовывает вид', () => {
      const spy = spyOn(app, 'updateView');
      app.showTip();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Метод hideTip', () => {
    it('Устанавливает значение withTip вида в положение false', () => {
      app.hideTip();
      expect(app.view!.withTip).toBeFalsy();
    });

    it('Перерисовывает вид', () => {
      const spy = spyOn(app, 'updateView');
      app.hideTip();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Метод showScale', () => {
    it('Устанавливает значение withScale вида в положение true', () => {
      app.showScale();
      expect(app.withScale).toBeTruthy();
    });

    it('Перерисовывает вид', () => {
      const spy = spyOn(app, 'updateView');
      app.showScale();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Метод hideScale', () => {
    it('Устанавливает значение withScale вида в положение false', () => {
      app.hideScale();
      expect(app.withScale).toBeFalsy();
    });

    it('Перерисовывает вид', () => {
      const spy = spyOn(app, 'updateView');
      app.hideScale();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Метод setVerticalOrientation', () => {
    it('Устанавливает вертикальное положение слайдера', () => {
      app.setVerticalOrientation();
      expect(app.orientation).toEqual('vertical');
    });

    it('Перерисовывает вид', () => {
      const spy = spyOn(app, 'updateView');
      app.setVerticalOrientation();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Метод setHorizontalOrientation', () => {
    it('Устанавливает горизонтальное положение слайдера', () => {
      app.setHorizontalOrientation();
      expect(app.orientation).toEqual('horizontal');
    });

    it('Перерисовывает вид', () => {
      const spy = spyOn(app, 'updateView');
      app.setHorizontalOrientation();
      expect(spy).toHaveBeenCalled();
    });
  });
});
