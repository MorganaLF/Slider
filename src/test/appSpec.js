import SliderView from '../components/slider/view';
import SliderModel from '../components/slider/model';
import $ from 'jquery';
import SliderController from "../components/slider/controller";
import RunnerView from '../components/slider/runner/RunnerView';

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
//   it('Создает экземпляр класса SliderView', function () {
//     expect(slider).toBeDefined();
//   });
//
//   it('подгружает fixtures', function () {
//     expect($('.slider')).toExist();
//   });
//
//   it('Функция должна создавать элемент slider__progress внутри элемента slider', function () {
//     expect($('.slider .slider__progress')).toExist();
//   });
//
//   it('Функция должна создавать элемент slider__progress-full внутри элемента slider__progress', function () {
//     expect($('.slider .slider__progress .slider__progress-full')).toExist();
//   });
//
//   it('Функция должна создавать элемент slider__runner внутри элемента slider', function () {
//     expect($('.slider .slider__runner')).toExist();
//   });
//
//   it('Класс позволяет задать тип слайдера "interval"', function () {
//     slider.type = 'interval';
//     expect(slider.type).toEqual('interval');
//   });
//
//   it('Функция создает два элемента slider__runner, если тип слайдера "interval"', function () {
//     expect($('.slider .slider__runner').length).toEqual(2);
//   });
//
//   it('Функция по умолчанию должна создавать элемент slider__tip внутри элемента slider__runner', function () {
//     expect($('.slider .slider__runner .slider__tip')).toExist();
//   });
//
//   it('Функция должна рисовать слайдер только один раз', function () {
//     slider.drawSlider();
//     expect($('.slider .slider__progress').length).toEqual(1);
//   });
// });
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

describe('07 RunnerView', function () {
  let runnerView,
      parent;

  beforeEach(function () {
    setFixtures('<div class="slider"></div>');
    parent = document.getElementsByClassName('slider')[0];
    runnerView = new RunnerView({parent: parent});
  });

  it('Создается экземпляр класса RunnerView', function () {
    expect(runnerView).toBeDefined();
  });

});

describe('08 Функция drawRunner', function () {
  let runnerView,
      parent,
      slider,
      sliderModel;

  beforeEach(function () {
    setFixtures('<div class="slider"></div>');
    parent = document.getElementsByClassName('slider')[0];
    sliderModel = new SliderModel();
    slider = new SliderView({el: parent, model: sliderModel});
    slider.type = 'interval';
    slider.drawSlider();
    runnerView = new RunnerView({parent: slider});
    runnerView.drawRunner(parent, 2);
  });

  it('Должна создавать элемент slider__runner внутри элемента slider', function () {
    expect($('.slider .slider__runner')).toExist();
  });

  it('Создает подсказку, если isTip = true', function () {
    runnerView.isTip = true;
    runnerView.drawRunner(parent);
    expect($('.slider .slider__runner .slider__tip')).toExist();
  });

});

describe('09 Функция setRunnerPosition', function () {
  let runnerView,
      parent,
      slider,
      sliderModel,
      runner;

  beforeEach(function () {
    setFixtures('<div class="slider"></div>');
    parent = document.getElementsByClassName('slider')[0];

    sliderModel = new SliderModel();

    slider = new SliderView({el: parent, model: sliderModel});
    slider.type = 'interval';
    slider.drawSlider();

    runnerView = new RunnerView({parent: slider});
    runnerView.drawRunner(parent, 1);
    runner = document.getElementsByClassName('slider__runner')[0];
  });

  it('Ползунку можно задать положение', function () {
    runnerView.el.style.width = '50px';
    parent.style.width = '350px';
    runnerView.setRunnerPosition(2);
    expect(runnerView.el.style.left).toEqual('150px');
  });

});

describe('10 Функция setRunnerShiftX', function () {
  let runnerView,
      parent,
      slider,
      sliderModel,
      runner;

  beforeEach(function () {
    setFixtures('<div class="slider"></div>');
    parent = document.getElementsByClassName('slider')[0];

    sliderModel = new SliderModel();

    slider = new SliderView({el: parent, model: sliderModel});
    slider.type = 'interval';
    slider.drawSlider();

    runnerView = new RunnerView({parent: slider});
    runnerView.drawRunner(parent, 1);
    runner = document.getElementsByClassName('slider__runner')[0];
  });

  it('Сохраняет смещение курсора относительно ползунка', function () {
    runnerView.setRunnerShiftX({pageX: 10});
    expect(runnerView.shiftX).toEqual(10 - runnerView.el.getBoundingClientRect().left);
  });

});

describe('11 Функция setRunnerShiftY', function () {
  let runnerView,
      parent,
      slider,
      sliderModel,
      runner;

  beforeEach(function () {
    setFixtures('<div class="slider"></div>');
    parent = document.getElementsByClassName('slider')[0];

    sliderModel = new SliderModel();

    slider = new SliderView({el: parent, model: sliderModel});
    slider.type = 'interval';
    slider.drawSlider();

    runnerView = new RunnerView({parent: slider});
    runnerView.drawRunner(parent, 1);
    runner = document.getElementsByClassName('slider__runner')[0];
  });

  it('Сохраняет смещение курсора относительно ползунка', function () {
    runnerView.setRunnerShiftY({pageY: 10});
    expect(runnerView.shiftY).toEqual(10 - runnerView.el.getBoundingClientRect().top);
  });

});

describe('12 Функция moveRunner', function () {
  let runnerView,
      parent,
      slider,
      sliderModel,
      runner;

  beforeEach(function () {
    setFixtures('<div class="slider"></div>');
    parent = document.getElementsByClassName('slider')[0];

    sliderModel = new SliderModel();

    slider = new SliderView({el: parent, model: sliderModel});
    slider.type = 'interval';
    slider.drawSlider();

    runnerView = new RunnerView({parent: slider});
    runnerView.drawRunner(parent, 1);
    runner = document.getElementsByClassName('slider__runner')[0];
  });

  it('Генерирует событие, отправляя коэффициент и тип ползунка', function () {
    runnerView.moveRunner({pageX: 30});
    expect().toEqual(30);
  });

});

