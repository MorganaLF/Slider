import $ from "jquery";
import SliderApp from './app';
import {SliderAppOptions} from '../interfaces';
export default $.fn.customSlider;
let result: (method: string, arg: string) => void;

$.fn.customSlider = function(options: SliderAppOptions): (method: string, arg: string) => void {

  let args = arguments;

  this.each(function () {

    if (typeof options === 'object' || ! options) {
      let dataConfig: {} = {
        startValue: $(this).data('start-value'),
        endValue: $(this).data('end-value'),
        minVal: $(this).data('min-value'),
        maxVal: $(this).data('max-value'),
        type: $(this).data('type'),
        orientation: $(this).data('orientation'),
        step: $(this).data('step'),
        isTip: $(this).data('tip'),
        isScale: $(this).data('scale')
      };

      options = $.extend({element: $(this)}, options, dataConfig);
      $(this).data('constructor', new SliderApp(options));
      result = $(this).data('constructor').init();

    } else if (typeof options === 'string') {

      result = $(this).data('constructor')[options].apply($(this).data('constructor'), Array.prototype.slice.call( args, 1 ));
    }

  });

  return result;
};
