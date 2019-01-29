import SliderView from './view';
import SliderModel from './model';
import SliderController from './controller';

window.addEventListener('load', function () {
  let element = document.getElementsByClassName('slider')[0];
  // let slider = new SliderView({el: element});
  // slider.drawSlider();
  //
  // let sliderModel = new SliderModel();
  // let sliderController = new SliderController(slider, sliderModel);
  // sliderController.init();

  function initPlugin (options) {
    let sliderModel = new SliderModel({
      startValue: options.startValue,
      endValue: options.endValue,
      minVal: options.minVal,
      maxVal: options.maxVal,
      step: options.step
    });

    let sliderView = new SliderView({
      el: options.element,
      type: options.type,
      orientation: options.orientation,
      model: sliderModel,
      isTip: options.isTip
    });
    sliderView.drawSlider();

    let sliderController = new SliderController(sliderView, sliderModel);
    sliderController.init();
  }

  initPlugin({
    startValue: 10,
    endValue: 80,
    minVal: 5,
    maxVal: 150,
    element,
    type: 'interval',
    orientation: 'vertical',
    step: 15,
    isTip: true
  });
});