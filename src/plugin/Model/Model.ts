import ObservableSubject from '../ObservableSubject/ObservableSubject';
import { ModelConfig, ModelOptions } from './ModelInterfaces';
import modelConfig from './modelConfig';

class Model {
  public observableSubject = new ObservableSubject();
  public startValue: number;
  public endValue: number;
  public minValue: number;
  public maxValue: number;
  public type: string;
  public stepSize: number;
  readonly config: ModelConfig;

  constructor(options: ModelOptions) {
    this.config = { ...modelConfig, ...options };
    this.startValue = this.config.startValue;
    this.endValue = this.config.endValue;
    this.minValue = this.config.minValue;
    this.maxValue = this.config.maxValue;
    this.type = this.config.type;
    this.stepSize = this.config.stepSize;
    this.fixConstructorOptions();
  }

  public initValues(): void {
    this.dispatchValueChange('setstartvalue', this.startValue);
    this.dispatchValueChange('setendvalue', this.endValue);
  }

  public getCurrentRoundedValue(): number {
    return this.calculateRoundedValue(this.startValue);
  }

  public getCurrentRoundedEndValue(): number {
    return this.calculateRoundedValue(this.endValue);
  }

  public setCurrentValue(value: number): void {
    const fixedToNumberValue = this.fixToNumber(value, this.config.startValue);
    const fixedToStepValue = this.fixToValueMultipleOfStep(fixedToNumberValue);

    this.startValue = this.fixCurrentValue(fixedToStepValue);

    if (this.type === 'interval') {
      this.checkAndFixIntervalValues(this.startValue);
    }

    this.dispatchValueChange('changestartvalue', this.startValue);
  }

  public setCurrentEndValue(value: number): void {
    if (this.type === 'single') {
      return;
    }

    const fixedToNumberValue = this.fixToNumber(value, this.config.endValue);
    const fixedToStepValue = this.fixToValueMultipleOfStep(fixedToNumberValue);

    this.endValue = this.fixCurrentValue(fixedToStepValue);

    this.checkAndFixIntervalValues(this.endValue);
    this.dispatchValueChange('changeendvalue', this.endValue);
  }

  public setCurrentValueByRatio(
    ratio: number,
    valueKeyName: 'startValue' | 'endValue',
  ): void | boolean {

    if (this.stepSize === 0) {
      this[valueKeyName] = (this.maxValue - this.minValue) / ratio + this.minValue;
    } else {
      this[valueKeyName] = this.calculateStepValueByRatio(ratio, this[valueKeyName]);
    }

    const isIntervalValueInvalid: boolean = this.type === 'interval'
      && !this.checkAndFixIntervalValues(this[valueKeyName]);

    if (isIntervalValueInvalid) {
      return false;
    }

    this[valueKeyName] = this.fixCurrentValue(this[valueKeyName]);

    if (valueKeyName === 'startValue') {
      this.dispatchValueChange('changestartvalue', this.startValue);
    }

    const isChangingEndValue: boolean = valueKeyName === 'endValue'
      && this.type === 'interval';

    if (isChangingEndValue) {
      this.dispatchValueChange('changeendvalue', this.endValue);
    }
  }

  private fixConstructorOptions(): void {
    const fixedToNumberStartValue = this.fixToNumber(this.startValue, this.config.startValue);
    const fixedToNumberEndValue = this.fixToNumber(this.endValue, this.config.endValue);
    const fixedToNumberMinValue = this.fixToNumber(this.minValue, this.config.minValue);
    const fixedToNumberMaxValue = this.fixToNumber(this.maxValue, this.config.maxValue);

    this.stepSize = this.fixToNumber(this.stepSize, this.config.stepSize);

    this.fixExtremeValues();

    this.minValue = this.fixToPositiveNumber(fixedToNumberMinValue);
    this.maxValue = this.fixToPositiveNumber(fixedToNumberMaxValue);

    const fixedToStepStartValue = this.fixToValueMultipleOfStep(fixedToNumberStartValue);
    const fixedToStepEndValue = this.fixToValueMultipleOfStep(fixedToNumberEndValue);

    this.startValue = this.fixCurrentValue(fixedToStepStartValue);
    this.endValue = this.fixCurrentValue(fixedToStepEndValue);
  }

  private fixToNumber(value: any, defaultValue: number): number {
    if (isNaN(value)) return defaultValue;
    return value;
  }

  private fixToPositiveNumber(value: number): number {
    if (value < 0) return Math.abs(value);
    return value;
  }

  private fixExtremeValues(): void {
    if (this.minValue > this.maxValue) {
      if (this.stepSize === 0) {
        this.minValue = this.maxValue - 1;
      } else {
        this.minValue = this.maxValue - this.stepSize;
      }
    }
  }

  private fixCurrentValue(value: number): number {
    if (value < this.minValue) return this.minValue;
    if (value > this.maxValue) return this.maxValue;
    return value;
  }

  private fixToValueMultipleOfStep(value: number): number {
    const shouldStepValueBeRounded: boolean = (this.stepSize !== 0)
      && value !== 0
      && value !== this.maxValue
      && ((value - this.minValue) % this.stepSize !== 0);

    const roundedStepValue = Math.round((value - this.minValue) / this.stepSize) * this.stepSize;

    if (shouldStepValueBeRounded) return roundedStepValue + this.minValue;
    return value;
  }

  private checkAndFixIntervalValues(value: number): boolean {
    const isStartValueGoesBeyondEndValue: boolean = (this.startValue > this.endValue)
      && (value === this.startValue);

    if (isStartValueGoesBeyondEndValue) {
      this.startValue = this.endValue;
      this.dispatchValueChange('changestartvalue', this.startValue);
      return false;
    }

    const isEndValueGoesBeyondStartValue: boolean = (this.endValue < this.startValue)
      && (value === this.endValue);

    if (isEndValueGoesBeyondStartValue) {
      this.endValue = this.startValue;
      this.dispatchValueChange('changeendvalue', this.endValue);
      return false;
    }

    return true;
  }

  private calculateRoundedValue(value: number): number {
    return Math.round(value);
  }

  private calculateCoefficient(currentValue: number): number {
    return (this.maxValue - this.minValue) / (currentValue - this.minValue);
  }

  private calculateStepValueByRatio(ratio: number, value: number): number {
    const currentValue: number = (this.maxValue - this.minValue) / ratio + this.minValue;
    const reminderOfStepSlider: number = (this.maxValue - this.minValue) % this.stepSize;

    const isEndOfStepSlider: boolean = this.stepSize !== 0
      && reminderOfStepSlider !== 0
      && currentValue < value - reminderOfStepSlider
      && value === this.maxValue
    ;

    const isValueIncreasing: boolean = currentValue > value + this.stepSize;
    const isValueDecreasing: boolean = currentValue < value - this.stepSize;

    if (currentValue > this.maxValue) return this.maxValue;
    if (currentValue < this.minValue) return this.minValue;
    if (isValueIncreasing) return value + this.stepSize;
    if (isEndOfStepSlider) return value - reminderOfStepSlider;
    if (isValueDecreasing) return value - this.stepSize;

    return value;
  }

  private dispatchValueChange(eventType: string, value: number): void {
    this.observableSubject.notifyObservers({
      eventType,
      value: this.calculateRoundedValue(value),
      coefficient: this.calculateCoefficient(value),
    });
  }
}

export default Model;
