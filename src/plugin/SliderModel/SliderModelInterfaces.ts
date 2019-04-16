export type SliderModelOptions = {
  startValue?: number,
  endValue?: number,
  minValue?: number,
  maxValue?: number,
  type?: string,
  stepSize?: number,
};

export interface ISliderModel extends SliderModelOptions{
  initValues(): void;
  getCurrentRoundedValue(): number;
  getCurrentRoundedEndValue(): number;
  setCurrentValue(value: number): void;
  setCurrentEndValue(value: number): void;
  calculateCoefficient(point: number): number;
  setCurrentValueByRatio(ratio: number, valueKeyName: string): void | boolean;
}
