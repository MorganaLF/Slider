import RunnerView from '../../plugin/View/RunnerView/RunnerView';

describe('RunnerView', () => {
  let runnerView: RunnerView;
  let $parent: JQuery;

  beforeEach(() => {
    setFixtures('<div class="slider"></div>');

    $parent = $('.slider');

    runnerView = new RunnerView({
      $parent,
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

  it('При наступлении события mousemove вызывается метод handleWindowMouseMove', () => {
    const moveSpy = spyOn(<any>runnerView, 'handleWindowMouseMove');
    const removeEventsSpy = spyOn(<any>runnerView, 'removeEventListeners');
    const $runner = runnerView.$element;

    $runner.mousedown();
    $(window).mousemove();
    $(window).mouseup();

    expect(moveSpy).toHaveBeenCalled();
    expect(removeEventsSpy).toHaveBeenCalled();
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

    beforeEach(() => {
      $runner = $('.slider__runner');

      $runner
        .css('width', '50px')
        .css('height', '50px');
    });

    it('Уведомляет подписчиков, отправляя коэффициент', () => {
      const spy = spyOn(runnerView.observableSubject, 'notifyObservers');
      runnerView.moveRunner((<any>{ pageX: 30, pageY: 10 }));

      expect(spy).toHaveBeenCalledWith(10);
    });

    it('Поддерживает вертикальный вид', () => {
      (<any>runnerView).orientation = 'vertical';
      const spy = spyOn(runnerView.observableSubject, 'notifyObservers');
      runnerView.moveRunner((<any>{ pageX: 30, pageY: 10 }));

      expect(spy).toHaveBeenCalledWith(30);
    });
  });

  describe('Функция placeRunnerOnHigherLayer', () => {
    let $runner: JQuery;

    beforeEach(() => {
      $runner = runnerView.$element;
      $runner.css('position', 'relative');
    });

    it('Устанавливает бегунку z-index 1', () => {
      runnerView.placeRunnerOnHigherLayer();
      expect($runner.css('zIndex')).toEqual('1');
    });
  });

  describe('Функция placeRunnerOnLowerLayer', () => {
    let $runner: JQuery;

    beforeEach(() => {
      $runner = runnerView.$element;
      $runner.css('position', 'relative');
    });

    it('Устанавливает бегунку z-index 0', () => {
      runnerView.placeRunnerOnLowerLayer();
      expect($runner.css('zIndex')).toEqual('0');
    });
  });
});
