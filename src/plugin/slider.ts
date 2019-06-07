import App from './App/App';
import { AppOptions } from './App/AppInterfaces';

$.fn.customSlider = function(options: AppOptions | string, ...args) {
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

    const extendedOptions: any = $.extend({ $element: $this }, options, dataConfig);
    $this.data('constructor', new App(extendedOptions));
  }

  if (typeof options === 'string') {
    return $this.data('constructor')[options](...args);
  }
};

export default $.fn.customSlider;
