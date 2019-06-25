import Model from './Model/Model';
import { ModelOptions } from './Model/ModelInterfaces';
import MainView from './View/MainView/MainView';
import Controller from './Controller/Controller';
import { changeValueCallbackSettings } from './Controller/ControllerInterfaces';

$.fn.customSlider = function(options: ModelOptions | string, ...args) {
  const $this = $(this);
  const isSliderInitialized = typeof options === 'object' || !options;

  if (isSliderInitialized) {
    const dataConfig = {
      startValue: $this.data('start-value'),
      endValue: $this.data('end-value'),
      minValue: $this.data('min-value'),
      maxValue: $this.data('max-value'),
      type: $this.data('type'),
      orientation: $this.data('orientation'),
      stepSize: $this.data('step'),
      withTip: $this.data('tip'),
      withScale: $this.data('scale'),
    };

    const extendedOptions: any = $.extend(options, dataConfig);
    const model = new Model(extendedOptions);
    const view = new MainView({ model, $element: $this });
    const controller =  new Controller(view, model);

    function triggerChangeValueEvent(options: changeValueCallbackSettings) {
      const changeValueEvent = $.Event('changevalue', { detail: options });
      $this.trigger(changeValueEvent);
    }

    controller.observableSubject.addObserver(triggerChangeValueEvent);

    if (typeof options !== 'string' && options.onChangeValue !== undefined) {
      $this.on('changevalue.customSlider', options.onChangeValue);
    }

    $this.data('constructor', controller);
    return $this;
  }

  if (typeof options === 'string') {
    return $this.data('constructor')[options](...args);
  }
};

export default $.fn.customSlider;
