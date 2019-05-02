import SliderApp from './SliderApp/SliderApp';
import { SliderAppOptions } from './SliderApp/SliderAppInterfaces';

$.fn.customSlider = function(options: SliderAppOptions | string, ...args) {
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

    const extendedOptions = $.extend({ $element: $this }, options, dataConfig);
    $this.data('constructor', new SliderApp(extendedOptions));

    return $this.data('constructor').init();
  }

  if (typeof options === 'string') {
    return $this.data('constructor')[options](...args);
  }
};

export default $.fn.customSlider;
