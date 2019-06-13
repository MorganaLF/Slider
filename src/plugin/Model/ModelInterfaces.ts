import { IObservableSubject } from '../ObservableSubject/ObservableSubjectInterfaces';

declare global {
  interface JQuery {
    customSlider: (...rest: any[]) => any;
  }
}

export type ModelOptions = {
  startValue?: number,
  endValue?: number,
  minValue?: number,
  maxValue?: number,
  type?: string,
  stepSize?: number,
  withTip?: boolean,
  withScale?: boolean,
  orientation?: string,
};

export type ModelConfig = {
  startValue: number,
  endValue: number,
  minValue: number,
  maxValue: number,
  type: string,
  stepSize: number,
  withTip: boolean,
  withScale: boolean,
  orientation: string,
};

export interface IModel extends ModelOptions{
  observableSubject: IObservableSubject;
  initRangeValues(): void;
  getCurrentRoundedValue(): number;
  getCurrentRoundedEndValue(): number;
  setCurrentValue(value: number): void;
  setCurrentEndValue(value: number): void;
  setRangeBoundByRatio(ratio: number, valueKeyName: string): void;
}
