import RunnerView from '../../plugin/View/RunnerView/RunnerView';
import ScaleView from '../../plugin/View/ScaleView/ScaleView';
import MainView from '../../plugin/View/MainView/MainView';
import TipView from '../../plugin/View/TipView/TipView';
import TrackView from '../../plugin/View/TrackView/TrackView';
import Model from '../../plugin/Model/Model';

describe('MainView', () => {
  let $element: JQuery;
  let $track: JQuery;
  let $filledTrack: JQuery;
  let $runner: JQuery;
  let $tip: JQuery;
  let view: MainView;

  beforeEach(() => {
    setFixtures('<div class="slider"></div>');
    $element = $('.slider');

    const model = new Model({});

    view = new MainView({
      model,
      $element,
    });

    $track = $('.slider .slider__track');
    $filledTrack = $('.slider .slider__track .slider__filled-track');
    $runner = $('.slider .slider__runner');
    $tip = $('.slider .slider__runner .slider__tip');
  });

  it('Создает экземпляр класса View', () => {
    expect(view).toBeDefined();
  });

  it('При ресайзе окна перерисовывает слайдер и уведомляет подписчиков', () => {
    const notifySpy = spyOn(view.resizeObservableSubject, 'notifyObservers');
    const reinitSpy = spyOn(view, 'reinitialize');
    $(window).resize();

    expect(notifySpy).toHaveBeenCalled();
    expect(reinitSpy).toHaveBeenCalled();
  });

  describe('Функция reinitialize', () => {
    it('Уведомляет подписчиков о событиях первого бегунка', () => {
      const firstRunnerSpy = spyOn(view.boundObservableSubject, 'notifyObservers');
      view.startValueRunner!.observableSubject.notifyObservers(2);

      expect(firstRunnerSpy).toHaveBeenCalledWith({ ratio: 2, boundType: 'start' });
    });

    it('Уведомляет подписчиков о событиях второго бегунка', () => {
      const model = new Model({ type: 'interval' });

      view = new MainView({
        model,
        $element,
      });

      const secondRunnerSpy = spyOn(view.boundObservableSubject, 'notifyObservers');
      view.endValueRunner!.observableSubject.notifyObservers(2);

      expect(secondRunnerSpy).toHaveBeenCalledWith({ ratio: 2, boundType: 'end' });
    });

    it('Уведомляет подписчиков о событиях шкалы', () => {
      const model = new Model({ withScale: true });

      view = new MainView({
        model,
        $element,
      });

      const scaleSpy = spyOn(view.boundObservableSubject, 'notifyObservers');
      view.scale!.observableSubject.notifyObservers(5);

      expect(scaleSpy).toHaveBeenCalledWith({ value: 5, boundType: 'either' });
    });

    it('Добавляет корневому элементу класс vertical, если ориентация вертикальная', () => {
      (<any>view).model.orientation = 'vertical';
      view.reinitialize();

      const $verticalSlider = $('.slider_vertical');

      expect($verticalSlider).toExist();
    });

    it('Удаляет у корневого элемента класс vertical, если ориентация горизонтальная', () => {
      (<any>view).model.orientation = 'horizontal';
      view.reinitialize();

      const $verticalSlider = $('.slider_vertical');

      expect($verticalSlider).not.toExist();
    });

    it('Должна создавать элемент slider__track внутри указанного элемента', () => {
      expect($track).toExist();
    });

    it('Должна создавать элемент slider__track-full внутри элемента slider__track', () => {
      expect($filledTrack).toExist();
    });

    it('Должна создавать элемент slider__runner внутри элемента slider', () => {
      expect($runner).toExist();
    });

    it('Создает два элемента slider__runner, если тип слайдера "interval"', () => {
      (<any>view).model.type = 'interval';
      view.reinitialize();

      const $runner = $('.slider .slider__runner');

      expect($runner.length).toEqual(2);
    });

    it('По умолчанию должна создавать элемент slider__tip внутри элемента slider__runner', () => {
      expect($tip).toExist();
    });

    it('Создает два элемента slider__tip, если тип слайдера "interval"', () => {
      (<any>view).model.type = 'interval';
      view.reinitialize();

      const $tip = $('.slider .slider__runner .slider__tip');

      expect($tip.length).toEqual(2);
    });

    it('Должна рисовать слайдер только один раз', () => {
      view.reinitialize();
      view.reinitialize();
      view.reinitialize();

      expect($track.length).toEqual(1);
    });

    it('Очищает содержимое родительского элемента перед созданием слайдера', () => {
      $('.slider').html('<div class="test"></div>');
      expect($('.slider .test')).toExist();

      view.reinitialize();
      expect($('.slider .test')).not.toExist();
    });

    it('Записывает экземпляр класса RunnerView в свойство startValueRunner', () => {
      expect(view.startValueRunner instanceof RunnerView).toEqual(true);
    });

    it(
      `Записывает экземпляр класса RunnerView в свойство endValueRunner,
      если тип слайдера interval`,
      () => {
        (<any>view).model.type = 'interval';
        view.reinitialize();

        expect(view.endValueRunner instanceof RunnerView).toEqual(true);
      });

    it('Записывает экземпляр класса TipView в свойство startValueTip', () => {
      expect(view.startValueTip instanceof TipView).toEqual(true);
    });

    it(
      'Записывает экземпляр класса TipView в свойство endValueTip, если тип слайдера interval',
      () => {
        (<any>view).model.type = 'interval';
        view.reinitialize();

        expect(view.endValueTip instanceof TipView).toEqual(true);
      });

    it('Записывает экземпляр класса TrackView в свойство track', () => {
      expect(view.track instanceof TrackView).toEqual(true);
    });

    it('Записывает экземпляр класса ScaleView в свойство scale', () => {
      (<any>view).model.withScale = true;
      view.reinitialize();

      expect(view.scale instanceof ScaleView).toEqual(true);
    });
  });

  describe('Функция update', () => {
    it('Устанавливает положение бегунка', () => {
      const spy = spyOn(<any>view.startValueRunner, 'setRunnerPosition');

      view.update({
        isEndValueChanging: false,
        coefficient: 1,
        value: 1,
        isRangeBoundAtTheEndOfInterval: false,
        isRangeBoundAtTheStartOfInterval: false,
      });

      expect(spy).toHaveBeenCalledWith(1);
    });

    it('Помещает последний активный бегунок на верхний слой', () => {
      const model = new Model({ type: 'interval' });

      view = new MainView({
        model,
        $element,
      });

      const firstRunnerSpy = spyOn(<any>view.startValueRunner, 'placeRunnerOnHigherLayer');
      const secondRunnerSpy = spyOn(<any>view.endValueRunner, 'placeRunnerOnLowerLayer');

      view.update({
        isEndValueChanging: false,
        coefficient: 1,
        value: 1,
        isRangeBoundAtTheEndOfInterval: false,
        isRangeBoundAtTheStartOfInterval: false,
      });

      expect(firstRunnerSpy).toHaveBeenCalled();
      expect(secondRunnerSpy).toHaveBeenCalled();
    });

    it('Если первый бегунок в конце слайдера, помещает его на верхний слой', () => {
      const model = new Model({ type: 'interval' });

      view = new MainView({
        model,
        $element,
      });

      const firstRunnerSpy = spyOn(<any>view.startValueRunner, 'placeRunnerOnHigherLayer');
      const secondRunnerSpy = spyOn(<any>view.endValueRunner, 'placeRunnerOnLowerLayer');

      view.update({
        isEndValueChanging: false,
        coefficient: 1,
        value: 1,
        isRangeBoundAtTheEndOfInterval: true,
        isRangeBoundAtTheStartOfInterval: false,
      });

      expect(firstRunnerSpy).toHaveBeenCalled();
      expect(secondRunnerSpy).toHaveBeenCalled();
    });

    it('Если второй бегунок в начале слайдера, помещает его на верхний слой', () => {
      const model = new Model({ type: 'interval' });

      view = new MainView({
        model,
        $element,
      });

      const firstRunnerSpy = spyOn(<any>view.endValueRunner, 'placeRunnerOnHigherLayer');
      const secondRunnerSpy = spyOn(<any>view.startValueRunner, 'placeRunnerOnLowerLayer');

      view.update({
        isEndValueChanging: false,
        coefficient: 1,
        value: 1,
        isRangeBoundAtTheEndOfInterval: false,
        isRangeBoundAtTheStartOfInterval: true,
      });

      expect(firstRunnerSpy).toHaveBeenCalled();
      expect(secondRunnerSpy).toHaveBeenCalled();
    });
  });

  describe('Функция drawScale', () => {
    it('Рисует шкалу с заданными опциями', () => {
      const model = new Model({ withScale: true });

      view = new MainView({
        model,
        $element,
      });

      const spy = spyOn(<any>view.scale, 'drawScale');

      const options = {
        stepSize: 2,
        minValue: 0,
        maxValue: 10,
      };

      view.drawScale(options);

      expect(spy).toHaveBeenCalledWith(options);
    });
  });
});
