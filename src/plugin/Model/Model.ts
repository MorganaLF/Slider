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
  public withTip: boolean;
  public withScale: boolean;
  public orientation: string;
  readonly config: ModelConfig;

  constructor(options: ModelOptions) {
    this.config = { ...modelConfig, ...options };
    this.startValue = this.config.startValue;
    this.endValue = this.config.endValue;
    this.minValue = this.config.minValue;
    this.maxValue = this.config.maxValue;
    this.type = this.config.type;
    this.stepSize = this.config.stepSize;
    this.withTip = this.config.withTip;
    this.withScale = this.config.withScale;
    this.orientation = this.config.orientation;
    this.normalizeConstructorOptions();
  }

  public initRangeValues(): void {
    this.dispatchRangeChange('setstartvalue', this.startValue);
    this.dispatchRangeChange('setendvalue', this.endValue);
  }

  public getCurrentRoundedValue(): number {
    return Math.round(this.startValue);
  }

  public getCurrentRoundedEndValue(): number {
    return Math.round(this.endValue);
  }

  public setCurrentValue(startBound: number): void {
    const normalizedToNumberRangeBound = this.normalizeToNumber(startBound, this.config.startValue);
    const alignedToStepRangeBound = this.alignToStep(normalizedToNumberRangeBound);

    this.startValue = this.clampRangeBetweenEdges(alignedToStepRangeBound);

    const areBoundsInWrongOrder = this.type === 'interval' && this.startValue > this.endValue;

    if (areBoundsInWrongOrder) {
      this.setBoundsInRightOrder(this.startValue);
    } else {
      this.dispatchRangeChange('changestartvalue', this.startValue);
    }
  }

  public setCurrentEndValue(endBound: number): void {
    if (this.type === 'single') return;

    const normalizedToNumberRangeBound = this.normalizeToNumber(endBound, this.config.endValue);
    const alignedToStepRangeBound = this.alignToStep(normalizedToNumberRangeBound);

    this.endValue = this.clampRangeBetweenEdges(alignedToStepRangeBound);

    if (this.startValue > this.endValue) {
      this.setBoundsInRightOrder(this.endValue);
    } else {
      this.dispatchRangeChange('changeendvalue', this.endValue);
    }
  }

  public setRangeBoundByRatio(
    ratio: number,
    rangeBoundKeyName: 'startValue' | 'endValue',
  ): void {

    if (this.stepSize === 0) {
      this[rangeBoundKeyName] = (this.maxValue - this.minValue) / ratio + this.minValue;
    } else {
      this[rangeBoundKeyName] = this.calculateAndAlignToStepBound(ratio, this[rangeBoundKeyName]);
    }

    const areBoundsInWrongOrder: boolean = this.type === 'interval'
      && this.startValue > this.endValue;

    if (areBoundsInWrongOrder) {
      this.setBoundsInRightOrder(this[rangeBoundKeyName]);
    } else {
      this[rangeBoundKeyName] = this.clampRangeBetweenEdges(this[rangeBoundKeyName]);

      if (rangeBoundKeyName === 'startValue') {
        this.dispatchRangeChange('changestartvalue', this.startValue);
      }

      const isChangingEndBound: boolean = rangeBoundKeyName === 'endValue'
        && this.type === 'interval';

      if (isChangingEndBound) {
        this.dispatchRangeChange('changeendvalue', this.endValue);
      }
    }
  }

  public normalizeConstructorOptions(): void {
    const normalizedToNumberStartBound = this.normalizeToNumber(
      this.startValue,
      this.config.startValue,
    );

    const normalizedToNumberEndBound = this.normalizeToNumber(this.endValue, this.config.endValue);
    const normalizedToNumberMinValue = this.normalizeToNumber(this.minValue, this.config.minValue);
    const normalizedToNumberMaxValue = this.normalizeToNumber(this.maxValue, this.config.maxValue);

    this.stepSize = this.normalizeToNumber(this.stepSize, this.config.stepSize);

    this.setRightOrderOfExtremeValues();

    this.minValue = this.normalizeToPositiveNumber(normalizedToNumberMinValue);
    this.maxValue = this.normalizeToPositiveNumber(normalizedToNumberMaxValue);

    const alignedToStepStartBound = this.alignToStep(normalizedToNumberStartBound);
    const alignedToStepEndBound = this.alignToStep(normalizedToNumberEndBound);

    this.startValue = this.clampRangeBetweenEdges(alignedToStepStartBound);
    this.endValue = this.clampRangeBetweenEdges(alignedToStepEndBound);
  }

  private normalizeToNumber(value: any, defaultValue: number): number {
    if (Number.isNaN(Number(value))) return defaultValue;
    return Number(value);
  }

  private normalizeToPositiveNumber(value: number): number {
    if (value < 0) return Math.abs(value);
    return value;
  }

  private setRightOrderOfExtremeValues(): void {
    if (this.minValue > this.maxValue) {
      if (this.stepSize === 0) {
        this.minValue = this.maxValue - 1;
      } else {
        this.minValue = this.maxValue - this.stepSize;
      }
    }
  }

  private clampRangeBetweenEdges(rangeBound: number): number {
    if (rangeBound < this.minValue) return this.minValue;
    if (rangeBound > this.maxValue) return this.maxValue;
    return rangeBound;
  }

  private alignToStep(rangeBound: number): number {
    const shouldStepValueBeRounded: boolean = (this.stepSize !== 0)
      && rangeBound !== 0
      && rangeBound !== this.maxValue
      && ((rangeBound - this.minValue) % this.stepSize !== 0);

    const roundedStepValue = Math.round((rangeBound - this.minValue)
      / this.stepSize) * this.stepSize;

    if (shouldStepValueBeRounded) return roundedStepValue + this.minValue;
    return rangeBound;
  }

  private setBoundsInRightOrder(changingBound: number): void {
    if (changingBound === this.startValue) {
      this.startValue = this.endValue;
      this.dispatchRangeChange('changestartvalue', this.startValue);
    }

    if (changingBound === this.endValue) {
      this.endValue = this.startValue;
      this.dispatchRangeChange('changeendvalue', this.endValue);
    }
  }

  private calculateAndAlignToStepBound(ratio: number, newRangeBound: number): number {
    const currentRangeBound: number = (this.maxValue - this.minValue) / ratio + this.minValue;
    const intervalNotMultipleOfStep: number = (this.maxValue - this.minValue) % this.stepSize;

    const isEndOfInterval: boolean = this.stepSize !== 0
      && intervalNotMultipleOfStep !== 0
      && currentRangeBound < newRangeBound - intervalNotMultipleOfStep
      && newRangeBound === this.maxValue
    ;

    const isBoundIncreasing: boolean = currentRangeBound > newRangeBound + this.stepSize;
    const isBoundDecreasing: boolean = currentRangeBound < newRangeBound - this.stepSize;

    if (currentRangeBound > this.maxValue) return this.maxValue;
    if (currentRangeBound < this.minValue) return this.minValue;
    if (isBoundIncreasing) return newRangeBound + this.stepSize;
    if (isEndOfInterval) return newRangeBound - intervalNotMultipleOfStep;
    if (isBoundDecreasing) return newRangeBound - this.stepSize;

    return newRangeBound;
  }

  private dispatchRangeChange(eventType: string, value: number): void {
    const ratioOfCurrentValueAndInterval = (this.maxValue - this.minValue)
      / (value - this.minValue);

    this.observableSubject.notifyObservers({
      eventType,
      value: Math.round(value),
      coefficient: ratioOfCurrentValueAndInterval,
    });
  }
}

export default Model;
