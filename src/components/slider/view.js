export default class SliderView {

  constructor (options) {
    this.el = options.el;
    this.runner = null;
    this.leftOffset = this.el.getBoundingClientRect().left + pageXOffset;
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
    this.runner = document.createElement('div');
    this.runner.classList.add('slider__runner');
    this.runner.style.position = 'absolute';
    this.runner.style.left = '0px';
    this.el.append(this.runner);
  }

  drawSlider () {
    if (!this.isGenerated) {
      this.drawSliderProgress();
      this.drawSliderRunner();
      this.isGenerated = true;
    }
  }

  moveRunner (e) {
    if (e.coordX) {
      this.runner.style.left = e.coordX + 'px';
      return;
    }

    let buttonOffset = e.pageX;

    if (buttonOffset < this.leftOffset) {
      buttonOffset = 0;
    } else if (buttonOffset > this.leftOffset + this.el.offsetWidth - this.runner.offsetWidth) {
      buttonOffset = this.el.offsetWidth - this.runner.offsetWidth;
    } else {
      buttonOffset = e.pageX - this.leftOffset;
    }

    this.runner.style.left = buttonOffset + 'px';
  }

}




