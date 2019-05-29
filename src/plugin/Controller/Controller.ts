import { IModel } from '../Model/ModelInterfaces';
import { IView } from '../views/View/ViewInterfaces';
import { changeValueSettings } from './ControllerInterfaces';

class Controller {
  readonly withScale: boolean;
  readonly type: string;
  readonly observeChangeValue = this._observeChangeValue.bind(this);
  readonly observeResize = this._observeResize.bind(this);
  readonly observeStartRunnerMove = this._observeStartRunnerMove.bind(this);
  readonly observeEndRunnerMove = this._observeEndRunnerMove.bind(this);
  readonly observeClickOnScale = this._observeClickOnScale.bind(this);

  constructor(private view: IView, private model: IModel) {
    this.withScale = view.withScale!;
    this.type = view.type!;
  }

  public init(): void {
    this.model.observableSubject.addObserver(this.observeChangeValue);
    this.view.observableSubject.addObserver(this.observeResize);
    this.view.startRunnerObservableSubject.addObserver(this.observeStartRunnerMove);
    this.view.endRunnerObservableSubject.addObserver(this.observeEndRunnerMove);
    this.view.scaleObservableSubject.addObserver(this.observeClickOnScale);
  }

  public destroy(): void {
    this.model.observableSubject.removeObserver(this.observeChangeValue);
    this.view.observableSubject.removeObserver(this.observeResize);
    this.view.startRunnerObservableSubject.removeObserver(this.observeStartRunnerMove);
    this.view.endRunnerObservableSubject.removeObserver(this.observeEndRunnerMove);
    this.view.scaleObservableSubject.removeObserver(this.observeClickOnScale);
  }

  private _observeResize(): void {
    this.view.reinitialize();
    this.model.initValues();
  }

  private _observeStartRunnerMove(ratio: number): void {
    this.model.setCurrentValueByRatio(ratio, 'startValue');
  }

  private _observeEndRunnerMove(ratio: number): void {
    this.model.setCurrentValueByRatio(ratio, 'endValue');
  }

  private _observeChangeValue({ eventType, value, coefficient }: changeValueSettings): void {
    let valueType: string;

    const isRunnersAtTheEndOfSlider = this.type === 'interval'
      && this.model.startValue === this.model.maxValue;

    const isRunnersAtTheStartOfSlider = this.type === 'interval'
      && this.model.endValue === this.model.minValue;

    const isStartValueChanging = eventType === 'changestartvalue' || eventType === 'setstartvalue';

    const isEndValueChanging = eventType === 'changeendvalue' && this.type === 'interval'
      || eventType === 'setendvalue' && this.type === 'interval';

    if (isStartValueChanging) {
      valueType = 'start';

      this.view.update({
        valueType,
        coefficient,
        value,
        isRunnersAtTheEndOfSlider,
        isRunnersAtTheStartOfSlider,
      });
    } else if (isEndValueChanging) {
      valueType = 'end';

      this.view.update({
        valueType,
        coefficient,
        value,
        isRunnersAtTheEndOfSlider,
        isRunnersAtTheStartOfSlider,
      });
    }

    const isScaleInitialized = this.withScale && eventType === 'setstartvalue';

    if (isScaleInitialized) {
      this.view.drawScale({
        stepSize: this.model.stepSize!,
        minValue: this.model.minValue!,
        maxValue: this.model.maxValue!,
      });
    }
  }

  private _observeClickOnScale(value: number): void {
    const isClickNearByStartRunner: boolean = this.type === 'interval'
      && (Math.abs(value - this.model.startValue!)
      > Math.abs(value - this.model.endValue!)
      || value === this.model.endValue!);

    if (isClickNearByStartRunner) {
      this.model.setCurrentEndValue(value);
    } else {
      this.model.setCurrentValue(value);
    }
  }
}

export default Controller;
