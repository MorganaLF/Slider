import SliderController from '../plugin/SliderController/SliderController';
import SliderModel from '../plugin/SliderModel/SliderModel';
import SliderView from '../plugin/SliderView/SliderView';

describe('SliderController', () => {
  const $body = $('body');
  const $window = $(window);
  let $element: JQuery;
  let $runner: JQuery;
  let sliderView: SliderView;
  let sliderModel: SliderModel;
  let sliderController: SliderController;
  let spy: (obj: JQuery, func: any) => void;
  let spyOnCustomEvent: (obj: any, func: any, event: string) => void;

  beforeEach(() => {
    setFixtures('<div class="slider"></div>');
    $element = $('.slider');

    sliderModel = new SliderModel({
      startValue: 0,
      endValue: 100,
      minValue: 0,
      maxValue: 100,
      stepSize: 0,
      type: 'interval',
    });

    sliderView = new SliderView({
      $element,
      type: 'interval',
      orientation: 'horizontal',
      withTip: true,
      withScale: true,
      scaleMarksQuantity: 10,
    });

    sliderView.updateSlider();
    sliderController = new SliderController(sliderView, sliderModel);
    sliderController.init();

    $runner = $('.slider__runner');

    spyOnCustomEvent = function(obj, func, event) {
      spy = spyOn(obj, func);
      spyOnEvent('body', event);
      const e = $.Event(event, { detail: { model: sliderModel } });
      $body.trigger(e);
    };
  });

  it('Создается экземпляр класса SliderController', () => {
    expect(sliderController).toBeDefined();
  });

  describe('Метод init', () => {
    it('При клике на runner и движении мыши пересчитывается значение модели', () => {
      const spy = spyOn(sliderModel, 'setCurrentValueByRatio');
      $runner.mousedown();
      $window.mousemove();

      expect(spy).toHaveBeenCalled();
    });

    it('При клике на runner устанавливается shift бегунка', () => {
      const spyOnShiftX = spyOn(
        sliderController.startValueRunner,
        (<never>'setRunnerShiftX'),
      );

      const spyOnShiftY = spyOn(
        sliderController.startValueRunner,
        (<never>'setRunnerShiftY'),
      );

      $runner.mousedown();

      expect(spyOnShiftX).toHaveBeenCalled();
      expect(spyOnShiftY).toHaveBeenCalled();
    });

    it('При событии changestartvalue устанавливается новое положение бегунка', () => {
      spyOnCustomEvent(
        sliderController.startValueRunner,
        'setRunnerPosition',
        'changestartvalue',
      );

      expect($body).toHandle('changestartvalue');
      expect(spy).toHaveBeenCalled();
    });

    it('При событии changestartvalue обновляется подсказка', () => {
      spyOnCustomEvent(
        sliderController.startValueTip,
        'updateTip',
        'changestartvalue',
      );

      expect($body).toHandle('changestartvalue');
      expect(spy).toHaveBeenCalled();
    });

    it('При событии changestartvalue обновляется дорожка слайдера', () => {
      spyOnCustomEvent(
        sliderController.track,
        'animateTrack',
        'changestartvalue',
      );

      expect($body).toHandle('changestartvalue');
      expect(spy).toHaveBeenCalled();
    });

    it('При событии changeendvalue устанавливается новое положение второго бегунка', () => {
      spyOnCustomEvent(
        sliderController.endValueRunner,
        'setRunnerPosition',
        'changeendvalue',
      );

      expect($body).toHandle('changeendvalue');
      expect(spy).toHaveBeenCalled();
    });

    it('При событии changeendvalue обновляется подсказка', () => {
      spyOnCustomEvent(
        sliderController.endValueTip,
        'updateTip',
        'changeendvalue',
      );

      expect($body).toHandle('changeendvalue');
      expect(spy).toHaveBeenCalled();
    });

    it('При событии changeendvalue обновляется дорожка слайдера', () => {
      spyOnCustomEvent(
        sliderController.track,
        'animateTrack',
        'changeendvalue',
      );

      expect($body).toHandle('changeendvalue');
      expect(spy).toHaveBeenCalled();
    });

    it('При событии setstartvalue устанавливается новое положение бегунка', () => {
      spyOnCustomEvent(
        sliderController.startValueRunner,
        'setRunnerPosition',
        'setstartvalue',
      );

      expect($body).toHandle('setstartvalue');
      expect(spy).toHaveBeenCalled();
    });

    it('При событии setstartvalue обновляется подсказка', () => {
      spyOnCustomEvent(
        sliderController.startValueTip,
        'updateTip',
        'setstartvalue',
      );

      expect($body).toHandle('setstartvalue');
      expect(spy).toHaveBeenCalled();
    });

    it('При событии setstartvalue обновляется дорожка слайдера', () => {
      spyOnCustomEvent(
        sliderController.track,
        'animateTrack',
        'setstartvalue',
      );

      expect($body).toHandle('setstartvalue');
      expect(spy).toHaveBeenCalled();
    });

    it('При событии setendvalue устанавливается новое положение второго бегунка', () => {
      spyOnCustomEvent(
        sliderController.endValueRunner,
        'setRunnerPosition',
        'setendvalue',
      );

      expect($body).toHandle('setendvalue');
      expect(spy).toHaveBeenCalled();
    });

    it('При событии setendvalue обновляется подсказка', () => {
      spyOnCustomEvent(
        sliderController.endValueTip,
        'updateTip',
        'setendvalue',
      );

      expect($body).toHandle('setendvalue');
      expect(spy).toHaveBeenCalled();
    });

    it('При событии setendvalue обновляется дорожка слайдера', () => {
      spyOnCustomEvent(
        sliderController.track,
        'animateTrack',
        'setendvalue',
      );

      expect($body).toHandle('setendvalue');
      expect(spy).toHaveBeenCalled();
    });

    it('При событии mouseup обработчики удаляются', () => {
      const spyOnWindowMouseMove = spyOn(<any>sliderController, '_handleWindowMouseMove');
      $window.mouseup();
      $window.mousemove();

      expect(spyOnWindowMouseMove).not.toHaveBeenCalled();

      const spyOnRunnerMove = spyOn(<any>sliderController, '_handleRunnerMove');
      $runner.trigger('move');

      expect(spyOnRunnerMove).not.toHaveBeenCalled();
    });

    it('При событии resize обновляется вид слайдера', () => {
      const spy = spyOn((<any>sliderController).view, 'updateSlider');
      $window.trigger('resize');

      expect(spy).toHaveBeenCalled();
    });
  });
});
