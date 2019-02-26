//import $ from 'jquery';
import $ = require('jquery');
import {ISliderModel} from '../interfaces';
import {ISliderView} from "../interfaces";
import {IRunnerView} from '../interfaces';
import {ITrackView} from '../interfaces';
import {ITipView} from '../interfaces';

export default class SliderController {
  private isTip: boolean;
  public runner1?: null | IRunnerView;
  public runner2?: null | IRunnerView;
  public tip1?: null | ITipView;
  public tip2?: null | ITipView;
  public track?: null | ITrackView;
  private type: string;
  private _onmousedown?: (e: JQuery.MouseDownEvent) => void;
  private _onmouseup?: (e: JQuery.MouseUpEvent) => void;

  constructor (private view: ISliderView, private model: ISliderModel) {
    this.isTip = view.isTip;
    this.runner1 = view.runner1;
    this.runner2 = view.runner2;
    this.tip1 = view.tip1;
    this.tip2 = view.tip2;
    this.track = view.track;
    this.type = view.type;
  }

  private mousedown (runner: IRunnerView, e: JQuery.MouseDownEvent): void {
      e.preventDefault();

      let runnerType: string = runner === this.view.runner1 ? 'startValue' : 'endValue';

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
      if (e.detail) {
          this.model.calculateValue((<any>e).detail.ratio, runnerType);
      }
  }

  private changevalue (runner: IRunnerView, tip: ITipView | false, point: string, e: JQuery.TriggeredEvent): void {
      if ((<any>e).detail.model !== this.model) {
        return;
      }
      runner.setRunnerPosition((<any>e).detail.coefficient);
      if (tip) {
        tip.updateTip((<any>e).detail.value);
      }
      if (this.view.track) {
          this.view.track.animateTrack((<any>e).detail.coefficient, point);
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

  private resize (): void {
      this.view.updateSlider();

      this.runner1 = this.view.runner1;
      this.runner2 = this.view.runner2;
      this.tip1 = this.view.tip1;
      this.tip2 = this.view.tip2;
      this.track = this.view.track;

      this._checkoutHandlers();
  }

  private _addHandlers (runner: IRunnerView, tip: ITipView | false, changeevent: string, point: string): void {
    let onmousedown = this._onmousedown = this.mousedown.bind(this, runner);
    let changevalue = this.changevalue.bind(this, runner, tip, point);
    runner.el.on( 'mousedown', onmousedown );
    $('body').on(changeevent, changevalue);
  }

  private _checkoutHandlers () {
      let tip1 = this.isTip && this.tip1 ? this.tip1 : false;
      let tip2 = this.isTip && this.tip2 ? this.tip2 : false;

      if (this.runner1) {
          this._addHandlers(this.runner1, tip1, 'changestartvalue', 'start');
      }
      if (this.type === 'interval' && this.runner2 && this.tip2) {
          this._addHandlers(this.runner2, tip2, 'changeendvalue', 'end');
      }
  }

  public init (): void {
    let onresize = this.resize.bind(this);

    this._checkoutHandlers();
    $(window).on('resize', onresize);
  }
}