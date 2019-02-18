import $ from 'jquery';

export default class SliderController {
  private view: {};
  private model: {};
  private isTip: boolean;
  private runner1: {};
  private runner2: {};
  private tip1: {};
  private tip2: {};
  private track: {};
  private type: {};
  private _onmove: (runner: {}, runnerType: string) => (e: {}) => void;
  private _onchangevalue: (runner: {}, tip: {}, point: string) => (e: {}) => void;
  private _onmousedown: (runner: {}) => (e: {}) => void;
  private _onmousemove: (runner: {}) => (e: {}) => void;
  private _onmouseup: (
          mousemovehandler: (runner: {}) => () => void,
          onmovehandler: (runner: {}, runnerType: string) => () => void,
          runner: {}
      )
      => (e: {}) => void;

  constructor (view: {}, model: {}) {
    this.view = view;
    this.model = model;
    this.isTip = view.isTip;
    this.runner1 = view.runner1;
    this.runner2 = view.runner2;
    this.tip1 = view.tip1;
    this.tip2 = view.tip2;
    this.track = view.track;
    this.type = view.type;
    this._onmove = this.move.bind(this);
    this._onchangevalue = this.changevalue.bind(this);
    this._onmousedown = this.mousedown.bind(this);
    this._onmousemove = this.mousemove.bind(this);
    this._onmouseup = this.mouseup.bind(this);
  }

  private mousedown (runner: {}): (e: {}) => void {
    return (e): void => {
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

  private move (runner: {}, runnerType: string): (e: {}) => void {
    return (e): void => {
      this.model.calculateValue(e.detail, runnerType);
    }
  }

  private changevalue (runner: {}, tip: {}, point: string): (e: {}) => void {
    return (e): void => {
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

  private mousemove (runner: {}): (e: {}) => void {
    return (e): void => {
      runner.moveRunner(e);
    }
  };

  private mouseup (
    mousemovehandler: (runner: {}) => () => void,
    onmovehandler: (runner: {}, runnerType: string) => () => void,
    runner: {})
    : (e: {}) => void {
      return (e): void => {
        $(window).off( 'mousemove', mousemovehandler );
        $(window).off( 'mouseup', this._onmouseup );
        runner.el.off('move', onmovehandler);
      }
  };

  private _addHandlers (runner: {}, tip: {}, changeevent: string, point: string): void {
    let onmousedown = this._onmousedown(runner);
    let changevalue = this._onchangevalue(runner, tip, point);

    runner.el.on( 'mousedown', onmousedown );
    $('body').on(changeevent, changevalue);
  }

  public init (): void {
    this._addHandlers(this.runner1, this.tip1, 'changestartvalue', 'start');
    if (this.type === 'interval') {
      this._addHandlers(this.runner2, this.tip2, 'changeendvalue', 'end');
    }
  }
}