import SliderView from '../components/slider/view';
import SliderModel from '../components/slider/model';
import $ from 'jquery';
import SliderController from "../components/slider/controller";
import RunnerView from '../components/slider/runner/RunnerView';
import TipView from '../components/slider/tip/TipView';
import TrackView from '../components/slider/track/TrackView';
import ScaleView from '../components/slider/scale/ScaleView';

// /* VIEW */
//
// describe('01 Функция drawSlider должна рисовать слайдер', function () {
//   let element,
//       slider,
//       sliderModel;
//
//   beforeEach(function() {
//     setFixtures('<div class="slider"></div>');
//     element = document.getElementsByClassName('slider')[0];
//     sliderModel = new SliderModel();
//     slider = new SliderView({el: element, model: sliderModel});
//     slider.type = 'interval';
//     slider.drawSlider();
//   });
//

//
// describe('02 Движение ползунка слайдера', function () {
//   let element,
//       slider,
//       runner,
//       progress,
//       sliderModel;
//
//   beforeEach(function() {
//     setFixtures('<div class="slider"></div>');
//     element = document.getElementsByClassName('slider')[0];
//     sliderModel = new SliderModel();
//     slider = new SliderView({el: element, model: sliderModel});
//     slider.drawSlider();
//     runner = element.getElementsByClassName('slider__runner')[0];
//     progress = element.getElementsByClassName('slider__progress-full')[0];
//   });
//
//   it('Ползунку можно задать положение', function () {
//     slider.setRunnerPosition(this.runner1, 10);
//     expect(runner.style.left).toEqual('10px');
//   });
//
//   it('Линии прогресса можно задать длину', function () {
//     slider.setProgressWidth(10);
//     expect(progress.style.width).toEqual('10px');
//   })
// });
//
// /* MODEL */
//
// describe('03 SliderModel', function () {
//   let sliderModel;
//
//   beforeEach(function() {
//     sliderModel = new SliderModel();
//   });
//
//   it('Создает экземпляр класса', function () {
//     expect(sliderModel).toBeDefined();
//   });
//
//   it('По умолчанию объект хранит значение value равное 0', function () {
//     expect(sliderModel.currentValue).toEqual(0);
//   });
//
//   it('Позволяет установить текущее значение value', function () {
//     sliderModel.currentValue = 10;
//     expect(sliderModel.currentValue).toEqual(10);
//   });
//
//   it('Метод setExtremeValues позволяет задать максимальное и минимальное значение', function () {
//     sliderModel.extremeValues = {min: 50, max: 5000};
//     expect(sliderModel.extremeValues.min).toEqual(50);
//     expect(sliderModel.extremeValues.max).toEqual(5000);
//   });
//
//   it('Метод getSliderType позволяет получить тип слайдера', function () {
//     expect(sliderModel.sliderType).toEqual('single');
//   });
//
//   it('Метод setSliderType позволяет установить тип слайдера', function () {
//     sliderModel.sliderType = 'interval';
//     expect(sliderModel.sliderType).toEqual('interval');
//   });
//
//   it('Метод setSliderType не позволяет установить не предусмотренный тип', function () {
//     sliderModel.sliderType = '123';
//     expect(sliderModel.sliderType).toEqual('single');
//   });
//
//   it('Метод calculateValue считает текущее значение слайдера в зависимости от позиции курсора', function () {
//     sliderModel.calculateValue(2, 'startValue');
//     expect(sliderModel.startValue).toEqual(50);
//
//     sliderModel.calculateValue(1, 'endValue');
//     expect(sliderModel.endValue).toEqual(100);
//   });
//
// });
//
// /* CONTROLLER */
//
// describe('04 Controller', function () {
//   let element,
//       slider,
//       runner,
//       sliderModel,
//       sliderController;
//
//   beforeEach(function () {
//     setFixtures('<div class="slider"></div>');
//     element = document.getElementsByClassName('slider')[0];
//
//     sliderModel = new SliderModel();
//
//     slider = new SliderView({el: element, model: sliderModel});
//     slider.drawSlider();
//     runner = element.getElementsByClassName('slider__runner')[0];
//
//     sliderController = new SliderController(slider, sliderModel);
//     sliderController.init();
//     spyOn(slider, 'moveRunner');
//     spyOn(sliderController, 'onmouseup');
//     $(runner).mousedown();
//     $(window).mousemove();
//     $(window).mouseup();
//   });
//
//   it('Метод moveRunner запускается при клике на runner', function () {
//     expect(slider.moveRunner).toHaveBeenCalled();
//   });
//
//   it('При отпускании клавиши мыши все события прекращаются', function () {
//     $(window).mouseup();
//     expect(sliderController.onmouseup).toHaveBeenCalled();
//   });
// });
//
// /* VERTICAL SLIDER */
//
// describe('05 Вертикальный слайдер', function () {
//   let element,
//       slider,
//       runner,
//       progress,
//       sliderModel;
//
//   beforeEach(function() {
//     setFixtures('<div class="slider"></div>');
//     element = document.getElementsByClassName('slider')[0];
//     sliderModel = new SliderModel();
//     slider = new SliderView({el: element, model: sliderModel});
//     slider.drawSlider();
//     runner = element.getElementsByClassName('slider__runner')[0];
//     progress = element.getElementsByClassName('slider__progress-full')[0];
//   });
//
//   it('По умолчанию слайдер имеет горизонтальную ориентацию', function () {
//     expect(slider.orientation).toEqual('horizontal');
//   });
//
//   it('Слайдеру можно изменить ориентацию', function () {
//     slider.sliderOrientation = 'vertical';
//     expect(slider.orientation).toEqual('vertical');
//   });
//
//   it('При вертикальной ориентации создается прогресс-бар с классом slider__progress_vertical', function () {
//     slider.sliderOrientation = 'vertical';
//     expect($('.slider .slider__progress.slider__progress_vertical')).toExist();
//   });
//
//   it('При вертикальной ориентации создается элемент с классом slider__progress-full_vertical', function () {
//     slider.sliderOrientation = 'vertical';
//     expect($('.slider .slider__progress-full.slider__progress-full_vertical')).toExist();
//   });
//
//   it('При вертикальной ориентации создается элемент с классом slider__tip_vertical', function () {
//     slider.sliderOrientation = 'vertical';
//     expect($('.slider .slider__tip.slider__tip_vertical')).toExist();
//   });
// });
//
// /* STEP MODEL */
//
// describe('06 SliderModel', function () {
//   let sliderModel;
//
//   beforeEach(function () {
//     sliderModel = new SliderModel();
//   });
//
//   it('Позволяет задать свойство stepSize', function () {
//     sliderModel.stepSize = 5;
//     expect(sliderModel.step).toEqual(5);
//   });
//
//   it('Метод calculateStepValue позволяет посчитать текущее значение с учетом размера шага', function () {
//     sliderModel.stepSize = 20;
//     expect(sliderModel.calculateStepValue(2)).toEqual(60);
//   });
// });




/* RUNNER VIEW */

// describe('07 RunnerView', function () {
//   let runnerView,
//       parent;
//
//   beforeEach(function () {
//     setFixtures('<div class="slider"></div>');
//     parent = document.getElementsByClassName('slider')[0];
//     runnerView = new RunnerView({parent: parent});
//   });
//
//   it('Создается экземпляр класса RunnerView', function () {
//     expect(runnerView).toBeDefined();
//   });
//
// });
//
// describe('08 Функция drawRunner', function () {
//   let runnerView,
//       parent,
//       slider,
//       sliderModel;
//
//   beforeEach(function () {
//     setFixtures('<div class="slider"></div>');
//     parent = document.getElementsByClassName('slider')[0];
//     sliderModel = new SliderModel();
//     slider = new SliderView({el: parent, model: sliderModel});
//     slider.type = 'interval';
//     slider.drawSlider();
//     runnerView = new RunnerView({parent: slider});
//     runnerView.drawRunner(parent, 2);
//   });
//
//   it('Должна создавать элемент slider__runner внутри элемента slider', function () {
//     expect($('.slider .slider__runner')).toExist();
//   });
//
//   // it('Создает подсказку, если isTip = true', function () {
//   //   runnerView.isTip = true;
//   //   runnerView.drawRunner(parent);
//   //   expect($('.slider .slider__runner .slider__tip')).toExist();
//   // });
//
// });
//
// describe('09 Функция setRunnerPosition', function () {
//   let runnerView,
//       parent,
//       slider,
//       sliderModel,
//       runner;
//
//   beforeEach(function () {
//     setFixtures('<div class="slider"></div>');
//     parent = document.getElementsByClassName('slider')[0];
//
//     sliderModel = new SliderModel();
//
//     slider = new SliderView({el: parent, model: sliderModel});
//     slider.type = 'interval';
//     slider.drawSlider();
//
//     runnerView = new RunnerView({parent: slider});
//     runnerView.drawRunner(parent, 1);
//     runner = document.getElementsByClassName('slider__runner')[0];
//   });
//
//   it('Ползунку можно задать положение', function () {
//     runnerView.el.style.width = '50px';
//     parent.style.width = '350px';
//     runnerView.setRunnerPosition(2);
//     expect(runnerView.el.style.left).toEqual('150px');
//   });
//
// });
//
// describe('10 Функция setRunnerShiftX', function () {
//   let runnerView,
//       parent,
//       slider,
//       sliderModel,
//       runner;
//
//   beforeEach(function () {
//     setFixtures('<div class="slider"></div>');
//     parent = document.getElementsByClassName('slider')[0];
//
//     sliderModel = new SliderModel();
//
//     slider = new SliderView({el: parent, model: sliderModel});
//     slider.type = 'interval';
//     slider.drawSlider();
//
//     runnerView = new RunnerView({parent: slider});
//     runnerView.drawRunner(parent, 1);
//     runner = document.getElementsByClassName('slider__runner')[0];
//   });
//
//   it('Сохраняет смещение курсора относительно ползунка', function () {
//     runnerView.setRunnerShiftX({pageX: 10});
//     expect(runnerView.shiftX).toEqual(10 - runnerView.el.getBoundingClientRect().left);
//   });
//
// });
//
// describe('11 Функция setRunnerShiftY', function () {
//   let runnerView,
//       parent,
//       slider,
//       sliderModel,
//       runner;
//
//   beforeEach(function () {
//     setFixtures('<div class="slider"></div>');
//     parent = document.getElementsByClassName('slider')[0];
//
//     sliderModel = new SliderModel();
//
//     slider = new SliderView({el: parent, model: sliderModel});
//     slider.type = 'interval';
//     slider.drawSlider();
//
//     runnerView = new RunnerView({parent: slider});
//     runnerView.drawRunner(parent, 1);
//     runner = document.getElementsByClassName('slider__runner')[0];
//   });
//
//   it('Сохраняет смещение курсора относительно ползунка', function () {
//     runnerView.setRunnerShiftY({pageY: 10});
//     expect(runnerView.shiftY).toEqual(10 - runnerView.el.getBoundingClientRect().top);
//   });
//
// });
//
// describe('12 Функция moveRunner', function () {
//   let runnerView,
//       parent,
//       slider,
//       sliderModel,
//       runner;
//
//   beforeEach(function () {
//     setFixtures('<div class="slider"></div>');
//     parent = document.getElementsByClassName('slider')[0];
//
//     sliderModel = new SliderModel();
//
//     slider = new SliderView({el: parent, model: sliderModel});
//     slider.type = 'interval';
//     slider.drawSlider();
//
//     runnerView = new RunnerView({parent: slider});
//     runnerView.drawRunner(parent, 1);
//     runner = document.getElementsByClassName('slider__runner')[0];
//   });
//
//   it('Генерирует событие, отправляя коэффициент и тип ползунка', function () {
//     runnerView.moveRunner({pageX: 30});
//     expect().toEqual(30);
//   });
//
// });
//
// /* TIP VIEW */
//
// describe('13 TipView', function () {
//   let tipView,
//       parent;
//
//   beforeEach(function () {
//     setFixtures('<div class="slider"></div>');
//     parent = document.getElementsByClassName('slider')[0];
//     tipView = new TipView();
//   });
//
//   it('Создается экземпляр класса RunnerView', function () {
//     expect(tipView).toBeDefined();
//   });
//
// });
//
// describe('14 Функция drawTip', function () {
//   let tipView,
//       element,
//       parent,
//       slider,
//       sliderModel;
//
//   beforeEach(function () {
//     setFixtures('<div class="slider"></div>');
//     element = document.getElementsByClassName('slider')[0];
//     sliderModel = new SliderModel();
//     slider = new SliderView({el: element, model: sliderModel});
//     slider.type = 'interval';
//     slider.drawSlider();
//     parent = document.getElementsByClassName('slider__runner')[0];
//     tipView = new TipView();
//     tipView.drawTip(parent);
//   });
//
//   it('Должна создавать элемент slider__runner внутри элемента slider', function () {
//     expect($('.slider .slider__runner .slider__tip')).toExist();
//   });
//
// });
//
// describe('14 Функция updateTip', function () {
//   let tipView,
//       element,
//       parent,
//       slider,
//       sliderModel;
//
//   beforeEach(function () {
//     setFixtures('<div class="slider"></div>');
//     element = document.getElementsByClassName('slider')[0];
//     sliderModel = new SliderModel();
//     slider = new SliderView({el: element, model: sliderModel});
//     slider.type = 'interval';
//     slider.drawSlider();
//     parent = document.getElementsByClassName('slider__runner')[0];
//     tipView = new TipView();
//     tipView.drawTip(parent);
//   });
//
//   it('Должна обновлять значение внутри подсказки', function () {
//     tipView.updateTip(15);
//     expect($('.slider .slider__runner .slider__tip').text()).toEqual('15');
//   });
//
// });
//
//
// /* TRACK VIEW */
//
// describe('15 TrackView', function () {
//   let trackView;
//
//   beforeEach(function () {
//     trackView = new TrackView();
//   });
//
//   it('Создается экземпляр класса TrackView', function () {
//     expect(trackView).toBeDefined();
//   });
//
// });
//
// describe('16 TrackView', function () {
//   let trackView,
//       parent;
//
//   beforeEach(function () {
//     setFixtures('<div class="slider"></div>');
//     parent = document.getElementsByClassName('slider')[0];
//     trackView = new TrackView();
//     trackView.drawTrack(parent);
//   });
//
//   it('Функция drawTrack создает элемент slider__track внутри указанного родителя', function () {
//     expect($('.slider .slider__track')).toExist();
//   });
//
// });
//
// describe('17 Функция animateTrack', function () {
//   let trackView,
//       parent,
//       slider,
//       sliderModel;
//
//   beforeEach(function () {
//     setFixtures('<div class="slider"></div>');
//     parent = document.getElementsByClassName('slider')[0];
//     parent.style.width = '300px';
//
//     sliderModel = new SliderModel();
//     slider = new SliderView({el: parent, model: sliderModel});
//     slider.drawSlider();
//
//     trackView = new TrackView({parent: slider});
//     trackView.drawTrack(parent);
//
//   });
//
//   it('Функция animateTrack устанавливает ширину дорожки, если тип слайдера single', function () {
//     trackView.animateProgress(2);
//     expect(trackView.trackFull.style.width).toEqual('150px');
//   });
//
//   it('Функция animateTrack устанавливает ширину и отступ дорожки, если тип слайдера interval', function () {
//     trackView.type = 'interval';
//     trackView.animateProgress();
//     expect(trackView.trackFull.style.left).toEqual('');
//     expect(trackView.trackFull.style.width).toEqual('150px');
//   });
//
// });


/* SCALE VIEW */

describe('ScaleView', function () {
  let scaleView;

  beforeEach(function () {
    scaleView = new ScaleView();
  });

  it('Создается экземпляр класса ScaleView', function () {
    expect(scaleView).toBeDefined();
  });

});

describe('ScaleView. Функция drawScale', function () {
  let scaleView,
      parent;

  beforeEach(function () {
    setFixtures('<div class="slider"></div>');
    parent = $('.slider');

    scaleView = new ScaleView();
    scaleView.drawScale(parent, 5, 25, 5);
  });

  it('Создает элемент slider__scale внутри указанного родителя', function () {
    expect($('.slider .slider__scale')).toExist();
  });

  it('Создает элементы slider__scale-item', function () {
    expect($('.slider .slider__scale .slider__scale-item')).toExist();
  });

  it('Количество элементов slider__scale-item определяется в зависимости от min, max и размера шага', function () {
    expect($('.slider').eq(0).find('.slider__scale .slider__scale-item').length).toEqual(5);
  });

  it('Элемент slider__scale-item содержит корректное значение', function () {
    expect($('.slider .slider__scale .slider__scale-item').eq(0).text()).toEqual('5');
    expect($('.slider .slider__scale .slider__scale-item').eq(1).text()).toEqual('10');
    expect($('.slider .slider__scale .slider__scale-item').eq(2).text()).toEqual('15');
  });

});