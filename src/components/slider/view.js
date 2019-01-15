export default class SliderView {

  constructor (options) {
    this.el = options.el;
    this.isGenerated = false;
  }

  drawSliderProgress () {
    this.el.style.position = 'relative';

    let sliderProgress = document.createElement('div');
    sliderProgress.classList.add('slider__progress');
    this.el.append(sliderProgress);

    let sliderProgressFull = document.createElement('div');
    sliderProgressFull.classList.add('slider__progress-full');
    sliderProgress.append(sliderProgressFull);
  }

  drawSliderRunner () {
    let sliderRunner = document.createElement('div');
    sliderRunner.classList.add('slider__runner');
    this.el.append(sliderRunner);
  }

  drawSlider () {
    if (!this.isGenerated) {
      this.drawSliderProgress();
      this.drawSliderRunner();
      this.isGenerated = true;
    }
  }

}

window.addEventListener('load', function () {
  let element = document.getElementsByClassName('slider')[0];
  let slider = new SliderView({el: element});
  slider.drawSlider();
})


