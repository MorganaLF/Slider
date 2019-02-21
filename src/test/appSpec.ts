//import $ from 'jquery';
import $ = require('jquery');
import SliderView from '../components/slider/view';
import SliderModel from '../components/slider/model';
import SliderController from "../components/slider/controller";
import SliderApp from '../components/slider/app';
import {ISliderApp} from "../components/interfaces";
// import '../../node_modules/@types/jasmine';
// import '../../node_modules/@types/jasmine-jquery';
// import '../../node_modules/@types/jquery';

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
  it('Возвращает округленное значение startValue модели', function () {
    let sliderModel = new SliderModel({
        startValue: 30.154,
        endValue: 100,
        minVal: 0,
        maxVal: 100,
        step: 0,
        type: 'single'
    });
    let sliderApp = new SliderApp({sliderModel: sliderModel});
    expect(sliderApp.currentValue()).toEqual(30);
  });
});

describe('SliderApp. Метод currentMaxValue', function () {
  it('Возвращает округленное значение endValue модели', function () {
    let sliderModel = new SliderModel({
        startValue: 0,
        endValue: 70.954,
        minVal: 0,
        maxVal: 100,
        step: 0,
        type: 'single'
    });
    let sliderApp = new SliderApp({sliderModel: sliderModel});
    expect(sliderApp.currentMaxValue()).toEqual(71);
  });
});

describe('SliderApp. Метод minValue', function () {
  it('Возвращает значение minVal модели', function () {
    let sliderModel = new SliderModel({
        startValue: 0,
        endValue: 100,
        minVal: 10,
        maxVal: 100,
        step: 0,
        type: 'single'
    });
    let sliderApp = new SliderApp({sliderModel: sliderModel});
    expect(sliderApp.minValue()).toEqual(10);
  });
});

describe('SliderApp. Метод maxValue', function () {
  it('Возвращает значение maxVal модели', function () {
    let sliderModel = new SliderModel({
        startValue: 0,
        endValue: 100,
        minVal: 0,
        maxVal: 80,
        step: 0,
        type: 'single'
    });
    let sliderApp = new SliderApp({sliderModel: sliderModel});
    expect(sliderApp.maxValue()).toEqual(80);
  });
});

describe('SliderApp. Метод stepSize', function () {
  it('Возвращает значение step модели', function () {
    let sliderModel = new SliderModel({
        startValue: 0,
        endValue: 100,
        minVal: 0,
        maxVal: 100,
        step: 15,
        type: 'single'
    });
    let sliderApp = new SliderApp({sliderModel: sliderModel});
    expect(sliderApp.stepSize()).toEqual(15);
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
    sliderApp.setMinValue(5);
  });
  it('Устанавливает значение minVal модели', function () {
    expect(sliderApp.sliderModel!.minVal).toEqual(5);
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
    sliderApp.setMaxValue(75);
  });
  it('Устанавливает значение minVal модели', function () {
    expect(sliderApp.sliderModel!.maxVal).toEqual(75);
  });
  it('Инициализирует плагин заново', function () {
    let spy = spyOn(sliderApp, 'init');
    sliderApp.setMaxValue(95);
    expect(spy).toHaveBeenCalled();
  });
});

describe('SliderApp. Метод setCurrentValue', function () {
  it('Устанавливает значение startValue модели', function () {
    let sliderModel = new SliderModel({
        startValue: 0,
        endValue: 100,
        minVal: 0,
        maxVal: 100,
        step: 0,
        type: 'single'
    });
    let sliderApp = new SliderApp({sliderModel: sliderModel});
    sliderApp.setCurrentValue(20);
    expect(sliderApp.sliderModel!.startValue).toEqual(20);
  });
});

describe('SliderApp. Метод setCurrentMaxValue', function () {
  it('Возвращает значение endValue модели', function () {
    let sliderModel = new SliderModel({
        startValue: 0,
        endValue: 100,
        minVal: 0,
        maxVal: 100,
        step: 15,
        type: 'single'
    });
    sliderModel.type = 'interval';
    let sliderApp = new SliderApp({sliderModel: sliderModel});
    sliderApp.setCurrentMaxValue(60);
    expect(sliderApp.sliderModel!.endValue).toEqual(60);
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