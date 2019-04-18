import { IRunnerView } from '../RunnerView/RunnerViewInterfaces';
import { ISliderModel } from '../SliderModel/SliderModelInterfaces';
import { ISliderView } from '../SliderView/SliderViewInterfaces';
import { ITipView } from '../TipView/TipViewInterfaces';
import { ITrackView } from '../TrackView/TrackViewInterfaces';
import {
  addHandlersSettings,
  changeValueSettings,
  handleWindowMouseUpSettings,
} from './SliderControllerInterfaces';

class SliderController {
  [key: string]: any;
  public startValueRunner?: null | IRunnerView;
  public endValueRunner?: null | IRunnerView;
  public startValueTip?: null | ITipView;
  public endValueTip?: null | ITipView;
  public track?: null | ITrackView;
  private _boundMouseUpHandler?: (event: JQuery.MouseUpEvent) => void;
  private _setStartValueHandler?: any;
  private _setEndValueHandler?: any;
  readonly withTip: boolean;
  readonly type: string;

  constructor(private view: ISliderView, private model: ISliderModel) {
    this.startValueRunner = view.startValueRunner;
    this.endValueRunner = view.endValueRunner;
    this.startValueTip = view.startValueTip;
    this.endValueTip = view.endValueTip;
    this.track = view.track;
    this.withTip = view.withTip!;
    this.type = view.type!;
  }

  public init(): void {
    this._checkoutHandlers();

    const $window = $(window);
    const resizeHandler = this._handleWindowResize.bind(this);

    $window.on('resize.CustomSlider', resizeHandler);
  }

  public destroy() {
    const $body = $('body');

    $body
      .off('setstartvalue.CustomSlider', this._setStartValueHandler)
      .off('setendvalue.CustomSlider', this._setEndValueHandler);
  }

  private _handleRunnerMouseDown(
    runner: IRunnerView,
    event: JQuery.MouseDownEvent,
  ): void {
    event.preventDefault();

    runner.setRunnerShiftX(event);
    runner.setRunnerShiftY(event);

    const valueType: string = runner === this.view.startValueRunner
      ? 'startValue'
      : 'endValue';

    const moveHandler = this._handleRunnerMove.bind(this, valueType);
    const mouseMoveHandler = this._handleWindowMouseMove.bind(this, runner);

    this._boundMouseUpHandler = this._handleWindowMouseUp.bind(
      this,
      {
        runner,
        mouseMoveHandler,
        moveHandler,
      },
    );

    const $window = $(window);
    const isDeviceSupportsTouchMove: boolean = typeof document.body.ontouchmove !== 'undefined';

    if (isDeviceSupportsTouchMove) {
      (<any>$window).on('touchmove.CustomSlider', mouseMoveHandler); // TODO unique namespaces
    } else {
      (<any>$window).on('mousemove.CustomSlider', mouseMoveHandler);
    }

    const isDeviceSupportsTouchEnd: boolean = typeof document.body.ontouchend !== 'undefined';

    if (isDeviceSupportsTouchEnd) {
      (<any>$window).on('touchend.CustomSlider', this._boundMouseUpHandler);
    } else {
      (<any>$window).on('mouseup.CustomSlider', this._boundMouseUpHandler);
    }

    runner.$element.on('move', moveHandler);
  }

  private _handleRunnerMove(valueType: string, event: JQuery.TriggeredEvent): void {
    if (event.detail) {
      this.model.setCurrentValueByRatio((<any>event).detail.ratio, valueType);
    }
  }

  private _handleBodyChangeValue(
    { runner, tip, valueType }: changeValueSettings,
    event: JQuery.TriggeredEvent,
  ): void {
    if ((<any>event).detail.model !== this.model) {
      return;
    }

    runner.setRunnerPosition((<any>event).detail.coefficient);

    if (tip) {
      tip.updateTip((<any>event).detail.value);
    }

    if (this.view.track) {
      this.view.track.animateTrack((<any>event).detail.coefficient, valueType);
    }
  }

  private _handleBodySetValue(
    { runner, tip, valueType }: changeValueSettings,
    event: JQuery.TriggeredEvent,
  ): void {
    if ((<any>event).detail.model !== this.model) {
      return;
    }

    runner.setRunnerPosition((<any>event).detail.coefficient);

    if (tip) {
      tip.updateTip((<any>event).detail.value);
    }

    if (this.view.track) {
      this.view.track.animateTrack((<any>event).detail.coefficient, valueType);
    }

    if (this.view.scale) {
      this.view.scale.drawScale({
        minValue: this.model.minValue!,
        maxValue: this.model.maxValue!,
      });
    }
  }

  private _handleWindowMouseMove(
    runner: IRunnerView,
    event: JQuery.MouseMoveEvent,
  ): void {
    runner.moveRunner(event);
  }

  private _handleWindowMouseUp({
    mouseMoveHandler,
    moveHandler,
    runner,
  }: handleWindowMouseUpSettings): void {
    const $window = $(window);
    const isDeviceSupportsTouchMove: boolean = typeof document.body.ontouchmove !== 'undefined';

    if (isDeviceSupportsTouchMove) {
      (<any>$window).off('touchmove.CustomSlider', mouseMoveHandler);
    } else {
      (<any>$window).off('mousemove.CustomSlider', mouseMoveHandler);
    }

    const isDeviceSupportsTouchEnd: boolean = typeof document.body.ontouchend !== 'undefined';

    if (isDeviceSupportsTouchEnd) {
      (<any>$window).off('touchend.CustomSlider', this._boundMouseUpHandler);
    } else {
      (<any>$window).off('mouseup.CustomSlider', this._boundMouseUpHandler);
    }

    runner.$element.off('move.CustomSlider', moveHandler);
  }

  private _handleWindowResize(): void {
    this.view.updateSlider();

    this.startValueRunner = this.view.startValueRunner;
    this.endValueRunner = this.view.endValueRunner;
    this.startValueTip = this.view.startValueTip;
    this.endValueTip = this.view.endValueTip;
    this.track = this.view.track;

    this._checkoutHandlers();

    this.model.initValues();
  }

  private _addHandlers({
    runner,
    tip,
    changeEvent,
    setEvent,
    valueType,
  }: addHandlersSettings): void {
    const mouseDownHandler = this._handleRunnerMouseDown.bind(this, runner);
    const isDeviceSupportsTouchStart: boolean = typeof document.body.ontouchstart !== 'undefined';

    if (isDeviceSupportsTouchStart) {
      (<any>runner).$element.on('touchstart.CustomSlider', mouseDownHandler);
    } else {
      (<any>runner).$element.on('mousedown.CustomSlider', mouseDownHandler);
    }

    const changeValueHandler = this._handleBodyChangeValue.bind(
      this,
      { runner, tip, valueType },
    );

    const setValueHandler = runner === this.startValueRunner
      ? '_setStartValueHandler'
      : '_setEndValueHandler';

    this[setValueHandler] = this._handleBodySetValue.bind(
      this,
      { runner, tip, valueType },
    );

    const $body = $('body');

    $body
      .on(changeEvent, changeValueHandler)
      .on(setEvent, this[setValueHandler]);
  }

  private _checkoutHandlers() {
    const startValueTip: ITipView | false = this.withTip && this.startValueTip
      ? this.startValueTip
      : false;

    if (this.startValueRunner) {
      this._addHandlers({
        runner: this.startValueRunner,
        tip: startValueTip,
        changeEvent: 'changestartvalue.CustomSlider',
        setEvent: 'setstartvalue.CustomSlider',
        valueType: 'start',
      });
    }

    const endValueTip: ITipView | false = this.withTip && this.endValueTip
      ? this.endValueTip
      : false;

    const isEndValueRunnerExist: boolean = this.type === 'interval'
      && this.endValueRunner !== undefined;

    if (isEndValueRunnerExist) {
      this._addHandlers({
        runner: this.endValueRunner!,
        tip: endValueTip,
        changeEvent: 'changeendvalue.CustomSlider',
        setEvent: 'setendvalue.CustomSlider',
        valueType: 'end',
      });
    }
  }
}

export default SliderController;
