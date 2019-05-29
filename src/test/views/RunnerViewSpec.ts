import RunnerView from '../../plugin/views/RunnerView/RunnerView';

describe('RunnerView', () => {
  let runnerView: RunnerView;
  let $parent: JQuery;

  beforeEach(() => {
    setFixtures('<div class="slider"></div>');

    $parent = $('.slider');

    runnerView = new RunnerView({
      $parent,
      elementIndex: 0,
      orientation: 'horizontal',
      parentLeftPoint: 0,
      parentRightPoint: 350,
      parentTopPoint: 0,
      parentBottomPoint: 350,
    });
  });

  it('Создается экземпляр класса RunnerView', () => {
    expect(runnerView).toBeDefined();
  });

  describe('Функция drawRunner', () => {
    it('Должна создавать элемент slider__runner внутри элемента slider', () => {
      runnerView.drawRunner();
      const $runner = $('.slider .slider__runner');

      expect($runner).toExist();
    });

    it('При вертикальном положении добавляет класс slider__runner_vertical', () => {
      (<any>runnerView).orientation = 'vertical';
      runnerView.drawRunner();
      const $verticalRunner = $('.slider .slider__runner_vertical');

      expect($verticalRunner).toExist();
    });
  });

  describe('Функция setRunnerPosition', () => {
    beforeEach(() => {
      (<any>runnerView).orientation = 'horizontal';
      runnerView.drawRunner();
    });

    it('Горизонтальному ползунку задается положение left', () => {
      runnerView.$element!.css('width', '50px');
      runnerView.setRunnerPosition(2);

      expect(runnerView.$element!.css('left')).toEqual('150px');
    });

    it('Вертикальному ползунку задается положение top', () => {
      (<any>runnerView).orientation = 'vertical';
      runnerView.drawRunner();
      runnerView.$element!.css('height', '50px');
      runnerView.setRunnerPosition(2);

      expect(runnerView.$element!.css('top')).toEqual('150px');
    });

  });

  describe('Функция setRunnerShiftX', () => {
    it('Сохраняет смещение курсора относительно ползунка', () => {
      runnerView.setRunnerShiftX((<any>{ pageX: 10 }));
      const shift = 10 - runnerView.$element!.offset()!.left;

      expect(runnerView.shiftX).toEqual(shift);
    });
  });

  describe('Функция setRunnerShiftY', () => {
    it('Сохраняет смещение курсора относительно ползунка', () => {
      runnerView.setRunnerShiftY((<any>{ pageY: 10 }));
      const shift = 10 - runnerView.$element!.offset()!.top;

      expect(runnerView.shiftY).toEqual(shift);
    });
  });

  describe('Функция moveRunner', () => {
    let $runner: JQuery;
    let ratio: number;

    beforeEach(() => {
      $runner = $('.slider__runner');

      $runner
        .css('width', '50px')
        .css('height', '50px');
    });

    it('Генерирует событие, отправляя коэффициент и тип ползунка', () => {
      spyOnEvent('.slider__runner', 'move');

      $runner.on('move', (event) => {
        if (event.detail) {
          ratio = (<any>event.detail).ratio;
        }
      });

      runnerView.moveRunner((<any>{ pageX: 30, pageY: 10 }));

      expect($runner).toHandle('move');
      expect(ratio).toEqual(10);
    });

    it('Поддерживает вертикальный вид', () => {
      runnerView = new RunnerView({
        $parent,
        elementIndex: 0,
        orientation: 'vertical',
        parentLeftPoint: 0,
        parentRightPoint: 350,
        parentTopPoint: 0,
        parentBottomPoint: 250,
      });

      runnerView.drawRunner();
      $runner = $('.slider__runner');

      spyOnEvent('.slider__runner', 'move');

      $runner.on('move', (event) => {
        if (event.detail) {
          ratio = (<any>event.detail).ratio;
        }
      });

      runnerView.moveRunner((<any>{ pageX: 30, pageY: 10 }));

      expect($runner).toHandle('move');
      expect(ratio).toEqual(25);
    });

    it('Проверяет, не выходит ли координата за крайнюю левую точку', () => {
      runnerView = new RunnerView({
        $parent,
        elementIndex: 0,
        orientation: 'horizontal',
        parentLeftPoint: 30,
        parentRightPoint: 380,
        parentTopPoint: 30,
        parentBottomPoint: 280,
      });

      runnerView.drawRunner();

      $runner = $('.slider__runner');

      $runner
      .css('width', '50px')
      .css('height', '50px');

      spyOnEvent('.slider__runner', 'move');

      $runner.on('move', (event) => {
        if (event.detail) {
          ratio = (<any>event.detail).ratio;
        }
      });

      runnerView.moveRunner((<any>{ pageX: 20, pageY: 10 }));

      expect($runner).toHandle('move');
      expect(ratio).toEqual(Infinity);
    });

    it('Проверяет, не выходит ли координата за крайнюю правую точку', () => {
      spyOnEvent('.slider__runner', 'move');

      $runner.on('move', (event) => {
        if (event.detail) {
          ratio = (<any>event.detail).ratio;
        }
      });

      runnerView.moveRunner((<any>{ pageX: 360, pageY: 10 }));

      expect($runner).toHandle('move');
      expect(ratio).toEqual(1);
    });

    it('Проверяет, не выходит ли координата за крайнюю верхнюю точку', () => {
      runnerView = new RunnerView({
        $parent,
        elementIndex: 0,
        orientation: 'vertical',
        parentLeftPoint: 0,
        parentRightPoint: 350,
        parentTopPoint: 30,
        parentBottomPoint: 280,
      });

      runnerView.drawRunner();

      $runner = $('.slider__runner');

      $runner
      .css('width', '50px')
      .css('height', '50px');

      spyOnEvent('.slider__runner', 'move');

      $runner.on('move', (event) => {
        if (event.detail) {
          ratio = (<any>event.detail).ratio;
        }
      });

      runnerView.moveRunner((<any>{ pageX: 50, pageY: 10 }));

      expect($runner).toHandle('move');
      expect(ratio).toEqual(Infinity);
    });

    it('Проверяет, не выходит ли координата за крайнюю нижнюю точку', () => {
      runnerView = new RunnerView({
        $parent,
        elementIndex: 0,
        orientation: 'vertical',
        parentLeftPoint: 0,
        parentRightPoint: 350,
        parentTopPoint: 30,
        parentBottomPoint: 280,
      });

      runnerView.drawRunner();

      spyOnEvent('.slider__runner', 'move');

      $runner = $('.slider__runner');

      $runner.on('move', (event) => {
        if (event.detail) {
          ratio = (<any>event.detail).ratio;
        }
      });

      runnerView.moveRunner((<any>{ pageX: 50, pageY: 380 }));

      expect($runner).toHandle('move');
      expect(ratio).toEqual(1);
    });

  });
});
