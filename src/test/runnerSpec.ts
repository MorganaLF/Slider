//import $ from 'jquery';
import $ = require('jquery');
import RunnerView from '../components/slider/runner/RunnerView';
import {exportAllDeclaration} from "babel-types";
// import '../../node_modules/@types/jasmine';
// import '../../node_modules/@types/jasmine-jquery';
// import '../../node_modules/@types/jquery';

describe('RunnerView', function () {
  let runnerView: RunnerView;

  beforeEach(function () {
    runnerView = new RunnerView({
        type: 'single',
        orientation: 'horizontal',
        parentLeftPoint: 0,
        parentRightPoint: 350,
        parentTopPoint: 0,
        parentBottomPoint: 350
    });
  });

  it('Создается экземпляр класса RunnerView', function () {
    expect(runnerView).toBeDefined();
  });

});

describe('RunnerView. Функция drawRunner', function () {
  let runnerView: RunnerView,
      parent: JQuery;

  beforeEach(function () {
    setFixtures('<div class="slider"></div>');
    parent = $('.slider');
    runnerView = new RunnerView({
        type: 'single',
        orientation: 'horizontal',
        parentLeftPoint: 0,
        parentRightPoint: 350,
        parentTopPoint: 0,
        parentBottomPoint: 350
    });
    runnerView.drawRunner(parent, 2);
  });

  it('Должна создавать элемент slider__runner внутри элемента slider', function () {
    expect($('.slider .slider__runner')).toExist();
  });

  it('При вертикальном положении добавляет класс slider__runner_vertical', function () {
      runnerView = new RunnerView({
          type: 'single',
          orientation: 'vertical',
          parentLeftPoint: 0,
          parentRightPoint: 350,
          parentTopPoint: 0,
          parentBottomPoint: 350
      });
    runnerView.drawRunner(parent, 2);
    expect($('.slider .slider__runner_vertical')).toExist();
  });

  it('Должна вызывать метод setRunnerPosition и передавать в него коэффициент', function () {
    let spy =  spyOn(runnerView, 'setRunnerPosition');
    runnerView.drawRunner(parent, 2);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(2);
  });

});

describe('RunnerView. Функция setRunnerPosition', function () {
  let runnerView: RunnerView,
      parent;

  beforeEach(function () {
    setFixtures('<div class="slider"></div>');
    parent = $('.slider');

    runnerView = new RunnerView({
      type: 'single',
      orientation: 'horizontal',
      parentLeftPoint: 0,
      parentRightPoint: 350,
      parentTopPoint: 0,
      parentBottomPoint: 350
    });
    runnerView.drawRunner(parent, 1);
    runnerView.el!.css('position', 'absolute');
  });

  it('Горизонтальному ползунку задается положение left', function () {
    runnerView.el!.css('width', '50px');
    runnerView.setRunnerPosition(2);
    expect(runnerView.el!.css('left')).toEqual('150px');
  });

  it('Вертикальному ползунку задается положение top', function () {
      runnerView = new RunnerView({
          type: 'single',
          orientation: 'vertical',
          parentLeftPoint: 0,
          parentRightPoint: 350,
          parentTopPoint: 0,
          parentBottomPoint: 350
      });
      runnerView.drawRunner(parent, 1);
    runnerView.el!.css('height', '50px');
    runnerView.setRunnerPosition(2);
    expect(runnerView.el!.css('top')).toEqual('150px');
  });

});

describe('RunnerView. Функция setRunnerShiftX', function () {
  let runnerView: RunnerView,
      parent;

  beforeEach(function () {
    setFixtures('<div class="slider"></div>');
    parent = $('.slider');

      runnerView = new RunnerView({
          type: 'single',
          orientation: 'horizontal',
          parentLeftPoint: 0,
          parentRightPoint: 350,
          parentTopPoint: 0,
          parentBottomPoint: 350
      });
    runnerView.drawRunner(parent, 1);
  });

  it('Сохраняет смещение курсора относительно ползунка', function () {
    runnerView.setRunnerShiftX((<any>{pageX: 10}));
    let shift = 10 - runnerView.el!.offset()!.left;
    expect(runnerView.shiftX).toEqual(shift);
  });

});

describe('RunnerView. Функция setRunnerShiftY', function () {
  let runnerView: RunnerView,
      parent;

  beforeEach(function () {
    setFixtures('<div class="slider"></div>');
    parent = $('.slider');

    runnerView = new RunnerView({
        type: 'single',
        orientation: 'horizontal',
        parentLeftPoint: 0,
        parentRightPoint: 350,
        parentTopPoint: 0,
        parentBottomPoint: 350
    });
    runnerView.drawRunner(parent, 1);
  });

  it('Сохраняет смещение курсора относительно ползунка', function () {
    runnerView.setRunnerShiftY((<any>{pageY: 10}));
    let shift = 10 - runnerView.el!.offset()!.top;
    expect(runnerView.shiftY).toEqual(shift);
  });

});

describe('RunnerView. Функция moveRunner', function () {
  let runnerView: RunnerView,
      parent: JQuery,
      runner,
      ratio: number;

  beforeEach(function () {
    setFixtures('<div class="slider"></div>');
    parent = $('.slider');

    runnerView = new RunnerView({
      type: 'single',
      orientation: 'horizontal',
      parentLeftPoint: 0,
      parentRightPoint: 350,
      parentTopPoint: 0,
      parentBottomPoint: 250
    });
    runnerView.drawRunner(parent, 1);
    runner = $('.slider__runner');
    $('.slider__runner').css('width', '50px');
    $('.slider__runner').css('height', '50px');
  });

  it('Генерирует событие, отправляя коэффициент и тип ползунка', function () {
    spyOnEvent('.slider__runner', 'move');

    $('.slider__runner').on('move', function (e) {
      if (e.detail) {
          ratio = (<any>e.detail).ratio;
      }
    });
    runnerView.moveRunner((<any>{pageX: 30, pageY: 10}));

    expect($('.slider__runner')).toHandle("move");
    expect(ratio).toEqual(10);
  });

  it('Поддерживает вертикальный вид', function () {
      runnerView = new RunnerView({
          type: 'single',
          orientation: 'vertical',
          parentLeftPoint: 0,
          parentRightPoint: 350,
          parentTopPoint: 0,
          parentBottomPoint: 250
      });
      runnerView.drawRunner(parent, 1);
    spyOnEvent('.slider__runner', 'move');

    $('.slider__runner').on('move', function (e) {
      if (e.detail) {
          ratio = (<any>e.detail).ratio;
      }
    });
    runnerView.moveRunner((<any>{pageX: 30, pageY: 10}));

    expect($('.slider__runner')).toHandle("move");
    expect(ratio).toEqual(25);
  });

  it('Проверяет, не выходит ли координата за крайнюю левую точку', function () {
    runnerView = new RunnerView({
      type: 'single',
      orientation: 'horizontal',
      parentLeftPoint: 30,
      parentRightPoint: 380,
      parentTopPoint: 30,
      parentBottomPoint: 280
    });
    runnerView.drawRunner(parent, 1);
    runner = $('.slider__runner');
    $('.slider__runner').css('width', '50px');
    $('.slider__runner').css('height', '50px');

    spyOnEvent('.slider__runner', 'move');

    $('.slider__runner').on('move', function (e) {
      if (e.detail) {
          ratio = (<any>e.detail).ratio;
      }
    });
    runnerView.moveRunner((<any>{pageX: 20, pageY: 10}));

    expect($('.slider__runner')).toHandle("move");
    expect(ratio).toEqual(Infinity);
  });

  it('Проверяет, не выходит ли координата за крайнюю правую точку', function () {
    spyOnEvent('.slider__runner', 'move');

    $('.slider__runner').on('move', function (e) {
      if (e.detail) {
          ratio = (<any>e.detail).ratio;
      }
    });
    runnerView.moveRunner((<any>{pageX: 360, pageY: 10}));

    expect($('.slider__runner')).toHandle("move");
    expect(ratio).toEqual(1);
  });

  it('Проверяет, не выходит ли координата за крайнюю верхнюю точку', function () {
    runnerView = new RunnerView({
      type: 'single',
      orientation: 'vertical',
      parentLeftPoint: 0,
      parentRightPoint: 350,
      parentTopPoint: 30,
      parentBottomPoint: 280
    });
    runnerView.drawRunner(parent, 1);
    runner = $('.slider__runner');
    $('.slider__runner').css('width', '50px');
    $('.slider__runner').css('height', '50px');

    spyOnEvent('.slider__runner', 'move');

    $('.slider__runner').on('move', function (e) {
        if (e.detail) {
            ratio = (<any>e.detail).ratio;
        }
    });
    runnerView.moveRunner((<any>{pageX: 50, pageY: 10}));

    expect($('.slider__runner')).toHandle("move");
    expect(ratio).toEqual(Infinity);
  });

  it('Проверяет, не выходит ли координата за крайнюю нижнюю точку', function () {
      runnerView = new RunnerView({
          type: 'single',
          orientation: 'vertical',
          parentLeftPoint: 0,
          parentRightPoint: 350,
          parentTopPoint: 30,
          parentBottomPoint: 280
      });
      runnerView.drawRunner(parent, 1);
    spyOnEvent('.slider__runner', 'move');

    $('.slider__runner').on('move', function (e) {
        if (e.detail) {
            ratio = (<any>e.detail).ratio;
        }
    });
    runnerView.moveRunner((<any>{pageX: 50, pageY: 380}));

    expect($('.slider__runner')).toHandle("move");
    expect(ratio).toEqual(1);
  });

});
