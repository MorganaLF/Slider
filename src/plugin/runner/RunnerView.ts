import {
  ICheckCursorPositionSettings,
  IDispatchMoveEventSettings,
  RunnerViewOptions,
} from './RunnerInterfaces';

class RunnerView {
  public $element?: null | JQuery;
  public $parent?: null | JQuery;
  public shiftX: number = 0;
  public shiftY: number = 0;
  readonly orientation: string;
  readonly parentLeftPoint: number;
  readonly parentRightPoint: number;
  readonly parentTopPoint: number;
  readonly parentBottomPoint: number;

  constructor(options: RunnerViewOptions) {
    this.$element = null;
    this.$parent = options.$parent;
    this.shiftX = 0;
    this.shiftY = 0;
    this.orientation = options.orientation;
    this.parentLeftPoint = options.parentLeftPoint;
    this.parentRightPoint = options.parentRightPoint;
    this.parentTopPoint = options.parentTopPoint;
    this.parentBottomPoint = options.parentBottomPoint;
    this.drawRunner();
  }

  public drawRunner(): void {
    if (!this.$parent) return;

    const runnerClass: string = this.orientation === 'horizontal'
      ? ''
      : ' slider__runner_vertical';

    this.$element = $('<div/>', {
      class: `slider__runner${runnerClass}`,
    }).appendTo(this.$parent);
  }

  public setRunnerPosition(coefficient: number): void | false {
    if (!this.$element) return false;

    const parentSize: number = this.orientation === 'horizontal'
      ? this._getParentWidth()
      : this._getParentHeight();

    const runnerSize: number = this.orientation === 'horizontal'
      ? this.$element.innerWidth()!
      : this.$element.innerHeight()!;

    const runnerOffset: number = (parentSize - runnerSize) / coefficient;
    const direction: string = this.orientation === 'horizontal' ? 'left' : 'top';

    if (coefficient !== 0) {
      this.$element.css(direction, `${runnerOffset}px`);
    }
  }

  public moveRunner(e: JQuery.MouseMoveEvent): void | false {
    if (!this.$element) {
      return false;
    }

    if (this.orientation === 'horizontal') {
      const pageX: number = (<any>e).targetTouches
        ? (<any>e).targetTouches[0].pageX
        : e.pageX;

      this._dispatchMoveEvent({
        coordinate: pageX,
        startPoint: this.parentLeftPoint,
        endPoint: this.parentRightPoint,
        shift: this.shiftX,
        runnerSize: this.$element.innerWidth()!,
      });
    } else {
      const pageY: number = (<any>e).targetTouches
        ? (<any>e).targetTouches[0].pageY
        : e.pageY;

      this._dispatchMoveEvent({
        coordinate: pageY,
        startPoint: this.parentTopPoint,
        endPoint: this.parentBottomPoint,
        shift: this.shiftY,
        runnerSize: this.$element.innerHeight()!,
      });
    }
  }

  public setRunnerShiftX(event: JQuery.MouseDownEvent): void | false {
    if (!this.$element) {
      return false;
    }

    const pageX: number = (<any>event).targetTouches
      ? (<any>event).targetTouches[0].pageX
      : event.pageX;

    this.shiftX = pageX - this.$element.offset()!.left;
  }

  public setRunnerShiftY(event: JQuery.MouseDownEvent): void | false {
    if (!this.$element) {
      return false;
    }

    const pageY: number = (<any>event).targetTouches
      ? (<any>event).targetTouches[0].pageY
      : event.pageY;

    this.shiftY = pageY - this.$element.offset()!.top;
  }

  private _getParentWidth(): number {
    return this.parentRightPoint - this.parentLeftPoint;
  }

  private _getParentHeight(): number {
    return this.parentBottomPoint - this.parentTopPoint;
  }

  private _checkCursorPosition({
    coordinate,
    startPoint,
    endPoint,
    shift,
    runnerSize,
  }: ICheckCursorPositionSettings): number {

    const isCoordinateLessThanLeftPoint: boolean = coordinate < (startPoint + shift);
    const isCoordinateGreaterThanEndPoint: boolean = coordinate > (endPoint - runnerSize + shift);
    let newCoordinate: number;

    if (isCoordinateLessThanLeftPoint) {
      newCoordinate = 0;
    } else if (isCoordinateGreaterThanEndPoint) {
      newCoordinate = endPoint - startPoint - runnerSize;
    } else {
      newCoordinate = coordinate - startPoint - shift;
    }

    return newCoordinate;
  }

  private _dispatchMoveEvent({
    coordinate,
    startPoint,
    endPoint,
    shift,
    runnerSize,
  }: IDispatchMoveEventSettings): void {
    if (!this.$element) {
      return;
    }

    const newCoordinate: number = this._checkCursorPosition({
      coordinate,
      startPoint,
      endPoint,
      shift,
      runnerSize,
    });

    const ratio: number = (endPoint - startPoint - runnerSize) / newCoordinate;
    const $moveEvent = $.Event('move', { detail: { ratio } });
    this.$element.trigger($moveEvent);
  }
}

export default RunnerView;
