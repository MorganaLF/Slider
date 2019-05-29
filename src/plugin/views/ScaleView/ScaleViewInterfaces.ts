import { IObservableSubject } from '../../ObservableSubject/ObservableSubjectInterfaces';

export type drawMarkSettings = {
  markText: number;
  markIndent: number;
};

export type drawScaleSettings = {
  stepSize: number;
  minValue: number;
  maxValue: number;
};

export type ScaleViewOptions = {
  $element?: JQuery,
  $parent: JQuery,
  orientation: string,
  observableSubject?: IObservableSubject,
};

export interface IScaleView {
  observableSubject: IObservableSubject;
  drawScale({}: drawScaleSettings): void;
}
