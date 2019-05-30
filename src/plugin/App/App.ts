import { AppOptions } from './AppInterfaces';
import Controller from '../Controller/Controller';
import { IController } from '../Controller/ControllerInterfaces';
import Model from '../Model/Model';
import modelConfig from '../Model/modelConfig';
import { IModel, ModelConfig } from '../Model/ModelInterfaces';
import MainView from '../View/MainView/MainView';
import mainViewConfig from '../View/MainView/mainViewConfig';
import { IMainView, MainViewConfig } from '../View/MainView/MainViewInterfaces';

class App {
  public model: IModel;
  public view: IMainView;
  public controller: IController;
  readonly modelConfig: ModelConfig;
  readonly viewConfig: MainViewConfig;

  constructor(options: AppOptions) {
    this.modelConfig = { ...modelConfig, ...options };
    this.viewConfig = { ...mainViewConfig, ...options };
    this.model = this._createModelInstance();
    this.view = this._createViewInstance();
    this.controller = new Controller(this.view, this.model);
    this.controller.initValues();
  }

  public getSliderType(): string {
    return this.modelConfig.type;
  }

  public getCurrentValue(): number {
    return this.controller.getCurrentValue();
  }

  public setCurrentValue(val: number): void {
    return this.controller.setCurrentValue(val);
  }

  public getCurrentEndValue(): number {
    return this.controller.getCurrentEndValue();
  }

  public setCurrentEndValue(val: number): void {
    this.controller.setCurrentEndValue(val);
  }

  public getMinValue(): number {
    return this.modelConfig.minValue;
  }

  public setMinValue(val: number | string): void {
    this.modelConfig.minValue = typeof val === 'string' ? parseInt(val, 10) : val;
    this.modelConfig.startValue = this.getCurrentValue();
    this.modelConfig.endValue = this.getCurrentEndValue();
    this._updateModel();
  }

  public getMaxValue(): number {
    return this.modelConfig.maxValue;
  }

  public setMaxValue(val: number | string): void {
    this.modelConfig.maxValue = typeof val === 'string' ? parseInt(val, 10) : val;
    this.modelConfig.startValue = this.getCurrentValue();
    this.modelConfig.endValue = this.getCurrentEndValue();
    this._updateModel();
  }

  public getStepSize(): number {
    return this.modelConfig.stepSize;
  }

  public setStepSize(val: number | string): void {
    this.modelConfig.stepSize = typeof val === 'string' ? parseInt(val, 10) : val;
    this.modelConfig.startValue = this.getCurrentValue();
    this.modelConfig.endValue = this.getCurrentEndValue();
    this._updateModel();
  }

  public setVerticalOrientation(): void {
    this.viewConfig.orientation = 'vertical';
    this.updateView();
  }

  public setHorizontalOrientation(): void {
    this.viewConfig.orientation = 'horizontal';
    this.updateView();
  }

  public isTipShown(): boolean {
    return this.viewConfig.withTip;
  }

  public showTip(): void {
    this.viewConfig.withTip = true;
    this.updateView();
  }

  public hideTip(): void {
    this.viewConfig.withTip = false;
    this.updateView();
  }

  public isScaleShown(): boolean {
    return this.viewConfig.withScale;
  }

  public showScale(): void {
    this.viewConfig.withScale = true;
    this.updateView();
  }

  public hideScale(): void {
    this.viewConfig.withScale = false;
    this.updateView();
  }

  public observeChangeValue(func: () => void): void {
    this.controller.addChangeValueObserver(func);
  }

  private updateView(): void {
    this.controller.destroy();
    this._createViewInstance();
    this.controller = new Controller(this.view, this.model);
    this.controller.initValues();
  }

  private _updateModel(): void {
    this._createModelInstance();
    this.controller.reinitializeView();
    this.controller = new Controller(this.view, this.model);
    this.controller.initValues();
  }

  private _createModelInstance(): IModel {
    return this.model = new Model(this.modelConfig);
  }

  private _createViewInstance(): IMainView {
    return this.view = new MainView(this.viewConfig);
  }
}

export default App;
