//import $ from "jquery";
import $ = require('jquery');
import SliderApp from './SliderApp';
import {SliderAppOptions} from './interfaces';

let result: (method: string, arg: string) => void;

$.fn.customSlider = function(options: SliderAppOptions): (method: string, arg: string) => void {

  let args = arguments;

  this.each(function () {

    if (typeof options === 'object' || ! options) {
      let dataConfig: {} = {
        startValue: $(this).data('start-value'),
        endValue: $(this).data('end-value'),
        minValue: $(this).data('min-value'),
        maxValue: $(this).data('max-value'),
        type: $(this).data('type'),
        orientation: $(this).data('orientation'),
        stepSize: $(this).data('step'),
        withTip: $(this).data('tip'),
        withScale: $(this).data('scale')
      };

      options = $.extend({el: $(this)}, options, dataConfig);
      $(this).data('constructor', new SliderApp(options));
      result = $(this).data('constructor').init();

    } else if (typeof options === 'string') {

      result = $(this).data('constructor')[options].apply($(this).data('constructor'), Array.prototype.slice.call( args, 1 ));
    }

  });

  return result;
};
