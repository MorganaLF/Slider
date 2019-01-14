export default class SliderView {

  constructor (options) {
    this.el = options.el;
    this.isGenerated = false;
  }

  drawSliderProgress () {
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

let element = document.createElement('div');
element.classList.add('slider');
document.body.appendChild(element);

let slider = new SliderView({el: element});
slider.drawSlider();

