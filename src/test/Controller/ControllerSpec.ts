import Controller from '../../plugin/Controller/Controller';
import Model from '../../plugin/Model/Model';
import MainView from '../../plugin/View/MainView/MainView';

describe('Controller', () => {
  let $element: JQuery;
  let view: MainView;
  let model: Model;
  let controller: Controller;

  beforeEach(() => {
    setFixtures('<div class="slider"></div>');
    $element = $('.slider');

    model = new Model({});

    view = new MainView({
      model,
      $element,
    });

    controller = new Controller(view, model);
  });

  it('Создается экземпляр класса Controller', () => {
    expect(controller).toBeDefined();
  });

  describe('Метод init', () => {
    it('Подписывается на события view и обновляет модель', () => {
      const ratioBoundSpy = spyOn((<any>controller).model, 'setRangeBoundByRatio');

      (<any>controller).view.boundObservableSubject.notifyObservers({
        ratio: 2,
        value: 50,
        boundType: 'start',
      });

      expect(ratioBoundSpy).toHaveBeenCalledWith(2, 'startValue');

      (<any>controller).view.boundObservableSubject.notifyObservers({
        ratio: 3,
        value: 50,
        boundType: 'end',
      });

      expect(ratioBoundSpy).toHaveBeenCalledWith(3, 'endValue');

      const boundSpy = spyOn((<any>controller).model, 'setBound');

      (<any>controller).view.boundObservableSubject.notifyObservers({
        ratio: 3,
        value: 50,
        boundType: 'either',
      });

      expect(boundSpy).toHaveBeenCalledWith(50);
    });

    it('Инициализирует значения модели', () => {
      const spy = spyOn((<any>controller).model, 'initRangeValues');
      controller.init();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Метод getSliderType', () => {
    it('Возвращает тип модели', () => {
      expect(controller.getSliderType()).toEqual('single');
    });
  });

  describe('Метод getMinValue', () => {
    it('Возвращает минимальное значение модели', () => {
      expect(controller.getMinValue()).toEqual(0);
    });
  });

  describe('Метод setMinValue', () => {
    it('Устанавливает минимальное значение модели', () => {
      controller.setMinValue(5);

      expect(controller.getMinValue()).toEqual(5);
    });
  });

  describe('Метод getMaxValue', () => {
    it('Возвращает максимальное значение модели', () => {
      expect(controller.getMaxValue()).toEqual(100);
    });
  });

  describe('Метод setMaxValue', () => {
    it('Устанавливает максимальное значение модели', () => {
      controller.setMaxValue(110);

      expect(controller.getMaxValue()).toEqual(110);
    });
  });

  describe('Метод getStepSize', () => {
    it('Возвращает размер шага модели', () => {
      expect(controller.getStepSize()).toEqual(0);
    });
  });

  describe('Метод setStepSize', () => {
    it('Устанавливает размер шага модели', () => {
      controller.setStepSize(2);

      expect(controller.getStepSize()).toEqual(2);
    });
  });

  describe('Метод getCurrentValue', () => {
    it('Возвращает текущее начальное значение модели', () => {
      expect(controller.getCurrentValue()).toEqual(0);
    });
  });

  describe('Метод setCurrentValue', () => {
    it('Устанавливает текущее начальное значение модели', () => {
      controller.setCurrentValue(30);

      expect(controller.getCurrentValue()).toEqual(30);
    });
  });

  describe('Метод getCurrentEndValue', () => {
    it('Возвращает текущее конечное значение модели', () => {
      expect(controller.getCurrentEndValue()).toEqual(100);
    });
  });

  describe('Метод setCurrentEndValue', () => {
    it('Устанавливает текущее конечное значение модели', () => {
      (<any>controller).model.type = 'interval';
      controller.setCurrentEndValue(80);

      expect(controller.getCurrentEndValue()).toEqual(80);
    });
  });

  describe('Метод setVerticalOrientation', () => {
    it('Устанавливает вертикальную ориентацию слайдера', () => {
      controller.setVerticalOrientation();

      expect((<any>controller).model.getOrientation()).toEqual('vertical');
    });
  });

  describe('Метод setHorizontalOrientation', () => {
    it('Устанавливает горизонтальную ориентацию слайдера', () => {
      controller.setHorizontalOrientation();

      expect((<any>controller).model.getOrientation()).toEqual('horizontal');
    });
  });

  describe('Метод isTipShown', () => {
    it('Возвращает, показывается ли подсказка', () => {
      expect(controller.isTipShown()).toEqual(true);
    });
  });

  describe('Метод hideTip', () => {
    it('Скрывает подсказку', () => {
      controller.hideTip();
      expect(controller.isTipShown()).toEqual(false);
    });
  });

  describe('Метод showTip', () => {
    it('Показывает подсказку', () => {
      controller.showTip();
      expect(controller.isTipShown()).toEqual(true);
    });
  });

  describe('Метод isScaleShown', () => {
    it('Возвращает, показывается ли шкала', () => {
      expect(controller.isScaleShown()).toEqual(false);
    });
  });

  describe('Метод showScale', () => {
    it('Показывает шкалу', () => {
      controller.showScale();
      expect(controller.isScaleShown()).toEqual(true);
    });
  });

  describe('Метод hideScale', () => {
    it('Скрывает шкалу', () => {
      controller.hideScale();
      expect(controller.isScaleShown()).toEqual(false);
    });
  });
});
