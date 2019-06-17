import Model from '../Model/Model';
import MainView from '../View/MainView/MainView';
import { changeValueSettings } from './ControllerInterfaces';

class Controller {
  readonly changeValueObserver = this.observeChangeValue.bind(this);
  readonly resizeObserver = this.updateView.bind(this);
  readonly startBoundObserver = this.observeStartBound.bind(this);
  readonly endBoundObserver = this.observeEndBound.bind(this);
  readonly settingRandomValueObserver = this.observeSettingRandomValue.bind(this);

  constructor(private view: MainView, private model: Model) {
    this.init();
  }

  public init(): void {
    this.model.observableSubject.addObserver(this.changeValueObserver);
    this.view.observableSubject.addObserver(this.resizeObserver);
    this.view.startBoundObservableSubject.addObserver(this.startBoundObserver);
    this.view.endBoundObservableSubject.addObserver(this.endBoundObserver);
    this.view.randomValueObservableSubject.addObserver(this.settingRandomValueObserver);
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

  public addChangeValueObserver(func: () => void): void {
    this.model.observableSubject.addObserver(func);
  }

  private updateView(): void {
    this.view.reinitialize();
    this.model.initRangeValues();
  }

  private observeStartBound(ratio: number): void {
    this.model.setRangeBoundByRatio(ratio, 'startValue');
  }

  private observeEndBound(ratio: number): void {
    this.model.setRangeBoundByRatio(ratio, 'endValue');
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

  private observeSettingRandomValue(value: number): void {
    this.model.setBound(value);
  }
}

export default Controller;
