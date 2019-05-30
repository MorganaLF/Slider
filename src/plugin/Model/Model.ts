import ObservableSubject from '../ObservableSubject/ObservableSubject';
import {ModelConfig, ModelOptions} from './ModelInterfaces';
import modelConfig from './modelConfig';

class Model {
  [key: string]: any;
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
    this._validateConstructorOptions();
  }

  public initValues(): void {
    this._dispatchValueChange('setstartvalue', this.startValue);
    this._dispatchValueChange('setendvalue', this.endValue);
  }

  public getCurrentRoundedValue(): number {
    return this._calculateRoundedValue(this.startValue);
  }

  public getCurrentRoundedEndValue(): number {
    return this._calculateRoundedValue(this.endValue);
  }

  public setCurrentValue(value: number): void {
    this.startValue = value;
    this._checkNumber('startValue');
    this._checkStepValue('startValue');
    this._checkCurrentValue('startValue');

    if (this.type === 'interval') {
      this._checkIntervalValues('startValue');
    }

    this._dispatchValueChange('changestartvalue', this.startValue);
  }

  public setCurrentEndValue(value: number): void {
    if (this.type === 'single') {
      return;
    }

    this.endValue = value;
    this._checkNumber('endValue');
    this._checkStepValue('endValue');
    this._checkCurrentValue('endValue');
    this._checkIntervalValues('endValue');
    this._dispatchValueChange('changeendvalue', this.endValue);
  }

  public setCurrentValueByRatio(ratio: number, valueKeyName: string): void | boolean {

    if (this.stepSize === 0) {
      this[valueKeyName] = (this.maxValue - this.minValue) / ratio + this.minValue;
    } else {
      this[valueKeyName] = this._calculateStepValueByRatio(ratio, valueKeyName);
    }

    const isIntervalValueInvalid: boolean = this.type === 'interval'
      && !this._checkIntervalValues(valueKeyName);

    if (isIntervalValueInvalid) {
      return false;
    }

    this._checkCurrentValue(valueKeyName);

    if (valueKeyName === 'startValue') {
      this._dispatchValueChange('changestartvalue', this.startValue);
    }

    const isChangingEndValue: boolean = valueKeyName === 'endValue'
      && this.type === 'interval';

    if (isChangingEndValue) {
      this._dispatchValueChange('changeendvalue', this.endValue);
    }
  }

  public calculateCoefficient(currentValue: number): number {
    return (this.maxValue - this.minValue) / (currentValue - this.minValue);
  }

  private _validateConstructorOptions(): void {
    this._checkNumber('startValue');
    this._checkNumber('endValue');
    this._checkNumber('minValue');
    this._checkNumber('maxValue');
    this._checkNumber('stepSize');
    this._checkExtremeValues();
    this._checkPositiveNumber('minValue');
    this._checkPositiveNumber('maxValue');
    this._checkStepValue('startValue');
    this._checkStepValue('endValue');
    this._checkCurrentValue('startValue');
    this._checkCurrentValue('endValue');
  }

  private _checkNumber(valueKeyName: string): void {
    if (isNaN(this[valueKeyName])) {
      const isDefaultValueFromKeyZero = valueKeyName === 'startValue'
        || valueKeyName === 'minValue'
        || valueKeyName === 'stepSize';

      const isDefaultValueFromKeyHundred = valueKeyName === 'endValue'
        || valueKeyName === 'maxValue';

      if (isDefaultValueFromKeyZero) {
        this[valueKeyName] = 0;
      } else if (isDefaultValueFromKeyHundred) {
        this[valueKeyName] = 100;
      }
    }
  }

  private _checkPositiveNumber(valueKeyName: string): void {
    if (this[valueKeyName] < 0) {
      this[valueKeyName] = Math.abs(this[valueKeyName]);
    }
  }

  private _checkExtremeValues(): void {
    if (this.minValue > this.maxValue) {
      if (this.stepSize === 0) {
        this.minValue = this.maxValue - 1;
      } else {
        this.minValue = this.maxValue - this.stepSize;
      }
    }
  }

  private _checkCurrentValue(valueKeyName: string): void {
    if (this[valueKeyName] < this.minValue) {
      this[valueKeyName] = this.minValue;
    }

    if (this[valueKeyName] > this.maxValue) {
      this[valueKeyName] = this.maxValue;
    }
  }

  private _checkStepValue(valueKeyName: string): void {
    const shouldStepValueBeRounded: boolean = (this.stepSize !== 0)
      && this[valueKeyName] !== 0
      && this[valueKeyName] !== this.maxValue
      && ((this[valueKeyName] - this.minValue) % this.stepSize !== 0);

    const roundedStepValue = Math.round((this[valueKeyName] - this.minValue) / this.stepSize)
      * this.stepSize;

    if (shouldStepValueBeRounded) {
      this[valueKeyName] = roundedStepValue  + this.minValue;
    }
  }

  private _checkIntervalValues(valueKeyName: string): boolean {
    const isStartValueExceedsEndValue: boolean = (this.startValue > this.endValue)
      && (this[valueKeyName] === this.startValue);

    if (isStartValueExceedsEndValue) {
      this.startValue = this.endValue;
      this._dispatchValueChange('changestartvalue', this.startValue);
      return false;
    }

    const isEndValueExceedsStartValue: boolean = (this.endValue < this.startValue)
      && (this[valueKeyName] === this.endValue);

    if (isEndValueExceedsStartValue) {
      this.endValue = this.startValue;
      this._dispatchValueChange('changeendvalue', this.endValue);
      return false;
    }

    return true;
  }

  private _calculateRoundedValue(value: number): number {
    return Math.round(value);
  }

  private _calculateStepValueByRatio(ratio: number, valueKeyName: string): number {
    const currentValue: number = (this.maxValue - this.minValue) / ratio + this.minValue;
    const reminderOfStepSlider: number = (this.maxValue - this.minValue) % this.stepSize;

    const isEndOfStepSlider: boolean = this.stepSize !== 0
      && reminderOfStepSlider !== 0
      && currentValue < this[valueKeyName] - reminderOfStepSlider
      && this[valueKeyName] === this.maxValue
    ;

    const isValueIncreasing: boolean = currentValue > this[valueKeyName] + this.stepSize;
    const isValueDecreasing: boolean = currentValue < this[valueKeyName] - this.stepSize;

    if (currentValue > this.maxValue) return this.maxValue;
    if (currentValue < this.minValue) return this.minValue;
    if (isValueIncreasing) return this[valueKeyName] + this.stepSize;
    if (isEndOfStepSlider) return this[valueKeyName] - reminderOfStepSlider;
    if (isValueDecreasing) return this[valueKeyName] - this.stepSize;

    return this[valueKeyName];
  }

  private _dispatchValueChange(eventType: string, value: number): void {
    this.observableSubject.notifyObservers({
      eventType,
      value: this._calculateRoundedValue(value),
      coefficient: this.calculateCoefficient(value),
    });
  }
}

export default Model;
