import { ModelOptions } from './ModelInterfaces';

class Model {
  [key: string]: any;
  public startValue: number;
  public endValue: number;
  public minValue: number;
  public maxValue: number;
  public type: string;
  public stepSize: number;

  constructor(options: ModelOptions) {
    this.startValue = options.startValue || 0;
    this.endValue = options.endValue || 100;
    this.minValue = options.minValue || 0;
    this.maxValue = options.maxValue || 100;
    this.type = options.type || 'single';
    this.stepSize = options.stepSize || 0;
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
    this._checkCurrentValue('startValue');
    this._checkStepValue('startValue');

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
    this._checkCurrentValue('endValue');
    this._checkStepValue('endValue');
    this._checkIntervalValues('endValue');
    this._dispatchValueChange('changeendvalue', this.endValue);
  }

  public setCurrentValueByRatio(ratio: number, valueKeyName: string): void | boolean {

    if (this.stepSize === 0) {
      this[valueKeyName] = (this.maxValue - this.minValue) / ratio + this.minValue;
    } else {
      this[valueKeyName] = this._calculateStepValueByRatio(ratio) + this.minValue;
    }

    const isIntervalValueInvalid: boolean = this.type === 'interval'
      && !this._checkIntervalValues(valueKeyName);

    if (isIntervalValueInvalid) {
      return false;
    }

    if (this[valueKeyName] === this.startValue) {
      this._dispatchValueChange('changestartvalue', this.startValue);
    }

    const isChangingEndValue: boolean = this[valueKeyName] === this.endValue
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
    this._checkCurrentValue('startValue');
    this._checkCurrentValue('endValue');
    this._checkStepValue('minValue');
    this._checkStepValue('maxValue');
    this._checkStepValue('startValue');
    this._checkStepValue('endValue');
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
      && (this[valueKeyName] % this.stepSize !== 0);

    if (shouldStepValueBeRounded) {
      this[valueKeyName] = Math.round(this[valueKeyName] / this.stepSize) * this.stepSize;
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

  private _calculateStepValueByRatio(ratio: number): number {
    return (Math.round((this.maxValue - this.minValue) / ratio / this.stepSize)) * this.stepSize;
  }

  private _dispatchValueChange(type: string, value: number): void {
    const changeValueEvent = $.Event(type, { detail: {
      model: this,
      value: this._calculateRoundedValue(value),
      coefficient: this.calculateCoefficient(value),
    },
    });

    const $body = $(document.body);
    $body.trigger(changeValueEvent);
  }
}

export default Model;
