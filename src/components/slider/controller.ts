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
    this._onmove = this._onmove.bind(this);
    this._onchangevalue = this._onchangevalue.bind(this);
    this._onmousedown = this._onmousedown.bind(this);
    this._onmousemove = this._onmousemove.bind(this);
    this._onmouseup = this._onmouseup.bind(this);
  }

  _onmousedown (runner) {
    return (e) => {
      e.preventDefault();

      let runnerType: string = runner === this.runner1 ? 'startValue' : 'endValue';

      runner.setRunnerShiftX(e);
      runner.setRunnerShiftY(e);

      let mousemove = this._onmousemove(runner);
      let onmove = this._onmove(runner, runnerType);
      let mouseup = this._onmouseup(mousemove, onmove, runner);

      $(window).on('mousemove', mousemove);
      $(window).on('mouseup', mouseup);
      runner.el.on('move', onmove);

    }
  };

  _onmove (runner, runnerType: string) {
    return (e) => {
      this.model.calculateValue(e.detail, runnerType);
    }
  }

  _onchangevalue (runner, tip, point: number) {
    return (e) => {
      if (e.model !== this.model) {
        return;
      }
      runner.setRunnerPosition(e.coefficient);
      if (this.isTip) {
        tip.updateTip(e.value);
      }
      this.track.animateTrack(e.coefficient, point);
    }
  }

  _onmousemove (runner) {
    return (e) => {
      runner.moveRunner(e);
    }
  };

  _onmouseup (mousemovehandler, onmovehandler, runner) {
    return (e) => {
      $(window).off( 'mousemove', mousemovehandler );
      $(window).off( 'mouseup', this._onmouseup );
      runner.el.off('move', onmovehandler);
    }
  };

  _addHandlers (runner, tip, changeevent: string, point: number): void {
    let onmousedown = this._onmousedown(runner);
    let changevalue = this._onchangevalue(runner, tip, point);

    runner.el.on( 'mousedown', onmousedown );
    $('body').on(changeevent, changevalue);
  }

  init (): void {
    this._addHandlers(this.runner1, this.tip1, 'changestartvalue', 'start');
    if (this.type === 'interval') {
      this._addHandlers(this.runner2, this.tip2, 'changeendvalue', 'end');
    }
  }
}