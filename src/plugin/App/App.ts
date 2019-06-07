import { AppOptions } from './AppInterfaces';
import Controller from '../Controller/Controller';
import Model from '../Model/Model';
import modelConfig from '../Model/modelConfig';
import MainView from '../View/MainView/MainView';

class App {
  public model: Model;
  public view: MainView;
  public controller: Controller;
  readonly elementIndex: number;

  constructor(options: AppOptions) {
    this.elementIndex = options.elementIndex;
    this.model = new Model({ ...modelConfig, ...options });

    this.view = new MainView({
      $element: options.$element,
      elementIndex: options.elementIndex,
      model: this.model,
    });

    this.controller = new Controller(this.view, this.model);
  }

  public getSliderType(): string {
    return this.controller.getSliderType();
  }

  public getCurrentValue(): number {
    return this.controller.getCurrentValue();
  }

  public setCurrentValue(val: number): void {
    this.controller.setCurrentValue(val);
  }

  public getCurrentEndValue(): number {
    return this.controller.getCurrentEndValue();
  }

  public setCurrentEndValue(val: number): void {
    this.controller.setCurrentEndValue(val);
  }

  public getMinValue(): number {
    return this.controller.getMinValue();
  }

  public setMinValue(val: number): void {
    this.controller.setMinValue(val);
  }

  public getMaxValue(): number {
    return this.controller.getMaxValue();
  }

  public setMaxValue(val: number): void {
    this.controller.setMaxValue(val);
  }

  public getStepSize(): number {
    return this.controller.getStepSize();
  }

  public setStepSize(val: number): void {
    this.controller.setStepSize(val);
  }

  public setVerticalOrientation(): void {
    this.controller.setVerticalOrientation();
  }

  public setHorizontalOrientation(): void {
    this.controller.setHorizontalOrientation();
  }

  public isTipShown(): boolean {
    return this.controller.isTipShown();
  }

  public showTip(): void {
    this.controller.showTip();
  }

  public hideTip(): void {
    this.controller.hideTip();
  }

  public isScaleShown(): boolean {
    return this.controller.isScaleShown();
  }

  public showScale(): void {
    this.controller.showScale();
  }

  public hideScale(): void {
    this.controller.hideScale();
  }

  public observeChangeValue(func: () => void): void {
    this.controller.addChangeValueObserver(func);
  }
}

export default App;
