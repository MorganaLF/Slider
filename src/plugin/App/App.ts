import { AppOptions } from './AppInterfaces';
import Controller from '../Controller/Controller';
import { IController } from '../Controller/ControllerInterfaces';
import Model from '../Model/Model';
import { IModel } from '../Model/ModelInterfaces';
import View from '../views/View/View';
import { IView } from '../views/View/ViewInterfaces';

class App {
  public model: null | IModel;
  public view: null | IView;
  public controller: null | IController;
  public minValue: number;
  public maxValue: number;
  public stepSize: number;
  public orientation: string;
  public withTip: boolean;
  public withScale: boolean;
  public scaleMarksQuantity: number;
  public startValue: number;
  public endValue: number;
  public type: string;
  readonly $element: JQuery;

  constructor(options: AppOptions) {
    this.model = null;
    this.view = null;
    this.controller = null;
    this.minValue = options.minValue || 0;
    this.maxValue = options.maxValue || 100;
    this.stepSize = options.stepSize || 0;
    this.orientation = options.orientation || 'horizontal';
    this.withTip = options.withTip !== false;
    this.withScale = options.withScale === true;
    this.scaleMarksQuantity = options.scaleMarksQuantity || 10;
    this.$element = options.$element;
    this.startValue = options.startValue || 0;
    this.endValue = options.endValue || 100;
    this.type = options.type || 'single';
  }

  public getCurrentValue(): number {
    return this.model ? this.model.getCurrentRoundedValue() : 0;
  }

  public setCurrentValue(val: number): void | false {
    if (!this.model) return false;

    this.model.setCurrentValue(val);
  }

  public getCurrentEndValue(): number {
    return this.model ? this.model.getCurrentRoundedEndValue() : 0;
  }

  public setCurrentEndValue(val: number): void | false {
    if (!this.model) return false;

    this.model.setCurrentEndValue(val);
  }

  public getMinValue(): number {
    return this.model ? this.model.minValue! : 0;
  }

  public setMinValue(val: number | string): void {
    this.minValue = typeof val === 'string' ? parseInt(val, 10) : val;
    this.init();
  }

  public getMaxValue(): number {
    return this.model ? this.model.maxValue! : 0;
  }

  public setMaxValue(val: number | string): void {
    this.maxValue = typeof val === 'string' ? parseInt(val, 10) : val;
    this.init();
  }

  public getStepSize(): number {
    return this.model ? this.model.stepSize! : 0;
  }

  public setStepSize(val: number): void {
    this.stepSize = val;
    this.init();
  }

  public getScaleMarksQuantity(): number {
    return this.scaleMarksQuantity;
  }

  public setScaleMarksQuantity(val: number): void {
    this.scaleMarksQuantity = val;
    this.updateView();
  }

  public setVerticalOrientation(): void {
    this.orientation = 'vertical';
    this.updateView();
  }

  public setHorizontalOrientation(): void {
    this.orientation = 'horizontal';
    this.updateView();
  }

  public isTipShown(): boolean {
    return this.withTip;
  }

  public showTip(): void {
    this.withTip = true;
    this.updateView();
  }

  public hideTip(): void {
    this.withTip = false;
    this.updateView();
  }

  public isScaleShown(): boolean {
    return this.withScale;
  }

  public showScale(): void {
    this.withScale = true;
    this.updateView();
  }

  public hideScale(): void {
    this.withScale = false;
    this.updateView();
  }

  public updateView(): void {
    if (this.controller) {
      this.controller.destroy();
      this.controller = null;
    }

    this._createViewInstance();

    if (this.model !== null) {
      this.view!.updateSlider();
      this.controller = new Controller(this.view!, this.model);
    }

    this.controller!.init();

    if (this.model !== null) this.model.initValues();
  }

  public init(): void {
    this._createModelInstance();
    this._createViewInstance();

    this.view!.updateSlider();

    this.controller = new Controller(this.view!, this.model!);
    this.controller.init();

    this.model!.initValues();
  }

  private _createModelInstance() {
    this.model = new Model({
      startValue: this.startValue,
      endValue: this.endValue,
      minValue: this.minValue,
      maxValue: this.maxValue,
      stepSize: this.stepSize,
      type: this.type,
    });
  }

  private _createViewInstance() {
    this.view = new View({
      $element: this.$element,
      type: this.type,
      orientation: this.orientation,
      withTip: this.withTip,
      withScale: this.withScale,
      scaleMarksQuantity: this.scaleMarksQuantity,
    });
  }
}

export default App;