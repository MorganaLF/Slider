import App from '../plugin/App/App';
import Model from '../plugin/Model/Model';
import Controller from '../plugin/Controller/Controller';
import MainView from '../plugin/View/MainView/MainView';

describe('App', () => {
  let app: App;
  let $element: JQuery;

  beforeEach(() => {
    setFixtures('<div class="slider"></div>');
    $element = $('.slider');
    app = new App({ $element, elementIndex: 0 });
  });

  it('Создает экземпляр класса App', () => {
    expect(app).toBeDefined();
  });

  describe('Метод init', () => {
    it('Создает экземпляр класса Model', () => {
      expect(app.model instanceof Model).toBeTruthy();
    });

    it('Создает экземпляр класса View', () => {
      expect(app.view instanceof MainView).toBeTruthy();
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
  });

  describe('Метод getCurrentEndValue', () => {
    it('Возвращает округленное значение endValue модели', () => {
      app.model!.endValue = 70.954;
      expect(app.getCurrentEndValue()).toEqual(71);
    });
  });

  describe('Метод getMinValue', () => {
    it('Возвращает значение minVal модели', () => {
      app.model!.minValue = 10;
      expect(app.getMinValue()).toEqual(10);
    });
  });

  describe('Метод getMaxValue', () => {
    it('Возвращает значение maxValue модели', () => {
      app.model!.maxValue = 80;
      expect(app.getMaxValue()).toEqual(80);
    });
  });

  describe('Метод getStepSize', () => {
    it('Возвращает значение stepSize модели', () => {
      app.model!.stepSize = 15;
      expect(app.getStepSize()).toEqual(15);
    });
  });

  describe('Метод setMinValue', () => {
    it('Устанавливает значение minValue модели', () => {
      app.setMinValue(5);
      expect(app.model!.minValue).toEqual(5);
    });
  });

  describe('Метод setMaxValue', () => {
    it('Устанавливает значение maxValue модели', () => {
      app.setMaxValue(75);
      expect(app.model!.maxValue).toEqual(75);
    });
  });

  describe('Метод setCurrentValue', () => {
    it('Устанавливает значение startValue модели', () => {
      app.setCurrentValue(20);
      expect(app.model!.startValue).toEqual(20);
    });
  });

  describe('Метод setCurrentEndValue', () => {
    it('Устанавливает значение endValue модели', () => {
      app.model!.type = 'interval';
      app.setCurrentEndValue(60);
      expect(app.model!.endValue).toEqual(60);
    });
  });

  describe('Метод setStepSize', () => {
    it('Устанавливает значение stepSize модели', () => {
      app.setStepSize(7);
      expect(app.model!.stepSize).toEqual(7);
    });
  });

  describe('Метод showTip', () => {
    it('Устанавливает значение withTip вида в положение true', () => {
      app.showTip();
      expect(app.view!.withTip).toBeTruthy();
    });
  });

  describe('Метод hideTip', () => {
    it('Устанавливает значение withTip вида в положение false', () => {
      app.hideTip();
      expect(app.view!.withTip).toBeFalsy();
    });
  });

  describe('Метод showScale', () => {
    it('Устанавливает значение withScale вида в положение true', () => {
      app.showScale();
      expect(app.model.withScale).toBeTruthy();
    });
  });

  describe('Метод hideScale', () => {
    it('Устанавливает значение withScale вида в положение false', () => {
      app.hideScale();
      expect(app.model.withScale).toBeFalsy();
    });
  });

  describe('Метод setVerticalOrientation', () => {
    it('Устанавливает вертикальное положение слайдера', () => {
      app.setVerticalOrientation();
      expect(app.model.orientation).toEqual('vertical');
    });
  });

  describe('Метод setHorizontalOrientation', () => {
    it('Устанавливает горизонтальное положение слайдера', () => {
      app.setHorizontalOrientation();
      expect(app.model.orientation).toEqual('horizontal');
    });
  });
});
