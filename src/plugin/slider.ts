import Model from './Model/Model';
import { ModelOptions } from './Model/ModelInterfaces';
import MainView from './View/MainView/MainView';
import Controller from './Controller/Controller';

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
    const view = new MainView({ model, $element: $this});

    $this.data('constructor', new Controller(view, model));
    return $this.data('constructor');
  }

  if (typeof options === 'string') {
    return $this.data('constructor')[options](...args);
  }
};

export default $.fn.customSlider;
