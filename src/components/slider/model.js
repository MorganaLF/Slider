import SliderView from "./view";

export default class SliderModel {
  constructor (options) {
    this.el = options.el;
    this.runner = options.runner;
    this.leftOffset = this.el.getBoundingClientRect().left + pageXOffset;
  }

  prepareRunner (e) {
    this.runner.style.position = 'absolute';
    this.runner.style.left = e.pageX - this.leftOffset + 'px';
  }

  addHandlers () {
    this.runner.onmousedown = (e) => {
      let event = e;
      this.prepareRunner(event);
      return false;
    };
  }
}

window.addEventListener('load', function () {
  let element = document.getElementsByClassName('slider')[0];
  let runner = element.getElementsByClassName('slider__runner')[0];
  let sliderModel = new SliderModel({
    el: element,
    runner: runner
  });
  sliderModel.addHandlers();
});