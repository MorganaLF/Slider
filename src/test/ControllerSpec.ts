import Controller from '../plugin/Controller/Controller';
import Model from '../plugin/Model/Model';
import View from '../plugin/views/View/View';

describe('Controller', () => {
  const $body = $('body');
  const $window = $(window);
  let $element: JQuery;
  let $runner: JQuery;
  let view: View;
  let model: Model;
  let controller: Controller;
  let spy: (obj: JQuery, func: any) => void;
  let spyOnCustomEvent: (obj: any, func: any, event: string) => void;

  beforeEach(() => {
    setFixtures('<div class="slider"></div>');
    $element = $('.slider');

    model = new Model({
      startValue: 0,
      endValue: 100,
      minValue: 0,
      maxValue: 100,
      stepSize: 0,
      type: 'interval',
    });

    view = new View({
      $element,
      type: 'interval',
      orientation: 'horizontal',
      withTip: true,
      withScale: true,
    });

    view.updateSlider();
    controller = new Controller(0, view, model);
    controller.init();

    $runner = $('.slider__runner');

    spyOnCustomEvent = function(obj, func, event) {
      spy = spyOn(obj, func);
      spyOnEvent('body', event);
      const e = $.Event(event, { detail: { model } });
      $body.trigger(e);
    };
  });

  it('Создается экземпляр класса Controller', () => {
    expect(controller).toBeDefined();
  });

  describe('Метод init', () => {
    it('При клике на runner и движении мыши пересчитывается значение модели', () => {
      const spy = spyOn(model, 'setCurrentValueByRatio');
      $runner.mousedown();
      $window.mousemove();

      expect(spy).toHaveBeenCalled();
    });

    it('При клике на runner устанавливается shift бегунка', () => {
      const spyOnShiftX = spyOn(
        controller.startValueRunner,
        (<never>'setRunnerShiftX'),
      );

      const spyOnShiftY = spyOn(
        controller.startValueRunner,
        (<never>'setRunnerShiftY'),
      );

      $runner.mousedown();

      expect(spyOnShiftX).toHaveBeenCalled();
      expect(spyOnShiftY).toHaveBeenCalled();
    });

    it('При событии changestartvalue устанавливается новое положение бегунка', () => {
      spyOnCustomEvent(
        controller.startValueRunner,
        'setRunnerPosition',
        'changestartvalue',
      );

      expect($body).toHandle('changestartvalue');
      expect(spy).toHaveBeenCalled();
    });

    it('При событии changestartvalue обновляется подсказка', () => {
      spyOnCustomEvent(
        controller.startValueTip,
        'updateTip',
        'changestartvalue',
      );

      expect($body).toHandle('changestartvalue');
      expect(spy).toHaveBeenCalled();
    });

    it('При событии changestartvalue обновляется дорожка слайдера', () => {
      spyOnCustomEvent(
        controller.track,
        'animateTrack',
        'changestartvalue',
      );

      expect($body).toHandle('changestartvalue');
      expect(spy).toHaveBeenCalled();
    });

    it('При событии changeendvalue устанавливается новое положение второго бегунка', () => {
      spyOnCustomEvent(
        controller.endValueRunner,
        'setRunnerPosition',
        'changeendvalue',
      );

      expect($body).toHandle('changeendvalue');
      expect(spy).toHaveBeenCalled();
    });

    it('При событии changeendvalue обновляется подсказка', () => {
      spyOnCustomEvent(
        controller.endValueTip,
        'updateTip',
        'changeendvalue',
      );

      expect($body).toHandle('changeendvalue');
      expect(spy).toHaveBeenCalled();
    });

    it('При событии changeendvalue обновляется дорожка слайдера', () => {
      spyOnCustomEvent(
        controller.track,
        'animateTrack',
        'changeendvalue',
      );

      expect($body).toHandle('changeendvalue');
      expect(spy).toHaveBeenCalled();
    });

    it('При событии setstartvalue устанавливается новое положение бегунка', () => {
      spyOnCustomEvent(
        controller.startValueRunner,
        'setRunnerPosition',
        'setstartvalue',
      );

      expect($body).toHandle('setstartvalue');
      expect(spy).toHaveBeenCalled();
    });

    it('При событии setstartvalue обновляется подсказка', () => {
      spyOnCustomEvent(
        controller.startValueTip,
        'updateTip',
        'setstartvalue',
      );

      expect($body).toHandle('setstartvalue');
      expect(spy).toHaveBeenCalled();
    });

    it('При событии setstartvalue обновляется дорожка слайдера', () => {
      spyOnCustomEvent(
        controller.track,
        'animateTrack',
        'setstartvalue',
      );

      expect($body).toHandle('setstartvalue');
      expect(spy).toHaveBeenCalled();
    });

    it('При событии setendvalue устанавливается новое положение второго бегунка', () => {
      spyOnCustomEvent(
        controller.endValueRunner,
        'setRunnerPosition',
        'setendvalue',
      );

      expect($body).toHandle('setendvalue');
      expect(spy).toHaveBeenCalled();
    });

    it('При событии setendvalue обновляется подсказка', () => {
      spyOnCustomEvent(
        controller.endValueTip,
        'updateTip',
        'setendvalue',
      );

      expect($body).toHandle('setendvalue');
      expect(spy).toHaveBeenCalled();
    });

    it('При событии setendvalue обновляется дорожка слайдера', () => {
      spyOnCustomEvent(
        controller.track,
        'animateTrack',
        'setendvalue',
      );

      expect($body).toHandle('setendvalue');
      expect(spy).toHaveBeenCalled();
    });

    it('При событии mouseup обработчики удаляются', () => {
      const spyOnWindowMouseMove = spyOn(<any>controller, '_handleWindowMouseMove');
      $window.mouseup();
      $window.mousemove();

      expect(spyOnWindowMouseMove).not.toHaveBeenCalled();

      const spyOnRunnerMove = spyOn(<any>controller, '_handleRunnerMove');
      $runner.trigger('move');

      expect(spyOnRunnerMove).not.toHaveBeenCalled();
    });

    it('При событии resize обновляется вид слайдера', () => {
      const spy = spyOn((<any>controller).view, 'updateSlider');
      $window.trigger('resize');

      expect(spy).toHaveBeenCalled();
    });
  });
});
