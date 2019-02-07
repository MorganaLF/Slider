import jQuery from 'jquery';
import SliderView from './view';
import SliderModel from './model';
import SliderController from './controller';

(function($) {

  $.fn.customSlider = function(options) {

    function init(e) {

      let dataConfig = {
        startValue: e.data('start-value'),
        endValue: e.data('end-value'),
        minVal: e.data('min-value'),
        maxVal: e.data('max-value'),
        type: e.data('type'),
        orientation: e.data('orientation'),
        step: e.data('step'),
        isTip: e.data('tip')
      };

      let config = $.extend({}, {
        startValue: 0,
        endValue: 100,
        minVal: 0,
        maxVal: 100,
        type: 'single',
        orientation: 'horizontal',
        step: 0,
        isTip: true
      }, options, dataConfig);

      let sliderModel = new SliderModel({
        startValue: config.startValue,
        endValue: config.endValue,
        minVal: config.minVal,
        maxVal: config.maxVal,
        step: config.step,
        type: config.type
      });

      let sliderView = new SliderView({
        el: e,
        type: config.type,
        orientation: config.orientation,
        model: sliderModel,
        isTip: config.isTip
      });
      sliderView.drawSlider();

      let sliderController = new SliderController(sliderView, sliderModel);
      sliderController.init();
    }
    this.each(function() { init($(this)); });
    return this;
  };

  $('.slider').customSlider({
    //startValue: 10,
    //endValue: 80,
    //minVal: 5,
    //maxVal: 150,
    //type: 'interval',
    //orientation: 'vertical',
    //step: 17,
    isTip: true
  });
})(jQuery);
