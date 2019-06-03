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
    const fixedToNumberRangeBound = this.fixToNumber(startBound, this.config.startValue);
    const alignedToStepRangeBound = this.alignToStep(fixedToNumberRangeBound);

    this.startValue = this.clampRangeBetweenEdges(alignedToStepRangeBound);

    const isBoundsInWrongOrder = this.type === 'interval' && this.startValue > this.endValue;

    if (isBoundsInWrongOrder) {
      this.setBoundsInRightOrder(this.startValue);
    } else {
      this.dispatchRangeChange('changestartvalue', this.startValue);
    }
  }

  public setCurrentEndValue(endBound: number): void {
    if (this.type === 'single') return;

    const fixedToNumberRangeBound = this.fixToNumber(endBound, this.config.endValue);
    const alignedToStepRangeBound = this.alignToStep(fixedToNumberRangeBound);

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

    const isBoundsInWrongOrder: boolean = this.type === 'interval'
      && this.startValue > this.endValue;

    if (isBoundsInWrongOrder) {
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

  private fixConstructorOptions(): void {
    const fixedToNumberStartBound = this.fixToNumber(this.startValue, this.config.startValue);
    const fixedToNumberEndBound = this.fixToNumber(this.endValue, this.config.endValue);
    const fixedToNumberMinValue = this.fixToNumber(this.minValue, this.config.minValue);
    const fixedToNumberMaxValue = this.fixToNumber(this.maxValue, this.config.maxValue);

    this.stepSize = this.fixToNumber(this.stepSize, this.config.stepSize);

    this.setRightOrderOfExtremeValues();

    this.minValue = this.fixToPositiveNumber(fixedToNumberMinValue);
    this.maxValue = this.fixToPositiveNumber(fixedToNumberMaxValue);

    const alignedToStepStartBound = this.alignToStep(fixedToNumberStartBound);
    const alignedToStepEndBound = this.alignToStep(fixedToNumberEndBound);

    this.startValue = this.clampRangeBetweenEdges(alignedToStepStartBound);
    this.endValue = this.clampRangeBetweenEdges(alignedToStepEndBound);
  }

  private fixToNumber(value: any, defaultValue: number): number {
    if (Number.isNaN(Number(value))) return defaultValue;
    return Number(value);
  }

  private fixToPositiveNumber(value: number): number {
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
    const divisionRemainderOfInterval: number = (this.maxValue - this.minValue) % this.stepSize;

    const isEndOfInterval: boolean = this.stepSize !== 0
      && divisionRemainderOfInterval !== 0
      && currentRangeBound < newRangeBound - divisionRemainderOfInterval
      && newRangeBound === this.maxValue
    ;

    const isBoundIncreasing: boolean = currentRangeBound > newRangeBound + this.stepSize;
    const isBoundDecreasing: boolean = currentRangeBound < newRangeBound - this.stepSize;

    if (currentRangeBound > this.maxValue) return this.maxValue;
    if (currentRangeBound < this.minValue) return this.minValue;
    if (isBoundIncreasing) return newRangeBound + this.stepSize;
    if (isEndOfInterval) return newRangeBound - divisionRemainderOfInterval;
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
