//import $ from 'jquery';
import $ = require('jquery');
import SliderView from '../plugin/SliderView';
import SliderModel from '../plugin/SliderModel';
import SliderController from "../plugin/SliderController";
import SliderApp from '../plugin/SliderApp';

describe('SliderApp', function () {
  it('Создает экземпляр класса SliderApp', function () {
    setFixtures('<div class="slider"></div>');
    let el = $('.slider');
    let sliderApp = new SliderApp({el: el});
    expect(sliderApp).toBeDefined();
  });
});

describe('SliderApp. Метод init', function () {
  let sliderApp: SliderApp,
      el: JQuery;
  beforeEach(function () {
    setFixtures('<div class="slider"></div>');
    el = $('.slider');
    sliderApp = new SliderApp({el: el});
    sliderApp.init();
  });
    it('Возвращает false, если элемент не определен', function () {
        (<any>sliderApp).el = null;
        expect(sliderApp.init()).toEqual(false);
    });
  it('Создает экземпляр класса SliderModel', function () {
    expect(sliderApp.sliderModel instanceof SliderModel).toBeTruthy();
  });
  it('Создает экземпляр класса SliderView', function () {
    expect(sliderApp.sliderView instanceof SliderView).toBeTruthy();
  });
  it('Обновляет вид', function () {
    expect(sliderApp.sliderView!.el).toEqual(el);
  });
  it('Создает экземпляр класса SliderController', function () {
    expect(sliderApp.sliderController instanceof SliderController).toBeTruthy();
  });
  it('Инициализирует контроллер', function () {
    expect(sliderApp.sliderController!.init).toBeDefined();
  });
});

describe('SliderApp. Метод currentValue', function () {
  let sliderModel,
      sliderApp: SliderApp;

    beforeEach(function () {
        sliderModel = new SliderModel({
            startValue: 30.154,
            endValue: 100,
            minVal: 0,
            maxVal: 100,
            step: 0,
            type: 'single'
        });
        sliderApp = new SliderApp({sliderModel: sliderModel});
    });
  it('Возвращает округленное значение startValue модели', function () {
    expect(sliderApp.getCurrentValue()).toEqual(30);
  });
    it('Возвращает 0, если модель не определена', function () {
        sliderApp.sliderModel = null;
        expect(sliderApp.getCurrentValue()).toEqual(0);
    });
});

describe('SliderApp. Метод currentMaxValue', function () {
    let sliderModel,
        sliderApp: SliderApp;

    beforeEach(function () {
        sliderModel = new SliderModel({
            startValue: 0,
            endValue: 70.954,
            minVal: 0,
            maxVal: 100,
            step: 0,
            type: 'single'
        });
        sliderApp = new SliderApp({sliderModel: sliderModel});
    });
  it('Возвращает округленное значение endValue модели', function () {
    expect(sliderApp.getCurrentMaxValue()).toEqual(71);
  });
    it('Возвращает 0, если модель не определена', function () {
        sliderApp.sliderModel = null;
        expect(sliderApp.getCurrentMaxValue()).toEqual(0);
    });
});

describe('SliderApp. Метод minValue', function () {
    let sliderModel,
        sliderApp: SliderApp;

    beforeEach(function () {
        sliderModel = new SliderModel({
            startValue: 0,
            endValue: 100,
            minVal: 10,
            maxVal: 100,
            step: 0,
            type: 'single'
        });
        sliderApp = new SliderApp({sliderModel: sliderModel});
    });
  it('Возвращает значение minVal модели', function () {
    expect(sliderApp.getMinValue()).toEqual(10);
  });
    it('Возвращает 0, если модель не определена', function () {
        sliderApp.sliderModel = null;
        expect(sliderApp.getMinValue()).toEqual(0);
    });
});

describe('SliderApp. Метод maxValue', function () {
    let sliderModel,
        sliderApp: SliderApp;

    beforeEach(function () {
        sliderModel = new SliderModel({
            startValue: 0,
            endValue: 100,
            minVal: 0,
            maxVal: 80,
            step: 0,
            type: 'single'
        });
        sliderApp = new SliderApp({sliderModel: sliderModel});
    });
  it('Возвращает значение maxVal модели', function () {
    expect(sliderApp.getMaxValue()).toEqual(80);
  });
    it('Возвращает 0, если модель не определена', function () {
        sliderApp.sliderModel = null;
        expect(sliderApp.getMaxValue()).toEqual(0);
    });
});

describe('SliderApp. Метод stepSize', function () {
    let sliderModel,
        sliderApp: SliderApp;

    beforeEach(function () {
        sliderModel = new SliderModel({
            startValue: 0,
            endValue: 100,
            minVal: 0,
            maxVal: 100,
            step: 15,
            type: 'single'
        });
        sliderApp = new SliderApp({sliderModel: sliderModel});
    });
  it('Возвращает значение step модели', function () {
    expect(sliderApp.getStepSize()).toEqual(15);
  });
    it('Возвращает 0, если модель не определена', function () {
        sliderApp.sliderModel = null;
        expect(sliderApp.getStepSize()).toEqual(0);
    });
});

describe('SliderApp. Метод getScaleItemsQuantity', function () {
    let sliderModel,
        sliderApp: SliderApp;

    beforeEach(function () {
        sliderModel = new SliderModel({
            startValue: 0,
            endValue: 100,
            minVal: 0,
            maxVal: 100,
            step: 15,
            type: 'single'
        });
        sliderApp = new SliderApp({sliderModel: sliderModel});
    });
    it('Возвращает значение scaleItemsQuantity', function () {
        expect(sliderApp.getScaleItemsQuantity()).toEqual(10);
    });
});

describe('SliderApp. Метод setMinValue', function () {
  let sliderApp: SliderApp,
      el: JQuery;
  beforeEach(function () {
    setFixtures('<div class="slider"></div>');
    el = $('.slider');
    sliderApp = new SliderApp({el: el});
    sliderApp.init();
  });
  it('Устанавливает значение minVal модели', function () {
      sliderApp.setMinValue(5);
    expect(sliderApp.sliderModel!.minVal).toEqual(5);
  });
    it('Заменяет строку на число', function () {
        sliderApp.setMinValue('15');
        expect(sliderApp.sliderModel!.minVal).toEqual(15);
    });
  it('Инициализирует плагин заново', function () {
    let spy = spyOn(sliderApp, 'init');
    sliderApp.setMinValue(5);
    expect(spy).toHaveBeenCalled();
  });
});

describe('SliderApp. Метод setMaxValue', function () {
  let sliderApp: SliderApp,
      el: JQuery;
  beforeEach(function () {
    setFixtures('<div class="slider"></div>');
    el = $('.slider');
    sliderApp = new SliderApp({el: el});
    sliderApp.init();
  });
  it('Устанавливает значение minVal модели', function () {
      sliderApp.setMaxValue(75);
    expect(sliderApp.sliderModel!.maxVal).toEqual(75);
  });
    it('Заменяет строку на число', function () {
        sliderApp.setMaxValue('65');
        expect(sliderApp.sliderModel!.maxVal).toEqual(65);
    });
  it('Инициализирует плагин заново', function () {
    let spy = spyOn(sliderApp, 'init');
    sliderApp.setMaxValue(95);
    expect(spy).toHaveBeenCalled();
  });
});

describe('SliderApp. Метод setCurrentValue', function () {
    let sliderModel,
        sliderApp: SliderApp;

    beforeEach(function () {
        sliderModel = new SliderModel({
            startValue: 0,
            endValue: 100,
            minVal: 0,
            maxVal: 100,
            step: 0,
            type: 'single'
        });
        sliderApp = new SliderApp({sliderModel: sliderModel});
    });
  it('Устанавливает значение startValue модели', function () {
    sliderApp.setCurrentValue(20);
    expect(sliderApp.sliderModel!.startValue).toEqual(20);
  });
    it('Если модель не определена, возвращает false', function () {
        sliderApp.sliderModel = null;
        expect(sliderApp.setCurrentValue(20)).toEqual(false);
    });
});

describe('SliderApp. Метод setCurrentMaxValue', function () {
    let sliderModel: SliderModel,
        sliderApp: SliderApp;

    beforeEach(function () {
        sliderModel = new SliderModel({
            startValue: 0,
            endValue: 100,
            minVal: 0,
            maxVal: 100,
            step: 15,
            type: 'interval'
        });
        sliderApp = new SliderApp({sliderModel: sliderModel});
    });
  it('Возвращает значение endValue модели', function () {
    sliderApp.setCurrentMaxValue(60);
    expect(sliderApp.sliderModel!.endValue).toEqual(60);
  });
    it('Если модель не определена, возвращает false', function () {
        sliderApp.sliderModel = null;
        expect(sliderApp.setCurrentMaxValue(60)).toEqual(false);
    });
});

describe('SliderApp. Метод setStepSize', function () {
  let sliderApp: SliderApp,
      el: JQuery;
  beforeEach(function () {
    setFixtures('<div class="slider"></div>');
    el = $('.slider');
    sliderApp = new SliderApp({el: el});
    sliderApp.init();
    sliderApp.setStepSize(7);
  });
  it('Устанавливает значение step модели', function () {
    expect(sliderApp.sliderModel!.step).toEqual(7);
  });
  it('Инициализирует плагин заново', function () {
    let spy = spyOn(sliderApp, 'init');
    sliderApp.setStepSize(7);
    expect(spy).toHaveBeenCalled();
  });
});

describe('SliderApp. Метод setScaleItemsQuantity', function () {
    let sliderApp: SliderApp,
        el: JQuery;
    beforeEach(function () {
        setFixtures('<div class="slider"></div>');
        el = $('.slider');
        sliderApp = new SliderApp({el: el});
        sliderApp.init();
        sliderApp.setScaleItemsQuantity(27);
    });
    it('Устанавливает значение scaleItemsQuantity', function () {
        expect(sliderApp.scaleItemsQuantity).toEqual(27);
    });
    it('Инициализирует плагин заново', function () {
        let spy = spyOn(sliderApp, 'init');
        sliderApp.setStepSize(7);
        expect(spy).toHaveBeenCalled();
    });
});

describe('SliderApp. Метод showTip', function () {
  let sliderApp: SliderApp,
      el: JQuery;
  beforeEach(function () {
    setFixtures('<div class="slider"></div>');
    el = $('.slider');
    sliderApp = new SliderApp({el: el});
    sliderApp.init();
    sliderApp.showTip();
  });
  it('Устанавливает значение isTip вида в положение true', function () {
    expect(sliderApp.sliderView!.isTip).toBeTruthy();
  });
  it('Инициализирует плагин заново', function () {
    let spy = spyOn(sliderApp, 'init');
    sliderApp.showTip();
    expect(spy).toHaveBeenCalled();
  });
});

describe('SliderApp. Метод hideTip', function () {
  let sliderApp: SliderApp,
      el: JQuery;
  beforeEach(function () {
    setFixtures('<div class="slider"></div>');
    el = $('.slider');
    sliderApp = new SliderApp({el: el});
    sliderApp.init();
    sliderApp.hideTip();
  });
  it('Устанавливает значение isTip вида в положение false', function () {
    expect(sliderApp.sliderView!.isTip).toBeFalsy();
  });
  it('Инициализирует плагин заново', function () {
    let spy = spyOn(sliderApp, 'init');
    sliderApp.hideTip();
    expect(spy).toHaveBeenCalled();
  });
});

describe('SliderApp. Метод showScale', function () {
  let sliderApp: SliderApp,
      el: JQuery;
  beforeEach(function () {
    setFixtures('<div class="slider"></div>');
    el = $('.slider');
    sliderApp = new SliderApp({el: el});
    sliderApp.init();
    sliderApp.showScale();
  });
  it('Устанавливает значение isScale вида в положение true', function () {
    expect(sliderApp.isScale).toBeTruthy();
  });
  it('Инициализирует плагин заново', function () {
    let spy = spyOn(sliderApp, 'init');
    sliderApp.showScale();
    expect(spy).toHaveBeenCalled();
  });
});

describe('SliderApp. Метод hideScale', function () {
  let sliderApp: SliderApp,
      el: JQuery;
  beforeEach(function () {
    setFixtures('<div class="slider"></div>');
    el = $('.slider');
    sliderApp = new SliderApp({el: el});
    sliderApp.init();
    sliderApp.hideScale();
  });
  it('Устанавливает значение isScale вида в положение false', function () {
    expect(sliderApp.isScale).toBeFalsy();
  });
  it('Инициализирует плагин заново', function () {
    let spy = spyOn(sliderApp, 'init');
    sliderApp.hideScale();
    expect(spy).toHaveBeenCalled();
  });
});

describe('SliderApp. Метод setVeticalOrientation', function () {
  let sliderApp: SliderApp,
      el: JQuery;
  beforeEach(function () {
    setFixtures('<div class="slider"></div>');
    el = $('.slider');
    sliderApp = new SliderApp({el: el});
    sliderApp.init();
    sliderApp.setVeticalOrientation();
  });
  it('Устанавливает вертикальное положение слайдера', function () {
    expect(sliderApp.orientation).toEqual('vertical');
  });
  it('Инициализирует плагин заново', function () {
    let spy = spyOn(sliderApp, 'init');
    sliderApp.setVeticalOrientation();
    expect(spy).toHaveBeenCalled();
  });
});

describe('SliderApp. Метод setHorisontalOrientation', function () {
  let sliderApp: SliderApp,
      el: JQuery;
  beforeEach(function () {
    setFixtures('<div class="slider"></div>');
    el = $('.slider');
    sliderApp = new SliderApp({el: el});
    sliderApp.init();
    sliderApp.setHorisontalOrientation();
  });
  it('Устанавливает горизонтальное положение слайдера', function () {
    expect(sliderApp.orientation).toEqual('horizontal');
  });
  it('Инициализирует плагин заново', function () {
    let spy = spyOn(sliderApp, 'init');
    sliderApp.setHorisontalOrientation();
    expect(spy).toHaveBeenCalled();
  });
});