import SliderApp from '../plugin/SliderApp/SliderApp';
import { ISliderApp } from '../plugin/SliderApp/SliderAppInterfaces';
import SliderModel from '../plugin/SliderModel/SliderModel';
import SliderController from '../plugin/SliderController/SliderController';
import SliderView from '../plugin/SliderView/SliderView';

describe('SliderApp', () => {
  let sliderApp: ISliderApp;
  let $element: JQuery;

  beforeEach(() => {
    setFixtures('<div class="slider"></div>');
    $element = $('.slider');
    sliderApp = new SliderApp({ $element });
    sliderApp.init();
  });

  it('Создает экземпляр класса SliderApp', () => {
    expect(sliderApp).toBeDefined();
  });

  describe('Метод init', () => {
    it('Создает экземпляр класса SliderModel', () => {
      expect(sliderApp.sliderModel instanceof SliderModel).toBeTruthy();
    });

    it('Создает экземпляр класса SliderView', () => {
      expect(sliderApp.sliderView instanceof SliderView).toBeTruthy();
    });

    it('Обновляет вид', () => {
      expect(sliderApp.sliderView!.startValueRunner).toBeDefined();
      expect(sliderApp.sliderView!.track).toBeDefined();
    });

    it('Создает экземпляр класса SliderController', () => {
      expect(sliderApp.sliderController instanceof SliderController).toBeTruthy();
    });
  });

  describe('Метод getCurrentValue', () => {
    it('Возвращает округленное значение startValue модели', () => {
      sliderApp.sliderModel!.startValue = 30.154;
      expect(sliderApp.getCurrentValue()).toEqual(30);
    });

    it('Возвращает 0, если модель не определена', () => {
      sliderApp.sliderModel = null;
      expect(sliderApp.getCurrentValue()).toEqual(0);
    });
  });

  describe('Метод getCurrentEndValue', () => {
    it('Возвращает округленное значение endValue модели', () => {
      sliderApp.sliderModel!.endValue = 70.954;
      expect(sliderApp.getCurrentEndValue()).toEqual(71);
    });

    it('Возвращает 0, если модель не определена', () => {
      sliderApp.sliderModel = null;
      expect(sliderApp.getCurrentEndValue()).toEqual(0);
    });
  });

  describe('Метод getMinValue', () => {
    it('Возвращает значение minVal модели', () => {
      sliderApp.sliderModel!.minValue = 10;
      expect(sliderApp.getMinValue()).toEqual(10);
    });

    it('Возвращает 0, если модель не определена', () => {
      sliderApp.sliderModel = null;
      expect(sliderApp.getMinValue()).toEqual(0);
    });
  });

  describe('Метод getMaxValue', () => {
    it('Возвращает значение maxValue модели', () => {
      sliderApp.sliderModel!.maxValue = 80;
      expect(sliderApp.getMaxValue()).toEqual(80);
    });

    it('Возвращает 0, если модель не определена', () => {
      sliderApp.sliderModel = null;
      expect(sliderApp.getMaxValue()).toEqual(0);
    });
  });

  describe('Метод getStepSize', () => {
    it('Возвращает значение stepSize модели', () => {
      sliderApp.sliderModel!.stepSize = 15;
      expect(sliderApp.getStepSize()).toEqual(15);
    });

    it('Возвращает 0, если модель не определена', () => {
      sliderApp.sliderModel = null;
      expect(sliderApp.getStepSize()).toEqual(0);
    });
  });

  describe('Метод getScaleMarksQuantity', () => {
    it('Возвращает значение scaleMarksQuantity', () => {
      sliderApp.scaleMarksQuantity = 5;
      expect(sliderApp.getScaleMarksQuantity()).toEqual(5);
    });
  });

  describe('Метод setMinValue', () => {
    it('Устанавливает значение minValue модели', () => {
      sliderApp.setMinValue(5);
      expect(sliderApp.sliderModel!.minValue).toEqual(5);
    });

    it('Заменяет строку на число', () => {
      sliderApp.setMinValue('15');
      expect(sliderApp.sliderModel!.minValue).toEqual(15);
    });

    it('Инициализирует плагин заново', () => {
      const spy = spyOn(sliderApp, 'init');
      sliderApp.setMinValue(5);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Метод setMaxValue', () => {
    it('Устанавливает значение maxValue модели', () => {
      sliderApp.setMaxValue(75);
      expect(sliderApp.sliderModel!.maxValue).toEqual(75);
    });

    it('Заменяет строку на число', () => {
      sliderApp.setMaxValue('65');
      expect(sliderApp.sliderModel!.maxValue).toEqual(65);
    });

    it('Инициализирует плагин заново', () => {
      const spy = spyOn(sliderApp, 'init');
      sliderApp.setMaxValue(95);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Метод setCurrentValue', () => {
    it('Устанавливает значение startValue модели', () => {
      sliderApp.setCurrentValue(20);
      expect(sliderApp.sliderModel!.startValue).toEqual(20);
    });

    it('Если модель не определена, возвращает false', () => {
      sliderApp.sliderModel = null;
      expect(sliderApp.setCurrentValue(20)).toEqual(false);
    });
  });

  describe('Метод setCurrentEndValue', () => {
    it('Устанавливает значение endValue модели', () => {
      sliderApp.sliderModel!.type = 'interval';
      sliderApp.setCurrentEndValue(60);
      expect(sliderApp.sliderModel!.endValue).toEqual(60);
    });

    it('Если модель не определена, возвращает false', () => {
      sliderApp.sliderModel = null;
      expect(sliderApp.setCurrentEndValue(60)).toEqual(false);
    });
  });

  describe('Метод setStepSize', () => {
    it('Устанавливает значение stepSize модели', () => {
      sliderApp.setStepSize(7);
      expect(sliderApp.sliderModel!.stepSize).toEqual(7);
    });

    it('Инициализирует плагин заново', () => {
      const spy = spyOn(sliderApp, 'init');
      sliderApp.setStepSize(7);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Метод setScaleMarksQuantity', () => {
    it('Устанавливает значение scaleMarksQuantity', () => {
      sliderApp.setScaleMarksQuantity(27);
      expect(sliderApp.scaleMarksQuantity).toEqual(27);
    });

    it('Перерисовывает вид', () => {
      const spy = spyOn(sliderApp, 'updateSliderView');
      sliderApp.setScaleMarksQuantity(10);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Метод showTip', () => {
    it('Устанавливает значение withTip вида в положение true', () => {
      sliderApp.showTip();
      expect(sliderApp.sliderView!.withTip).toBeTruthy();
    });

    it('Перерисовывает вид', () => {
      const spy = spyOn(sliderApp, 'updateSliderView');
      sliderApp.showTip();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Метод hideTip', () => {
    it('Устанавливает значение withTip вида в положение false', () => {
      sliderApp.hideTip();
      expect(sliderApp.sliderView!.withTip).toBeFalsy();
    });

    it('Перерисовывает вид', () => {
      const spy = spyOn(sliderApp, 'updateSliderView');
      sliderApp.hideTip();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Метод showScale', () => {
    it('Устанавливает значение withScale вида в положение true', () => {
      sliderApp.showScale();
      expect(sliderApp.withScale).toBeTruthy();
    });

    it('Перерисовывает вид', () => {
      const spy = spyOn(sliderApp, 'updateSliderView');
      sliderApp.showScale();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Метод hideScale', () => {
    it('Устанавливает значение withScale вида в положение false', () => {
      sliderApp.hideScale();
      expect(sliderApp.withScale).toBeFalsy();
    });

    it('Перерисовывает вид', () => {
      const spy = spyOn(sliderApp, 'updateSliderView');
      sliderApp.hideScale();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Метод setVerticalOrientation', () => {
    it('Устанавливает вертикальное положение слайдера', () => {
      sliderApp.setVerticalOrientation();
      expect(sliderApp.orientation).toEqual('vertical');
    });

    it('Перерисовывает вид', () => {
      const spy = spyOn(sliderApp, 'updateSliderView');
      sliderApp.setVerticalOrientation();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Метод setHorizontalOrientation', () => {
    it('Устанавливает горизонтальное положение слайдера', () => {
      sliderApp.setHorizontalOrientation();
      expect(sliderApp.orientation).toEqual('horizontal');
    });

    it('Перерисовывает вид', () => {
      const spy = spyOn(sliderApp, 'updateSliderView');
      sliderApp.setHorizontalOrientation();
      expect(spy).toHaveBeenCalled();
    });
  });
});
