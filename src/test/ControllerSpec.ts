import Controller from '../plugin/Controller/Controller';
import Model from '../plugin/Model/Model';
import MainView from '../plugin/View/MainView/MainView';

describe('Controller', () => {
  const $body = $('body');
  const $window = $(window);
  let $element: JQuery;
  let $runner: JQuery;
  let view: MainView;
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

    view = new MainView({
      $element,
      type: 'interval',
      orientation: 'horizontal',
      withTip: true,
      withScale: true,
      elementIndex: 0,
    });

    view.updateSlider();
    controller = new Controller(view, model);
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
      const spy = spyOn(model, 'setRangeBoundByRatio');
      $runner.mousedown();
      $window.mousemove();

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
