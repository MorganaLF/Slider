import $ from 'jquery';

interface ITipView {
    updateTip (val: number): void
}

interface ITrackView {
    drawTrack (parent: JQuery, coefficient: number, coefficientTwo: number): void,
    animateTrack (coefficient: number, pointName: string): void
}

interface ISliderModel {
    minVal: number,
    maxVal: number,
    startValue: number,
    endValue: number,
    calculateCoefficient (point: number): number,
    calculateValue (val: number, valueName: string): void | boolean
}

interface IRunnerView {
    el: JQuery,
    drawRunner (parent: JQuery, coefficient: number): void,
    setRunnerShiftX (e: JQuery.MouseDownEvent): void,
    setRunnerShiftY (e: JQuery.MouseDownEvent): void,
    setRunnerPosition (coefficient: number): void,
    moveRunner (e: JQuery.MouseMoveEvent): void
}

interface ITrackView {
    drawTrack (parent: JQuery, coefficient: number, coefficientTwo: number): void
}

interface ISliderView {
    runner1: null | IRunnerView,
    runner2: null | IRunnerView,
    tip1: null | ITipView,
    tip2: null | ITipView,
    track: null | ITrackView,
    type: string,
    isTip: boolean
}

export default class SliderController {
  private view: ISliderView;
  private model: ISliderModel;
  private isTip: boolean;
  private runner1: null | IRunnerView;
  private runner2: null | IRunnerView;
  private tip1: null | ITipView;
  private tip2: null | ITipView;
  private track: null | ITrackView;
  private type: string;
  private _onchangevalue: (runner: IRunnerView, tip: ITipView, point: string) => (e: Event) => void;
  private _onmousedown?: (e: JQuery.MouseDownEvent) => void;
  private _onmouseup?: (e: JQuery.MouseUpEvent) => void;

  constructor (view: ISliderView, model: ISliderModel) {
    this.view = view;
    this.model = model;
    this.isTip = view.isTip;
    this.runner1 = view.runner1;
    this.runner2 = view.runner2;
    this.tip1 = view.tip1;
    this.tip2 = view.tip2;
    this.track = view.track;
    this.type = view.type;
    this._onchangevalue = this.changevalue.bind(this);
  }

  private mousedown (runner: IRunnerView, e: JQuery.MouseDownEvent): void {
      e.preventDefault();

      let runnerType: string = runner === this.runner1 ? 'startValue' : 'endValue';

      runner.setRunnerShiftX(e);
      runner.setRunnerShiftY(e);

      let mousemove = this.mousemove.bind(this, runner);
      let onmove = this.move.bind(this, runnerType);
      this._onmouseup = this.mouseup.bind(this, mousemove, onmove, runner);

      $(window).on('mousemove', mousemove);
      $(window).on('mouseup', this._onmouseup);
      runner.el.on('move', onmove);
  };

  private move (runnerType: string, e: JQuery.TriggeredEvent): void {
      if (e) {
          this.model.calculateValue((<any>e).detail.ratio, runnerType);
      }
  }

  private changevalue (runner: IRunnerView, tip: ITipView, point: string): (e: Event) => void {
    return (e) => {
      if ((<any>e).model !== this.model) {
        return;
      }
      runner.setRunnerPosition((<any>e).coefficient);
      if (this.isTip) {
        tip.updateTip((<any>e).value);
      }
      if (this.track) {
          this.track.animateTrack((<any>e).coefficient, point);
      }
    }
  }

  private mousemove (runner: IRunnerView, e: JQuery.MouseMoveEvent): void {
      runner.moveRunner(e);
  };

  private mouseup (
    mousemovehandler: (e: JQuery.MouseMoveEvent) => void,
    onmovehandler: (e: JQuery.TriggeredEvent) => void,
    runner: IRunnerView): void
  {
        $(window).off('mousemove', mousemovehandler );
        $(window).off( 'mouseup', this._onmouseup );
        runner.el.off('move', onmovehandler);

  };

  private _addHandlers (runner: IRunnerView, tip: ITipView, changeevent: string, point: string): void {
    let onmousedown = this._onmousedown = this.mousedown.bind(this, runner);
    let changevalue = this._onchangevalue(runner, tip, point);

    runner.el.on( 'mousedown', onmousedown );
    $('body').on(changeevent, changevalue);
  }

  public init (): void {
    if (this.runner1 && this.tip1) {
        this._addHandlers(this.runner1, this.tip1, 'changestartvalue', 'start');
    }
    if (this.type === 'interval' && this.runner2 && this.tip2) {
      this._addHandlers(this.runner2, this.tip2, 'changeendvalue', 'end');
    }
  }
}