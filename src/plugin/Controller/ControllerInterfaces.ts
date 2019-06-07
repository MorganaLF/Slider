export type changeValueSettings = {
  eventType: string;
  value: number;
  coefficient: number;
};

export interface IController {
  init(): void;
  initRangeValues(): void;
  reinitializeView(): void;
  getSliderType(): string;
  getMinValue(): number;
  setMinValue(val: number): void;
  getMaxValue(): number;
  setMaxValue(val: number): void;
  getStepSize(): number;
  setStepSize(val: number): void;
  getCurrentValue(): number;
  setCurrentValue(val: number): void;
  getCurrentEndValue(): number;
  setCurrentEndValue(val: number): void;
  setVerticalOrientation(): void;
  setHorizontalOrientation(): void;
  isTipShown(): boolean;
  showTip(): void;
  hideTip(): void;
  isScaleShown(): boolean;
  showScale(): void;
  hideScale(): void;
  addChangeValueObserver(func: () => void): void;
}
