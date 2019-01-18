export default class SliderController {
  constructor (view, model) {
    this.view = view;
    this.model = model;
    this.runner = view.runner;
  }

  addHandlers () {
    this.runner.onmousedown = (e) => {

      document.onmousemove = (e) => {
        this.view.moveRunner(e);
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