import RunnerView from '../plugin/runner/RunnerView';

describe('RunnerView', function () {
  let runnerView: RunnerView;

  beforeEach(function () {
    runnerView = new RunnerView({
      orientation: 'horizontal',
      parentLeftPoint: 0,
      parentRightPoint: 350,
      parentTopPoint: 0,
      parentBottomPoint: 350,
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
      orientation: 'horizontal',
      parentLeftPoint: 0,
      parentRightPoint: 350,
      parentTopPoint: 0,
      parentBottomPoint: 350,
    });
    runnerView.drawRunner();
  });

  it('Должна создавать элемент slider__runner внутри элемента slider', function () {
    expect($('.slider .slider__runner')).toExist();
  });

  it('При вертикальном положении добавляет класс slider__runner_vertical', function () {
    runnerView = new RunnerView({
      orientation: 'vertical',
      parentLeftPoint: 0,
      parentRightPoint: 350,
      parentTopPoint: 0,
      parentBottomPoint: 350,
    });
    runnerView.drawRunner();
    expect($('.slider .slider__runner_vertical')).toExist();
  });

  it('Должна вызывать метод setRunnerPosition и передавать в него коэффициент', function () {
    const spy =  spyOn(runnerView, 'setRunnerPosition');
    runnerView.drawRunner();
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(2);
  });

});

describe('RunnerView. Функция setRunnerPosition', function () {
  let runnerView: RunnerView,
    parent: JQuery;

  beforeEach(function () {
    setFixtures('<div class="slider"></div>');
    parent = $('.slider');

    runnerView = new RunnerView({
      orientation: 'horizontal',
      parentLeftPoint: 0,
      parentRightPoint: 350,
      parentTopPoint: 0,
      parentBottomPoint: 350,
    });
    runnerView.drawRunner();
    runnerView.$element!.css('position', 'absolute');
  });

  it('Если элемент неопределен, возвращает false', function () {
    runnerView.$element = null;
    expect(runnerView.setRunnerPosition(2)).toEqual(false);
  });

  it('Горизонтальному ползунку задается положение left', function () {
    runnerView.$element!.css('width', '50px');
    runnerView.setRunnerPosition(2);
    expect(runnerView.$element!.css('left')).toEqual('150px');
  });

  it('Вертикальному ползунку задается положение top', function () {
    runnerView = new RunnerView({
      orientation: 'vertical',
      parentLeftPoint: 0,
      parentRightPoint: 350,
      parentTopPoint: 0,
      parentBottomPoint: 350,
    });
    runnerView.drawRunner();
    runnerView.$element!.css('height', '50px');
    runnerView.setRunnerPosition(2);
    expect(runnerView.$element!.css('top')).toEqual('150px');
  });

});

describe('RunnerView. Функция setRunnerShiftX', function () {
  let runnerView: RunnerView,
    parent;

  beforeEach(function () {
    setFixtures('<div class="slider"></div>');
    parent = $('.slider');

    runnerView = new RunnerView({
      orientation: 'horizontal',
      parentLeftPoint: 0,
      parentRightPoint: 350,
      parentTopPoint: 0,
      parentBottomPoint: 350,
    });
    runnerView.drawRunner();
  });

  it('Если элемент неопределен, возвращает false', function () {
    runnerView.$element = null;
    expect(runnerView.setRunnerShiftX((<any>{ pageX: 10 }))).toEqual(false);
  });

  it('Сохраняет смещение курсора относительно ползунка', function () {
    runnerView.setRunnerShiftX((<any>{ pageX: 10 }));
    const shift = 10 - runnerView.$element!.offset()!.left;
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
      orientation: 'horizontal',
      parentLeftPoint: 0,
      parentRightPoint: 350,
      parentTopPoint: 0,
      parentBottomPoint: 350,
    });
    runnerView.drawRunner();
  });

  it('Если элемент неопределен, возвращает false', function () {
    runnerView.$element = null;
    expect(runnerView.setRunnerShiftY((<any>{ pageY: 10 }))).toEqual(false);
  });

  it('Сохраняет смещение курсора относительно ползунка', function () {
    runnerView.setRunnerShiftY((<any>{ pageY: 10 }));
    const shift = 10 - runnerView.$element!.offset()!.top;
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
      orientation: 'horizontal',
      parentLeftPoint: 0,
      parentRightPoint: 350,
      parentTopPoint: 0,
      parentBottomPoint: 250,
    });
    runnerView.drawRunner();
    runner = $('.slider__runner');
    $('.slider__runner').css('width', '50px');
    $('.slider__runner').css('height', '50px');
  });

  it('Если элемент неопределен, возвращает false', function () {
    runnerView.$element = null;
    expect(runnerView.moveRunner((<any>{ pageX: 30, pageY: 10 }))).toEqual(false);
  });

  it('Генерирует событие, отправляя коэффициент и тип ползунка', function () {
    spyOnEvent('.slider__runner', 'move');

    $('.slider__runner').on('move', function (e) {
      if (e.detail) {
        ratio = (<any>e.detail).ratio;
      }
    });
    runnerView.moveRunner((<any>{ pageX: 30, pageY: 10 }));

    expect($('.slider__runner')).toHandle('move');
    expect(ratio).toEqual(10);
  });

  it('Поддерживает вертикальный вид', function () {
    runnerView = new RunnerView({
      orientation: 'vertical',
      parentLeftPoint: 0,
      parentRightPoint: 350,
      parentTopPoint: 0,
      parentBottomPoint: 250,
    });
    runnerView.drawRunner();
    spyOnEvent('.slider__runner', 'move');

    $('.slider__runner').on('move', function (e) {
      if (e.detail) {
        ratio = (<any>e.detail).ratio;
      }
    });
    runnerView.moveRunner((<any>{ pageX: 30, pageY: 10 }));

    expect($('.slider__runner')).toHandle('move');
    expect(ratio).toEqual(25);
  });

  it('Проверяет, не выходит ли координата за крайнюю левую точку', function () {
    runnerView = new RunnerView({
      orientation: 'horizontal',
      parentLeftPoint: 30,
      parentRightPoint: 380,
      parentTopPoint: 30,
      parentBottomPoint: 280,
    });
    runnerView.drawRunner();
    runner = $('.slider__runner');
    $('.slider__runner').css('width', '50px');
    $('.slider__runner').css('height', '50px');

    spyOnEvent('.slider__runner', 'move');

    $('.slider__runner').on('move', function (e) {
      if (e.detail) {
        ratio = (<any>e.detail).ratio;
      }
    });
    runnerView.moveRunner((<any>{ pageX: 20, pageY: 10 }));

    expect($('.slider__runner')).toHandle('move');
    expect(ratio).toEqual(Infinity);
  });

  it('Проверяет, не выходит ли координата за крайнюю правую точку', function () {
    spyOnEvent('.slider__runner', 'move');

    $('.slider__runner').on('move', function (e) {
      if (e.detail) {
        ratio = (<any>e.detail).ratio;
      }
    });
    runnerView.moveRunner((<any>{ pageX: 360, pageY: 10 }));

    expect($('.slider__runner')).toHandle('move');
    expect(ratio).toEqual(1);
  });

  it('Проверяет, не выходит ли координата за крайнюю верхнюю точку', function () {
    runnerView = new RunnerView({
      orientation: 'vertical',
      parentLeftPoint: 0,
      parentRightPoint: 350,
      parentTopPoint: 30,
      parentBottomPoint: 280,
    });
    runnerView.drawRunner();
    runner = $('.slider__runner');
    $('.slider__runner').css('width', '50px');
    $('.slider__runner').css('height', '50px');

    spyOnEvent('.slider__runner', 'move');

    $('.slider__runner').on('move', function (e) {
      if (e.detail) {
        ratio = (<any>e.detail).ratio;
      }
    });
    runnerView.moveRunner((<any>{ pageX: 50, pageY: 10 }));

    expect($('.slider__runner')).toHandle('move');
    expect(ratio).toEqual(Infinity);
  });

  it('Проверяет, не выходит ли координата за крайнюю нижнюю точку', function () {
    runnerView = new RunnerView({
      orientation: 'vertical',
      parentLeftPoint: 0,
      parentRightPoint: 350,
      parentTopPoint: 30,
      parentBottomPoint: 280,
    });
    runnerView.drawRunner();
    spyOnEvent('.slider__runner', 'move');

    $('.slider__runner').on('move', function (e) {
      if (e.detail) {
        ratio = (<any>e.detail).ratio;
      }
    });
    runnerView.moveRunner((<any>{ pageX: 50, pageY: 380 }));

    expect($('.slider__runner')).toHandle('move');
    expect(ratio).toEqual(1);
  });

});
