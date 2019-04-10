//import $ from 'jquery';
import $ = require('jquery');
import {ISliderModel} from './interfaces';
import {ISliderView} from "./interfaces";
import {IRunnerView} from './interfaces';
import {ITrackView} from './interfaces';
import {ITipView} from './interfaces';

export default class SliderController {
  private withTip: boolean;
  public startValueRunner?: null | IRunnerView;
  public endValueRunner?: null | IRunnerView;
  public startValueTip?: null | ITipView;
  public endValueTip?: null | ITipView;
  public track?: null | ITrackView;
  private type: string;
  private _onmousedown?: (e: JQuery.MouseDownEvent) => void;
  private _onmouseup?: (e: JQuery.MouseUpEvent) => void;

  constructor (private view: ISliderView, private model: ISliderModel) {
    this.withTip = view.withTip;
    this.startValueRunner = view.startValueRunner;
    this.endValueRunner = view.endValueRunner;
    this.startValueTip = view.startValueTip;
    this.endValueTip = view.endValueTip;
    this.track = view.track;
    this.type = view.type;
  }

  private mousedown (runner: IRunnerView, e: JQuery.MouseDownEvent): void {
      e.preventDefault();

      let runnerType: string = runner === this.view.startValueRunner ? 'startValue' : 'endValue';

      runner.setRunnerShiftX(e);
      runner.setRunnerShiftY(e);

      let mousemove = this.mousemove.bind(this, runner);
      let onmove = this.move.bind(this, runnerType);
      this._onmouseup = this.mouseup.bind(this, mousemove, onmove, runner);

      if (typeof document.body.ontouchmove !== "undefined") {
          (<any>$(window)).on('touchmove', mousemove);
      } else {
          $(window).on('mousemove', mousemove);
      }

      if (typeof document.body.ontouchend !== "undefined") {
          (<any>$(window)).on('touchend', this._onmouseup);
      } else {
          $(window).on('mouseup', this._onmouseup);
      }

      runner.$element.on('move', onmove);
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

  private setvalue (runner: IRunnerView, tip: ITipView | false, point: string, e: JQuery.TriggeredEvent): void {
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

    if (this.view.scale) {
      this.view.scale.drawScale({
        minValue: this.model.minVal,
        maxValue: this.model.maxVal,
      });
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
        runner.$element.off('move', onmovehandler);

  };

  private resize (): void {
      this.view.updateSlider();

      this.startValueRunner = this.view.startValueRunner;
      this.endValueRunner = this.view.endValueRunner;
      this.startValueTip = this.view.startValueTip;
      this.endValueTip = this.view.endValueTip;
      this.track = this.view.track;

      this._checkoutHandlers();
  }

  private _addHandlers (runner: IRunnerView, tip: ITipView | false, changeevent: string, setevent: string, point: string): void {
    let onmousedown = this._onmousedown = this.mousedown.bind(this, runner);
    let changevalue = this.changevalue.bind(this, runner, tip, point);
    let setvalue = this.setvalue.bind(this, runner, tip, point);

      if (typeof document.body.ontouchstart !== "undefined") {
          (<any>runner).$element.on( 'touchstart', onmousedown );
      } else {
          runner.$element.on( 'mousedown', onmousedown );
      }

    $('body').on(changeevent, changevalue);
    $('body').on(setevent, setvalue);
  }

  private _checkoutHandlers () {
      let startValueTip = this.withTip && this.startValueTip ? this.startValueTip : false;
      let endValueTip = this.withTip && this.endValueTip ? this.endValueTip : false;

      if (this.startValueRunner) {
          this._addHandlers(this.startValueRunner, startValueTip, 'changestartvalue', 'setstartvalue', 'start');
      }
      if (this.type === 'interval' && this.endValueRunner && this.endValueTip) {
          this._addHandlers(this.endValueRunner, endValueTip, 'changeendvalue', 'setendvalue', 'end');
      }
  }

  public init (): void {
    let onresize = this.resize.bind(this);

    this._checkoutHandlers();
    $(window).on('resize', onresize);
  }
}