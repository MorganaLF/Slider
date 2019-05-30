export type changeValueSettings = {
  eventType: string;
  value: number;
  coefficient: number;
};

export interface IController {
  init(): void;
  destroy(): void;
  initValues(): void;
  reinitializeView(): void;
  getCurrentValue(): number;
  setCurrentValue(val: number): void;
  getCurrentEndValue(): number;
  setCurrentEndValue(val: number): void;
  addChangeValueObserver(func: () => void): void;
}
