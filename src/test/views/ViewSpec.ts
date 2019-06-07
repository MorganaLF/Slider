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
      elementIndex: 0,
      type: 'single',
      orientation: 'horizontal',
      withTip: true,
      withScale: true,
    });

    view.updateSlider();

    $track = $('.slider .slider__track');
    $filledTrack = $('.slider .slider__track .slider__filled-track');
    $runner = $('.slider .slider__runner');
    $tip = $('.slider .slider__runner .slider__tip');
  });

  it('Создает экземпляр класса View', () => {
    expect(view).toBeDefined();
  });

  describe('Функция updateSlider', () => {
    it('Добавляет корневому элементу класс vertical, если ориентация вертикальная', () => {
      (<any>view).orientation = 'vertical';
      view.updateSlider();

      const $verticalSlider = $('.view_vertical');

      expect($verticalSlider).toExist();
    });

    it('Удаляет у корневого элемента класс vertical, если ориентация горизонтальная', () => {
      (<any>view).orientation = 'horizontal';
      view.updateSlider();

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
      view.type = 'interval';
      view.updateSlider();

      const $runner = $('.slider .slider__runner');

      expect($runner.length).toEqual(2);
    });

    it('По умолчанию должна создавать элемент slider__tip внутри элемента slider__runner', () => {
      expect($tip).toExist();
    });

    it('Создает два элемента slider__tip, если тип слайдера "interval"', () => {
      view.type = 'interval';
      view.updateSlider();

      const $tip = $('.slider .slider__runner .slider__tip');

      expect($tip.length).toEqual(2);
    });

    it('Должна рисовать слайдер только один раз', () => {
      view.updateSlider();
      view.updateSlider();
      view.updateSlider();

      expect($track.length).toEqual(1);
    });

    it('Очищает содержимое родительского элемента перед созданием слайдера', () => {
      $('.slider').html('<div class="test"></div>');
      expect($('.slider .test')).toExist();

      view.updateSlider();
      expect($('.slider .test')).not.toExist();
    });

    it('Записывает экземпляр класса RunnerView в свойство startValueRunner', () => {
      expect(view.startValueRunner instanceof RunnerView).toEqual(true);
    });

    it(
      `Записывает экземпляр класса RunnerView в свойство endValueRunner,
      если тип слайдера interval`,
      () => {
        view.type = 'interval';
        view.updateSlider();

        expect(view.endValueRunner instanceof RunnerView).toEqual(true);
      });

    it('Записывает экземпляр класса TipView в свойство startValueTip', () => {
      expect(view.startValueTip instanceof TipView).toEqual(true);
    });

    it(
      'Записывает экземпляр класса TipView в свойство endValueTip, если тип слайдера interval',
      () => {
        view.type = 'interval';
        view.updateSlider();

        expect(view.endValueTip instanceof TipView).toEqual(true);
      });

    it('Записывает экземпляр класса TrackView в свойство track', () => {
      expect(view.track instanceof TrackView).toEqual(true);
    });

    it('Записывает экземпляр класса ScaleView в свойство scale', () => {
      view.updateSlider();

      expect(view.scale instanceof ScaleView).toEqual(true);
    });
  });
});
