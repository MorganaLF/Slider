import Model from '../Model/Model';
import MainView from '../View/MainView/MainView';
import {
  changeValueSettings,
  changeValueCallbackSettings,
  changeBoundCallbackSettings,
  observeBoundSettings
} from './ControllerInterfaces';

class Controller {
  constructor(private view: MainView, private model: Model) {
    this.init();
  }

  public init(): void {
    this.model.observableSubject.addObserver(this.bind(this.observeChangeValue, this));
    this.view.resizeObservableSubject.addObserver(this.bind(this.updateView, this));
    this.view.boundObservableSubject.addObserver(this.bind(this.observeBoundChanging, this));
    this.model.initRangeValues();
  }

  public getSliderType(): string {
    return this.model.getType();
  }

  public getMinValue(): number {
    return this.model.getMinValue();
  }

  public setMinValue(val: number): void {
    this.model.setMinValue(val);
    this.updateView();
  }

  public getMaxValue(): number {
    return this.model.getMaxValue();
  }

  public setMaxValue(val: number): void {
    this.model.setMaxValue(val);
    this.updateView();
  }

  public getStepSize(): number {
    return this.model.getStepSize();
  }

  public setStepSize(val: number): void {
    this.model.setStepSize(val);
    this.updateView();
  }

  public getCurrentValue(): number {
    return this.model.getCurrentRoundedValue();
  }

  public setCurrentValue(val: number): void {
    this.model.setCurrentValue(val);
  }

  public getCurrentEndValue(): number {
    return this.model.getCurrentRoundedEndValue();
  }

  public setCurrentEndValue(val: number): void {
    this.model.setCurrentEndValue(val);
  }

  public setVerticalOrientation(): void {
    this.model.setVerticalOrientation();
    this.updateView();
  }

  public setHorizontalOrientation(): void {
    this.model.setHorizontalOrientation();
    this.updateView();
  }

  public isTipShown(): boolean {
    return this.model.isTipShown();
  }

  public showTip(): void {
    this.model.showTip();
    this.updateView();
  }

  public hideTip(): void {
    this.model.hideTip();
    this.updateView();
  }

  public isScaleShown(): boolean {
    return this.model.isScaleShown();
  }

  public showScale(): void {
    this.model.showScale();
    this.updateView();
  }

  public hideScale(): void {
    this.model.hideScale();
    this.updateView();
  }

  public addChangeValueEvent(callback: ({}: changeValueCallbackSettings) => void): void {
    this.model.observableSubject.addObserver(callback);
  }

  private updateView(): void {
    this.view.reinitialize();
    this.model.initRangeValues();
  }

  private observeBoundChanging({ ratio, value, boundType }: observeBoundSettings): void {
    if (boundType === 'start') {
      this.model.setRangeBoundByRatio(ratio, 'startValue');
    } else if (boundType === 'end') {
      this.model.setRangeBoundByRatio(ratio, 'endValue');
    } else if (boundType === 'either') {
      this.model.setBound(value);
    }
  }

  private observeChangeValue({
    isEndValueChanging,
    isRangeBoundAtTheEndOfInterval,
    isRangeBoundAtTheStartOfInterval,
    isScaleInitialized,
    eventType,
    value,
    coefficient,
  }: changeValueSettings): void {
    if (eventType === 'changevalue') {
      this.view.update({
        isEndValueChanging,
        coefficient,
        value,
        isRangeBoundAtTheEndOfInterval,
        isRangeBoundAtTheStartOfInterval,
      });
    }

    if (isScaleInitialized) {
      this.view.drawScale({
        stepSize: this.model.getStepSize(),
        minValue: this.model.getMinValue(),
        maxValue: this.model.getMaxValue(),
      });
    }
  }

  private bind(func: any, context: any) {
    return function() {
      return func.apply(context, arguments);
    };
  }
}

export default Controller;
