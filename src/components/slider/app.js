import SliderView from './view';
import SliderModel from './model';

window.addEventListener('load', function () {
  let element = document.getElementsByClassName('slider')[0];
  let slider = new SliderView({el: element});
  slider.drawSlider();
  slider.addHandlers();

  let runner = element.getElementsByClassName('slider__runner')[0];
  let sliderModel = new SliderModel({
    el: element,
    runner: runner
  });

})