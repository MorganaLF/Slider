import SliderView from './view';
import SliderModel from './model';
import SliderController from './controller';

window.addEventListener('load', function () {
  let element = document.getElementsByClassName('slider')[0];
  let slider = new SliderView({el: element});
  slider.drawSlider();

  let sliderModel = new SliderModel();
  let sliderController = new SliderController(slider, sliderModel);
  sliderController.init();

});