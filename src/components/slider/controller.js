import $ from 'jquery';

export default class SliderController {
  constructor (view, model) {
    this.view = view;
    this.model = model;
    this.isTip = view.isTip;
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
      e.preventDefault();

      let runnerType = runner === this.runner1 ? 'startValue' : 'endValue';

      runner.setRunnerShiftX(e);
      runner.setRunnerShiftY(e);

      let mousemove = this.onmousemove(runner);
      let onmove = this.onmove(runner, runnerType);
      let mouseup = this.onmouseup(mousemove, onmove, runner);

      $(window).on('mousemove', mousemove);
      $(window).on('mouseup', mouseup);
      runner.el.on('move', onmove);
      // $('body').on('changestartvalue', this.onchangestartvalue);
      // $('body').on('changeendvalue', this.onchangeendvalue);

    }
  };

  onmove (runner, runnerType) {
    return (e) => {
      this.model.calculateValue(e.detail, runnerType);
    }
  }

  onchangestartvalue(e) {
    if (e.model !== this.model) {
      return;
    }
    this.runner1.setRunnerPosition(e.coefficient);
    if (this.isTip) {
      this.tip1.updateTip(e.value);
    }
    this.track.animateTrack(e.coefficient, 'start');
  }

  onchangeendvalue(e) {
    if (e.model !== this.model) {
      return;
    }
    this.runner2.setRunnerPosition(e.coefficient);
    if (this.isTip) {
      this.tip2.updateTip(e.value);
    }
    this.track.animateTrack(e.coefficient, 'end');
  }

  onmousemove (runner) {
    return (e) => {
      runner.moveRunner(e);
    }
  };

  onmouseup (mousemovehandler, onmovehandler, runner) {
    return (e) => {
      $(window).off( 'mousemove', mousemovehandler );
      $(window).off( 'mouseup', this.onmouseup );
      runner.el.off('move', onmovehandler);
      // $('body').off('changestartvalue', this.onchangestartvalue);
      // $('body').off('changeendvalue', this.onchangeendvalue);
    }
  };

  addHandlers (runner) {
    let onmousedown = this.onmousedown(runner);
    runner.el.on( 'mousedown', onmousedown );
    $('body').on('changestartvalue', this.onchangestartvalue);
    $('body').on('changeendvalue', this.onchangeendvalue);
  }

  init () {
    this.addHandlers(this.runner1);
    if (this.type === 'interval') {
      this.addHandlers(this.runner2);
    }
  }
}