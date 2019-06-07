import Model from '../Model/Model';
import MainView from '../View/MainView/MainView';
import { changeValueSettings } from './ControllerInterfaces';

class Controller {
  readonly changeValueObserver = this.observeChangeValue.bind(this);
  readonly resizeObserver = this.updateView.bind(this);
  readonly startRunnerMoveObserver = this.observeStartRunnerMove.bind(this);
  readonly endRunnerMoveObserver = this.observeEndRunnerMove.bind(this);
  readonly clickOnScaleObserver = this.observeClickOnScale.bind(this);

  constructor(private view: MainView, private model: Model) {
    this.init();
  }

  public init(): void {
    this.model.observableSubject.addObserver(this.changeValueObserver);
    this.view.observableSubject.addObserver(this.resizeObserver);
    this.view.startRunnerObservableSubject.addObserver(this.startRunnerMoveObserver);
    this.view.endRunnerObservableSubject.addObserver(this.endRunnerMoveObserver);
    this.view.scaleObservableSubject.addObserver(this.clickOnScaleObserver);
    this.model.initRangeValues();
  }

  public getSliderType(): string {
    return this.model.type;
  }

  public getMinValue(): number {
    return this.model.minValue;
  }

  public setMinValue(val: number): void {
    this.model.minValue = val;
    this.updateModelConfig();
  }

  public getMaxValue(): number {
    return this.model.maxValue;
  }

  public setMaxValue(val: number): void {
    this.model.maxValue = val;
    this.updateModelConfig();
  }

  public getStepSize(): number {
    return this.model.stepSize;
  }

  public setStepSize(val: number): void {
    this.model.stepSize = val;
    this.updateModelConfig();
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
    this.model.orientation = 'vertical';
    this.updateView();
  }

  public setHorizontalOrientation(): void {
    this.model.orientation = 'horizontal';
    this.updateView();
  }

  public isTipShown(): boolean {
    return this.model.withTip;
  }

  public showTip(): void {
    this.model.withTip = true;
    this.updateView();
  }

  public hideTip(): void {
    this.model.withTip = false;
    this.updateView();
  }

  public isScaleShown(): boolean {
    return this.model.withScale;
  }

  public showScale(): void {
    this.model.withScale = true;
    this.updateView();
  }

  public hideScale(): void {
    this.model.withScale = false;
    this.updateView();
  }

  public addChangeValueObserver(func: () => void): void {
    this.model.observableSubject.addObserver(func);
  }

  private updateModelConfig(): void {
    this.model.normalizeConstructorOptions();
    this.updateView();
  }

  private updateView(): void {
    this.view.reinitialize();
    this.model.initRangeValues();
  }

  private observeStartRunnerMove(ratio: number): void {
    this.model.setRangeBoundByRatio(ratio, 'startValue');
  }

  private observeEndRunnerMove(ratio: number): void {
    this.model.setRangeBoundByRatio(ratio, 'endValue');
  }

  private observeChangeValue({ eventType, value, coefficient }: changeValueSettings): void {
    let valueType: string;

    const isRunnersAtTheEndOfSlider = this.model.type === 'interval'
      && this.model.startValue === this.model.maxValue;

    const isRunnersAtTheStartOfSlider = this.model.type === 'interval'
      && this.model.endValue === this.model.minValue;

    const isStartValueChanging = eventType === 'changestartvalue' || eventType === 'setstartvalue';

    const isEndValueChanging = eventType === 'changeendvalue' && this.model.type === 'interval'
      || eventType === 'setendvalue' && this.model.type === 'interval';

    if (isStartValueChanging) {
      valueType = 'start';

      this.view.update({
        valueType,
        coefficient,
        value,
        isRunnersAtTheEndOfSlider,
        isRunnersAtTheStartOfSlider,
      });
    } else if (isEndValueChanging) {
      valueType = 'end';

      this.view.update({
        valueType,
        coefficient,
        value,
        isRunnersAtTheEndOfSlider,
        isRunnersAtTheStartOfSlider,
      });
    }

    const isScaleInitialized = this.model.withScale && eventType === 'setstartvalue';

    if (isScaleInitialized) {
      this.view.drawScale({
        stepSize: this.model.stepSize,
        minValue: this.model.minValue,
        maxValue: this.model.maxValue,
      });
    }
  }

  private observeClickOnScale(value: number): void {
    const isClickNearByStartRunner: boolean = this.model.type === 'interval'
      && (Math.abs(value - this.model.startValue)
      > Math.abs(value - this.model.endValue)
      || value === this.model.endValue);

    if (isClickNearByStartRunner) {
      this.model.setCurrentEndValue(value);
    } else {
      this.model.setCurrentValue(value);
    }
  }
}

export default Controller;
