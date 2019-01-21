export default class SliderController {
  constructor (view, model) {
    this.view = view;
    this.model = model;
    this.runner = view.runner;
  }

  addHandlers () {
    this.runner.onmousedown = (e) => {
      this.view.setRunnerShiftX(e);
      this.model.setRunnerShiftX(e, this.view.el);

      document.onmousemove = (e) => {
        this.view.moveRunner(e);
        this.view.animateProgress(e);
        this.model.calculateValue(this.view.el, e.pageX); /* ИСПРАВИТЬ */
        this.view._updateSliderTip(this.model.currentValue);
      };

      document.onmouseup = (e) => {
        this.removeHandlers();
      };

      return false;
    };

    this.runner.ondragstart = function() {
      return false;
    };
  }

  removeHandlers () {
    document.onmousemove = document.onmouseup = null;
  }
}