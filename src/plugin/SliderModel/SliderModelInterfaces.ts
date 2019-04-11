export type SliderModelOptions = {
  startValue: number,
  endValue: number,
  minValue: number,
  maxValue: number,
  type: string,
  stepSize: number,
};

export interface ISliderModel extends SliderModelOptions{
  currentRoundValue: number;
  currentRoundEndValue: number;
  currentValue: number;
  currentMaxValue: number;
  calculateCoefficient(point: number): number;
  setCurrentValueByRatio(ratio: number, valueKeyName: string): void | boolean;
}
