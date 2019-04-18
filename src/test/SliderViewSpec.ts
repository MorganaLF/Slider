import RunnerView from '../plugin/RunnerView/RunnerView';
import ScaleView from '../plugin/ScaleView/ScaleView';
import SliderView from '../plugin/SliderView/SliderView';
import TipView from '../plugin/TipView/TipView';
import TrackView from '../plugin/TrackView/TrackView';


describe('SliderView', () => {
  let $element: JQuery;
  let $track: JQuery;
  let $filledTrack: JQuery;
  let $runner: JQuery;
  let $tip: JQuery;
  let slider: SliderView;

  beforeEach(() => {
    setFixtures('<div class="slider"></div>');
    $element = $('.slider');

    slider = new SliderView({
      $element,
      type: 'single',
      orientation: 'horizontal',
      withTip: true,
      withScale: true,
      scaleMarksQuantity: 10,
    });

    slider.updateSlider();

    $track = $('.slider .slider__track');
    $filledTrack = $('.slider .slider__track .slider__filled-track');
    $runner = $('.slider .slider__runner');
    $tip = $('.slider .slider__runner .slider__tip');
  });

  it('Создает экземпляр класса SliderView', () => {
    expect(slider).toBeDefined();
  });

  describe('Функция updateSlider', () => {
    it('Добавляет корневому элементу класс vertical, если ориентация вертикальная', () => {
      (<any>slider).orientation = 'vertical';
      slider.updateSlider();

      const $verticalSlider = $('.slider_vertical');

      expect($verticalSlider).toExist();
    });

    it('Удаляет у корневого элемента класс vertical, если ориентация горизонтальная', () => {
      (<any>slider).orientation = 'horizontal';
      slider.updateSlider();

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
      slider.type = 'interval';
      slider.updateSlider();

      const $runner = $('.slider .slider__runner');

      expect($runner.length).toEqual(2);
    });

    it('По умолчанию должна создавать элемент slider__tip внутри элемента slider__runner', () => {
      expect($tip).toExist();
    });

    it('Создает два элемента slider__tip, если тип слайдера "interval"', () => {
      slider.type = 'interval';
      slider.updateSlider();

      const $tip = $('.slider .slider__runner .slider__tip');

      expect($tip.length).toEqual(2);
    });

    it('Должна рисовать слайдер только один раз', () => {
      slider.updateSlider();
      slider.updateSlider();
      slider.updateSlider();

      expect($track.length).toEqual(1);
    });

    it('Очищает содержимое родительского элемента перед созданием слайдера', () => {
      $('.slider').html('<div class="test"></div>');
      expect($('.slider .test')).toExist();

      slider.updateSlider();
      expect($('.slider .test')).not.toExist();
    });

    it('Записывает экземпляр класса RunnerView в свойство startValueRunner', () => {
      expect(slider.startValueRunner instanceof RunnerView).toEqual(true);
    });

    it(
      `Записывает экземпляр класса RunnerView в свойство endValueRunner,
      если тип слайдера interval`,
      () => {
        slider.type = 'interval';
        slider.updateSlider();

        expect(slider.endValueRunner instanceof RunnerView).toEqual(true);
      });

    it('Записывает экземпляр класса TipView в свойство startValueTip', () => {
      expect(slider.startValueTip instanceof TipView).toEqual(true);
    });

    it(
      'Записывает экземпляр класса TipView в свойство endValueTip, если тип слайдера interval',
      () => {
        slider.type = 'interval';
        slider.updateSlider();

        expect(slider.endValueTip instanceof TipView).toEqual(true);
      });

    it('Записывает экземпляр класса TrackView в свойство track', () => {
      expect(slider.track instanceof TrackView).toEqual(true);
    });

    it('Записывает экземпляр класса ScaleView в свойство scale', () => {
      slider.updateSlider();

      expect(slider.scale instanceof ScaleView).toEqual(true);
    });
  });
});
