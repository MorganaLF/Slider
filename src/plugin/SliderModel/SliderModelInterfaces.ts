export type SliderModelOptions = {
  startValue: number,
  endValue: number,
  minVal: number,
  maxVal: number,
  type: string,
  step: number,
};

export interface ISliderModel extends SliderModelOptions{
  currentRoundValue: number;
  currentRoundEndValue: number;
  currentValue: number;
  currentMaxValue: number;
  calculateCoefficient (point: number): number;
  calculateValue (val: number, valueName: string): void | boolean;
}