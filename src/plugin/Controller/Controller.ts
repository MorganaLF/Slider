import { IRunnerView } from '../views/RunnerView/RunnerViewInterfaces';
import { IModel } from '../Model/ModelInterfaces';
import { IView } from '../views/View/ViewInterfaces';
import { ITipView } from '../views/TipView/TipViewInterfaces';
import { ITrackView } from '../views/TrackView/TrackViewInterfaces';
import {
  addHandlersSettings,
  changeValueSettings,
  removeEventListenersSettings,
} from './ControllerInterfaces';

class Controller {
  [key: string]: any;
  public startValueRunner?: null | IRunnerView;
  public endValueRunner?: null | IRunnerView;
  public startValueTip?: null | ITipView;
  public endValueTip?: null | ITipView;
  public track?: null | ITrackView;
  private _handleWindowMouseUp?: (event: JQuery.MouseUpEvent) => void;
  private _setStartValueHandler?: any;
  private _setEndValueHandler?: any;
  readonly withTip: boolean;
  readonly type: string;

  constructor(private elementIndex: number, private view: IView, private model: IModel) {
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
    const handleWindowResize = this._handleWindowResize.bind(this);

    $window.on(`resize.CustomSlider${this.elementIndex}`, handleWindowResize);
  }

  public destroy(): void {
    const $body = $('body');

    $body
      .off(`setstartvalue.CustomSlider${this.elementIndex}`, this._setStartValueHandler)
      .off(`setendvalue.CustomSlider${this.elementIndex}`, this._setEndValueHandler);
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

    const handleRunnerMove = this._handleRunnerMove.bind(this, valueType);
    const handleWindowMouseMove = this._handleWindowMouseMove.bind(this, runner);

    this._handleWindowMouseUp = this._removeEventListeners.bind(
      this,
      {
        runner,
        handleWindowMouseMove,
        handleRunnerMove,
      },
    );

    const $window = $(window);
    const isDeviceSupportsTouchMove: boolean = typeof document.body.ontouchmove !== 'undefined';

    if (isDeviceSupportsTouchMove) {
      (<any>$window).on(`touchmove.CustomSlider${this.elementIndex}`, handleWindowMouseMove);
    } else {
      (<any>$window).on(`mousemove.CustomSlider${this.elementIndex}`, handleWindowMouseMove);
    }

    const isDeviceSupportsTouchEnd: boolean = typeof document.body.ontouchend !== 'undefined';

    if (isDeviceSupportsTouchEnd) {
      (<any>$window).on(`touchend.CustomSlider${this.elementIndex}`, this._handleWindowMouseUp);
    } else {
      (<any>$window).on(`mouseup.CustomSlider${this.elementIndex}`, this._handleWindowMouseUp);
    }

    runner.$element.on(`move.CustomSlider${this.elementIndex}`, handleRunnerMove);
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

    this._checkoutActiveRunner(runner);

    runner.setRunnerPosition((<any>event).detail.coefficient);

    if (tip) {
      tip.updateTip((<any>event).detail.value);
    }

    if (this.view.track) {
      this.view.track.animateTrack((<any>event).detail.coefficient, valueType);
    }
  }

  private _checkoutActiveRunner(runner: IRunnerView): void {
    const isRunnersAtTheEndOfSlider = this.type === 'interval'
      && this.startValueRunner
      && this.endValueRunner
      && this.model.startValue === this.model.maxValue;

    const isRunnersAtTheStartOfSlider = this.type === 'interval'
      && this.startValueRunner
      && this.endValueRunner
      && this.model.endValue === this.model.minValue;

    if (isRunnersAtTheEndOfSlider) {
      this.startValueRunner!.placeRunnerOnHigherLayer();
      this.endValueRunner!.placeRunnerOnLowerLayer();
    } else if (isRunnersAtTheStartOfSlider) {
      this.endValueRunner!.placeRunnerOnHigherLayer();
      this.startValueRunner!.placeRunnerOnLowerLayer();
    } else if (this.type === 'interval') {
      this.startValueRunner!.placeRunnerOnLowerLayer();
      this.endValueRunner!.placeRunnerOnLowerLayer();
      runner.placeRunnerOnHigherLayer();
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

  private _removeEventListeners({
    handleWindowMouseMove,
    handleRunnerMove,
    runner,
  }: removeEventListenersSettings): void {
    const $window = $(window);
    const isDeviceSupportsTouchMove: boolean = typeof document.body.ontouchmove !== 'undefined';

    if (isDeviceSupportsTouchMove) {
      (<any>$window).off(`touchmove.CustomSlider${this.elementIndex}`, handleWindowMouseMove);
    } else {
      (<any>$window).off(`mousemove.CustomSlider${this.elementIndex}`, handleWindowMouseMove);
    }

    const isDeviceSupportsTouchEnd: boolean = typeof document.body.ontouchend !== 'undefined';

    if (isDeviceSupportsTouchEnd) {
      (<any>$window).off(`touchend.CustomSlider${this.elementIndex}`, this._handleWindowMouseUp);
    } else {
      (<any>$window).off(`mouseup.CustomSlider${this.elementIndex}`, this._handleWindowMouseUp);
    }

    runner.$element.off(`move.CustomSlider${this.elementIndex}`, handleRunnerMove);
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
    const handleRunnerMouseDown = this._handleRunnerMouseDown.bind(this, runner);
    const isDeviceSupportsTouchStart: boolean = typeof document.body.ontouchstart !== 'undefined';

    if (isDeviceSupportsTouchStart) {
      (<any>runner).$element.on(
        `touchstart.CustomSlider${this.elementIndex}`,
        handleRunnerMouseDown,
      );
    } else {
      (<any>runner).$element.on(
        `mousedown.CustomSlider${this.elementIndex}`,
        handleRunnerMouseDown,
      );
    }

    const handleBodyChangeValue = this._handleBodyChangeValue.bind(
      this,
      { runner, tip, valueType },
    );

    const handleBodySetValue = runner === this.startValueRunner
      ? '_setStartValueHandler'
      : '_setEndValueHandler';

    this[handleBodySetValue] = this._handleBodySetValue.bind(
      this,
      { runner, tip, valueType },
    );

    const $body = $('body');

    $body
      .on(changeEvent, handleBodyChangeValue)
      .on(setEvent, this[handleBodySetValue]);
  }

  private _checkoutHandlers() {
    const startValueTip: ITipView | false = this.withTip && this.startValueTip
      ? this.startValueTip
      : false;

    if (this.startValueRunner) {
      this._addHandlers({
        runner: this.startValueRunner,
        tip: startValueTip,
        changeEvent: `changestartvalue.CustomSlider${this.elementIndex}`,
        setEvent: `setstartvalue.CustomSlider${this.elementIndex}`,
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
        changeEvent: `changeendvalue.CustomSlider${this.elementIndex}`,
        setEvent: `setendvalue.CustomSlider${this.elementIndex}`,
        valueType: 'end',
      });
    }
  }
}

export default Controller;
