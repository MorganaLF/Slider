export default class SliderController {
  constructor (view, model) {
    this.view = view;
    this.model = model;
    this.runner1 = view.runner1;
    this.runner2 = view.runner2;
    this.tip1 = view.tip1;
    this.tip2 = view.tip2;
    this.track = view.track;
    this.type = view.type;
    this.onmove = this.onmove.bind(this);
    this.onchangestartvalue = this.onchangestartvalue.bind(this);
    this.onchangeendvalue = this.onchangeendvalue.bind(this);
    this.onmousedown = this.onmousedown.bind(this);
    this.onmousemove = this.onmousemove.bind(this);
    this.onmouseup = this.onmouseup.bind(this);
  }

  onmousedown (runner) {
    return (e) => {
      let runnerType = runner === this.runner1 ? 'startValue' : 'endValue';

      runner.setRunnerShiftX(e);
      runner.setRunnerShiftY(e);
      e.preventDefault();

      let mousemove = this.onmousemove(runner, runnerType);
      let mouseup = this.onmouseup(mousemove);
      let onmove = this.onmove(runner, runnerType);

      window.addEventListener('mousemove', mousemove);
      window.addEventListener('mouseup', mouseup);
      runner.el.addEventListener('move', onmove);
      document.body.addEventListener('changestartvalue', this.onchangestartvalue);
      document.body.addEventListener('changeendvalue', this.onchangeendvalue);
    }
  };

  onmove (runner, runnerType) {
    return (e) => {
      this.model.calculateValue(e.detail, runnerType);
      //runner.setRunnerPosition(coefficient);
      //this.track.animateProgress(coefficient);
    }
  }

  onchangestartvalue(e) {
    this.runner1.setRunnerPosition(e.detail.coefficient);
    this.tip1.updateTip(e.detail.value);
    this.track.animateProgress(e.detail.coefficient);
  }

  onchangeendvalue(e) {
    this.runner2.setRunnerPosition(e.detail.coefficient);
    this.tip2.updateTip(e.detail.value);
    this.track.animateProgress(e.detail.coefficient);
  }

  onmousemove (runner) {
    return (e) => {
      runner.moveRunner(e);
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