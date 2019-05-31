import { IModel } from '../Model/ModelInterfaces';
import { IMainView } from '../View/MainView/MainViewInterfaces';
import { changeValueSettings } from './ControllerInterfaces';

class Controller {
  readonly withScale: boolean;
  readonly type: string;
  readonly changeValueObserver = this.observeChangeValue.bind(this);
  readonly resizeObserver = this.observeResize.bind(this);
  readonly startRunnerMoveObserver = this.observeStartRunnerMove.bind(this);
  readonly endRunnerMoveObserver = this.observeEndRunnerMove.bind(this);
  readonly clickOnScaleObserver = this.observeClickOnScale.bind(this);

  constructor(private view: IMainView, private model: IModel) {
    this.withScale = view.withScale!;
    this.type = view.type!;
    this.init();
  }

  public init(): void {
    this.model.observableSubject.addObserver(this.changeValueObserver);
    this.view.observableSubject.addObserver(this.resizeObserver);
    this.view.startRunnerObservableSubject.addObserver(this.startRunnerMoveObserver);
    this.view.endRunnerObservableSubject.addObserver(this.endRunnerMoveObserver);
    this.view.scaleObservableSubject.addObserver(this.clickOnScaleObserver);
  }

  public destroy(): void {
    this.model.observableSubject.removeObserver(this.changeValueObserver);
    this.view.observableSubject.removeObserver(this.resizeObserver);
    this.view.startRunnerObservableSubject.removeObserver(this.startRunnerMoveObserver);
    this.view.endRunnerObservableSubject.removeObserver(this.endRunnerMoveObserver);
    this.view.scaleObservableSubject.removeObserver(this.clickOnScaleObserver);
  }

  public initValues(): void {
    this.model.initValues();
  }

  public reinitializeView(): void {
    this.view.reinitialize();
  }

  public getCurrentValue(): number {
    return this.model.getCurrentRoundedValue();
  }

  public setCurrentValue(val: number): void {
    this.model.setCurrentValue(val);
  }

  public getCurrentEndValue(): number {
    return this.model.getCurrentRoundedEndValue();
  }

  public setCurrentEndValue(val: number): void {
    this.model.setCurrentEndValue(val);
  }

  public addChangeValueObserver(func: () => void): void {
    this.model.observableSubject.addObserver(func);
  }

  private observeResize(): void {
    this.view.reinitialize();
    this.model.initValues();
  }

  private observeStartRunnerMove(ratio: number): void {
    this.model.setCurrentValueByRatio(ratio, 'startValue');
  }

  private observeEndRunnerMove(ratio: number): void {
    this.model.setCurrentValueByRatio(ratio, 'endValue');
  }

  private observeChangeValue({ eventType, value, coefficient }: changeValueSettings): void {
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

  private observeClickOnScale(value: number): void {
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
