export default class SliderController {
  constructor (view, model) {
    this.view = view;
    this.model = model;
    this.runner1 = view.runner1;
    this.runner2 = view.runner2;
    this.curVal = 0;
  }

  onmousedown = (runner) => {
    return (e) => {
      let runnerType = runner === this.runner1 ? 'startValue' : 'endValue';

      this.view.setRunnerShiftX(e, runner);
      this.model.setRunnerShiftX(e, runner.el);
      e.preventDefault();

      let mousemove = this.onmousemove(runner);
      let mouseup = this.onmouseup(mousemove);

      window.addEventListener('mousemove', mousemove);
      window.addEventListener('mouseup', mouseup);

      this.view.el.addEventListener('move', (e) => {
        this.curVal = this.model.calculateValue(e.detail, runnerType); /* ИСПРАВИТЬ */
      });
    }
  };

  onmousemove = ( runner ) => {
    return (e) => {

      this.view.moveRunner(e, runner);
      this.view.animateProgress(e);

      //let curVal = this.model.calculateValue(this.view.el, e.pageX, runner.el, runnerType); /* ИСПРАВИТЬ */
      this.view._updateSliderTip(runner, this.curVal);
    }
  };

  onmouseup = (handler) => {
    return (e) => {
      window.removeEventListener( 'mousemove', handler );
      window.removeEventListener( 'mouseup', this.onmouseup );
    }
  };

  addHandlers (runner) {
    let onmousedown = this.onmousedown(runner);
    runner.el.addEventListener( 'mousedown', onmousedown );
  }

  init () {
    this.addHandlers(this.runner1);
    this.addHandlers(this.runner2);
  }
}