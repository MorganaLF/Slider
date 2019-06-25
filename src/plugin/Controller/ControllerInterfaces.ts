export type changeValueSettings = {
  isStartValueChanging: boolean;
  isEndValueChanging: boolean;
  isRangeBoundAtTheEndOfInterval: boolean;
  isRangeBoundAtTheStartOfInterval: boolean;
  isScaleInitialized: boolean;
  eventType: string;
  value: number;
  coefficient: number;
};

export type changeValueCallbackSettings = {
  isEndValueChanging: boolean,
  isRangeBoundAtTheEndOfInterval: boolean,
  isRangeBoundAtTheStartOfInterval: boolean,
  isScaleInitialized: boolean,
  eventType: 'changevalue',
  value: number,
  coefficient: number,
};

export type changeBoundCallbackSettings = {
  ratio: number,
  value: number,
  boundType: 'start' | 'end' | 'either',
};

export type observeBoundSettings = {
  ratio: number,
  value: number,
  boundType: 'start' | 'end' | 'either',
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
