import ObservableSubject from '../../ObservableSubject/ObservableSubject';
import {
  dispatchMoveEventSettings,
  RunnerViewOptions,
} from './RunnerViewInterfaces';
import bindDecorator from 'bind-decorator';

class RunnerView {
  public observableSubject = new ObservableSubject();
  public $element: JQuery;
  public $parent: JQuery;
  public shiftX: number = 0;
  public shiftY: number = 0;
  readonly events: { [key: string]: string };
  readonly orientation: string;
  readonly parentLeftPoint: number;
  readonly parentRightPoint: number;
  readonly parentTopPoint: number;
  readonly parentBottomPoint: number;

  constructor(options: RunnerViewOptions) {
    this.$parent = options.$parent;
    this.shiftX = 0;
    this.shiftY = 0;
    this.events = {};
    this.orientation = options.orientation;
    this.parentLeftPoint = options.parentLeftPoint;
    this.parentRightPoint = options.parentRightPoint;
    this.parentTopPoint = options.parentTopPoint;
    this.parentBottomPoint = options.parentBottomPoint;
    this.$element = this.drawRunner();
    this.addHandlers();
  }

  public drawRunner(): JQuery {
    const runnerClass: string = this.orientation === 'horizontal'
      ? ''
      : ' slider__runner_vertical';

    return this.$element = $('<div/>', {
      class: `slider__runner${runnerClass}`,
    }).appendTo(this.$parent);
  }

  public setRunnerPosition(coefficient: number): void {
    const parentSize: number = this.orientation === 'horizontal'
      ? this.getParentWidth()
      : this.getParentHeight();

    const runnerSize: number = this.orientation === 'horizontal'
      ? this.$element.innerWidth()!
      : this.$element.innerHeight()!;

    const runnerOffset: number = (parentSize - runnerSize) / coefficient;
    const direction: string = this.orientation === 'horizontal' ? 'left' : 'top';

    if (coefficient !== 0) {
      this.$element.css(direction, `${runnerOffset}px`);
    }
  }

  public moveRunner(e: JQuery.MouseMoveEvent): void {
    if (this.orientation === 'horizontal') {
      const pageX: number = (<any>e).targetTouches
        ? (<any>e).targetTouches[0].pageX
        : e.pageX;

      this.dispatchMoveEvent({
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

      this.dispatchMoveEvent({
        coordinate: pageY,
        startPoint: this.parentTopPoint,
        endPoint: this.parentBottomPoint,
        shift: this.shiftY,
        runnerSize: this.$element.innerHeight()!,
      });
    }
  }

  public setRunnerShiftX(event: JQuery.MouseDownEvent): void {
    const pageX: number = (<any>event).targetTouches
      ? (<any>event).targetTouches[0].pageX
      : event.pageX;

    this.shiftX = pageX - this.$element.offset()!.left;
  }

  public setRunnerShiftY(event: JQuery.MouseDownEvent): void {
    const pageY: number = (<any>event).targetTouches
      ? (<any>event).targetTouches[0].pageY
      : event.pageY;

    this.shiftY = pageY - this.$element.offset()!.top;
  }

  public placeRunnerOnHigherLayer(): void {
    this.$element.css('zIndex', '1');
  }

  public placeRunnerOnLowerLayer(): void {
    this.$element.css('zIndex', '0');
  }

  private getParentWidth(): number {
    return this.parentRightPoint - this.parentLeftPoint;
  }

  private getParentHeight(): number {
    return this.parentBottomPoint - this.parentTopPoint;
  }

  @bindDecorator
  private handleRunnerMouseDown(event: JQuery.MouseDownEvent): void {
    event.preventDefault();

    this.setRunnerShiftX(event);
    this.setRunnerShiftY(event);

    const $window = $(window);
    const isDeviceSupportsTouchMove: boolean = typeof document.body.ontouchmove !== 'undefined';

    if (isDeviceSupportsTouchMove) {
      const touchmove: string = this.createUniqueEventName('touchmove');
      this.events['touchmove'] = touchmove;

      (<any>$window).on(touchmove, this.handleWindowMouseMove);
    } else {
      const mousemove: string = this.createUniqueEventName('mousemove');
      this.events['mousemove'] = mousemove;

      (<any>$window).on(mousemove, this.handleWindowMouseMove);
    }

    const isDeviceSupportsTouchEnd: boolean = typeof document.body.ontouchend !== 'undefined';

    if (isDeviceSupportsTouchEnd) {
      const touchend: string = this.createUniqueEventName('touchend');
      this.events['touchend'] = touchend;

      (<any>$window).on(touchend, this.removeEventListeners);
    } else {
      const mouseup: string = this.createUniqueEventName('mouseup');
      this.events['touchend'] = mouseup;

      (<any>$window).on(mouseup, this.removeEventListeners);
    }
  }

  @bindDecorator
  private handleWindowMouseMove(event: JQuery.MouseMoveEvent): void {
    this.moveRunner(event);
  }

  private createUniqueEventName(type: string): string {
    return `${type}.${(Math.random() * 1000)}`;
  }

  private addHandlers() {
    const isDeviceSupportsTouchStart: boolean = typeof document.body.ontouchstart !== 'undefined';

    if (isDeviceSupportsTouchStart) {
      const touchstart: string = this.createUniqueEventName('touchstart');
      this.events['touchstart'] = touchstart;

      (<any>this.$element).on(touchstart, this.handleRunnerMouseDown);
    } else {
      const mousedown: string = this.createUniqueEventName('mousedown');
      this.events['mousedown'] = mousedown;

      (<any>this.$element).on(mousedown, this.handleRunnerMouseDown);
    }
  }

  @bindDecorator
  private removeEventListeners(): void {
    const $window = $(window);
    const isDeviceSupportsTouchMove: boolean = typeof document.body.ontouchmove !== 'undefined';

    if (isDeviceSupportsTouchMove) {
      (<any>$window).off(this.events['touchmove']);
    } else {
      (<any>$window).off(this.events['mousemove']);
    }

    const isDeviceSupportsTouchEnd: boolean = typeof document.body.ontouchend !== 'undefined';

    if (isDeviceSupportsTouchEnd) {
      (<any>$window).off(this.events['touchend']);
    } else {
      (<any>$window).off(this.events['mouseup']);
    }
  }

  private dispatchMoveEvent({
    coordinate,
    startPoint,
    endPoint,
    shift,
    runnerSize,
  }: dispatchMoveEventSettings): void {
    const newCoordinate: number = coordinate - startPoint - shift;
    const ratio: number = (endPoint - startPoint - runnerSize) / newCoordinate;
    this.observableSubject.notifyObservers(ratio);
  }
}

export default RunnerView;
