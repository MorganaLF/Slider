import SliderView from '../plugin/SliderView/SliderView';
import SliderModel from '../plugin/SliderModel/SliderModel';
import SliderController from '../plugin/SliderController/SliderController';

describe('SliderController', function() {
  let element,
    sliderView: SliderView,
    sliderModel: SliderModel,
    sliderController: SliderController;

  beforeEach(function() {
    setFixtures('<div class="slider"></div>');
    element = $('.slider');
    sliderModel = new SliderModel({
      startValue: 0,
      endValue: 100,
      minValue: 0,
      maxValue: 100,
      stepSize: 0,
      type: 'single',
    });
    sliderView = new SliderView({
      $element: element,
      type: 'single',
      orientation: 'horizontal',
      withTip: true,
      withScale: true,
      scaleMarksQuantity: 10,
    });
    sliderController = new SliderController(sliderView, sliderModel);
  });

  it('Создается экземпляр класса SliderController', function() {
    expect(sliderController).toBeDefined();
  });

});

describe('SliderController. Метод init (событие changestartvalue)', function() {
  let element,
    sliderView,
    runner: JQuery,
    sliderModel: SliderModel,
    sliderController: SliderController,
    spy: (obj: JQuery, func: any) => void,
    spyOnCustomEvent: (obj: any, func: any, event: string) => void;

  beforeEach(function() {
    setFixtures('<div class="slider"></div>');
    element = $('.slider');
    sliderModel = new SliderModel({
      startValue: 0,
      endValue: 100,
      minValue: 0,
      maxValue: 100,
      stepSize: 0,
      type: 'interval',
    });
    sliderView = new SliderView({
      $element: element,
      type: 'interval',
      orientation: 'horizontal',
      withTip: true,
      withScale: true,
      scaleMarksQuantity: 10,
    });
    sliderView.updateSlider();
    runner = $('.slider__runner');

    sliderController = new SliderController(sliderView, sliderModel);
    sliderController.init();

    spyOnCustomEvent = function(obj, func, event) {
      spy = spyOn(obj, func);
      spyOnEvent('body', event);
      const e = $.Event(event, { detail: { model: sliderModel } });
      $('body').trigger(e);
    };

  });

  it('При клике на runner и движении мыши пересчитывается значение модели', function() {
    const spy = spyOn(sliderModel, 'calculateValue');
    $(runner).mousedown();
    $(window).mousemove();
    expect(spy).toHaveBeenCalled();
  });

  it('При клике на runner устанавливается shift бегунка', function() {
    const spy = spyOn(sliderController.startValueRunner, (<never>'setRunnerShiftX'));
    const spy2 = spyOn(sliderController.startValueRunner, (<never>'setRunnerShiftY'));

    $(runner).mousedown();

    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('При событии changestartvalue устанавливается новое положение бегунка', function() {
    spyOnCustomEvent(sliderController.startValueRunner, 'setRunnerPosition', 'changestartvalue');
    expect($('body')).toHandle('changestartvalue');
    expect(spy).toHaveBeenCalled();
  });

  it('При событии changestartvalue обновляется подсказка', function() {
    spyOnCustomEvent(sliderController.startValueTip, 'updateTip', 'changestartvalue');
    expect($('body')).toHandle('changestartvalue');
    expect(spy).toHaveBeenCalled();
  });

  it('При событии changestartvalue обновляется дорожка слайдера', function() {
    spyOnCustomEvent(sliderController.track, 'animateTrack', 'changestartvalue');
    expect($('body')).toHandle('changestartvalue');
    expect(spy).toHaveBeenCalled();
  });

  it('При событии changeendvalue устанавливается новое положение второго бегунка', function() {
    spyOnCustomEvent(sliderController.endValueRunner, 'setRunnerPosition', 'changeendvalue');
    expect($('body')).toHandle('changeendvalue');
    expect(spy).toHaveBeenCalled();
  });

  it('При событии changeendvalue обновляется подсказка', function() {
    spyOnCustomEvent(sliderController.endValueTip, 'updateTip', 'changeendvalue');
    expect($('body')).toHandle('changeendvalue');
    expect(spy).toHaveBeenCalled();
  });

  it('При событии changeendvalue обновляется дорожка слайдера', function() {
    spyOnCustomEvent(sliderController.track, 'animateTrack', 'changeendvalue');
    expect($('body')).toHandle('changeendvalue');
    expect(spy).toHaveBeenCalled();
  });

  it('При событии resize обновляется вид слайдера', function() {
    const spy = spyOn((<any>sliderController).view, 'updateSlider');
    $(window).trigger('resize');
    expect(spy).toHaveBeenCalled();
  });
});
