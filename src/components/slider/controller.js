export default class SliderController {
  constructor (view, model) {
    this.view = view;
    this.model = model;
    this.runner1 = view.runner1;
    this.runner2 = view.runner2;
    this.type = view.type;
    this.onmove = this.onmove.bind(this);
    this.onmousedown = this.onmousedown.bind(this);
    this.onmousemove = this.onmousemove.bind(this);
    this.onmouseup = this.onmouseup.bind(this);
  }

  onmousedown (runner) {
    return (e) => {
      let runnerType = runner === this.runner1 ? 'startValue' : 'endValue';

      this.view.setRunnerShiftX(e, runner);
      this.view.setRunnerShiftY(e, runner);
      e.preventDefault();

      let mousemove = this.onmousemove(runner, runnerType);
      let mouseup = this.onmouseup(mousemove);
      let onmove = this.onmove(runnerType);

      window.addEventListener('mousemove', mousemove);
      window.addEventListener('mouseup', mouseup);
      this.view.el.addEventListener('move', onmove);
    }
  };

  onmove (runnerType) {
    return (e) => {
      this.model.calculateValue(e.detail, runnerType);
    }
  }

  onmousemove (runner, runnerType) {
    return (e) => {
      let coefficient = this.model.calculateCoefficient(this.model[runnerType]);

      this.view.moveRunner(e, runner);
      this.view.setRunnerPosition(runner, coefficient);
      this.view.animateProgress(e, runner);
      this.view._updateSliderTip(runner, this.model[runnerType]);
    }
  };

  onmouseup (handler) {
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
    if (this.type === 'interval') {
      this.addHandlers(this.runner2);
    }
  }
}