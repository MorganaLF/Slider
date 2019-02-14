import $ from 'jquery';
import SliderView from '../components/slider/view';
import SliderModel from '../components/slider/model';
import SliderController from "../components/slider/controller";

/* CONTROLLER */

describe('SliderController', function () {
  let sliderView,
      sliderModel,
      sliderController;

  beforeEach(function () {
    sliderModel = new SliderModel();
    sliderView = new SliderView();
    sliderController = new SliderController(sliderView, sliderModel);
  });

  it('Создается экземпляр класса SliderController', function () {
    expect(sliderController).toBeDefined();
  });

});

describe('SliderController. Метод init (событие changestartvalue)', function () {
  let element,
      sliderView,
      runner,
      sliderModel,
      sliderController,
      spy,
      spyOnCustomEvent;

  beforeEach(function () {
    setFixtures('<div class="slider"></div>');
    element = $('.slider');
    sliderModel = new SliderModel({type: 'interval'});
    sliderView = new SliderView({el: element, model: sliderModel, type: 'interval'});
    sliderView.updateSlider();
    runner = $('.slider__runner');

    sliderController = new SliderController(sliderView, sliderModel);
    sliderController.init();

    spyOnCustomEvent = function (obj, func, event) {
      spy = spyOn(obj, func);
      spyOnEvent('body', event);

      $('body').trigger({
        model: sliderModel,
        type: event,
      });
    }

  });

  it('При клике на runner и движении мыши пересчитывается значение модели', function () {
    let spy = spyOn(sliderModel, 'calculateValue');
    $(runner).mousedown();
    $(window).mousemove();
    expect(spy).toHaveBeenCalled();
  });

  it('При клике на runner устанавливается shift бегунка', function () {
    let spy = spyOn(sliderController.runner1, 'setRunnerShiftX');
    let spy2 = spyOn(sliderController.runner1, 'setRunnerShiftY');

    $(runner).mousedown();

    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('При событии changestartvalue устанавливается новое положение бегунка', function () {
    spyOnCustomEvent(sliderController.runner1, 'setRunnerPosition', "changestartvalue");
    expect($('body')).toHandle("changestartvalue");
    expect(spy).toHaveBeenCalled();
  });

  it('При событии changestartvalue обновляется подсказка', function () {
    spyOnCustomEvent(sliderController.tip1, 'updateTip', "changestartvalue");
    expect($('body')).toHandle("changestartvalue");
    expect(spy).toHaveBeenCalled();
  });

  it('При событии changestartvalue обновляется дорожка слайдера', function () {
    spyOnCustomEvent(sliderController.track, 'animateTrack', "changestartvalue");
    expect($('body')).toHandle("changestartvalue");
    expect(spy).toHaveBeenCalled();
  });

  it('При событии changeendvalue устанавливается новое положение второго бегунка', function () {
    spyOnCustomEvent(sliderController.runner2, 'setRunnerPosition', "changeendvalue");
    expect($('body')).toHandle("changeendvalue");
    expect(spy).toHaveBeenCalled();
  });

  it('При событии changeendvalue обновляется подсказка', function () {
    spyOnCustomEvent(sliderController.tip2, 'updateTip', "changeendvalue");
    expect($('body')).toHandle("changeendvalue");
    expect(spy).toHaveBeenCalled();
  });

  it('При событии changeendvalue обновляется дорожка слайдера', function () {
    spyOnCustomEvent(sliderController.track, 'animateTrack', "changeendvalue");
    expect($('body')).toHandle("changeendvalue");
    expect(spy).toHaveBeenCalled();
  });
});