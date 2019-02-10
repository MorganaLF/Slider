import $ from 'jquery';
import SliderView from './view';
import SliderModel from './model';
import SliderController from './controller';
export default $.fn.customSlider;

class SliderApp {
  constructor (options = {}) {
    $.extend(this, {
      el: options.element,
      startValue: 0,
      endValue: 100,
      minVal: 0,
      maxVal: 100,
      type: 'single',
      orientation: 'horizontal',
      step: 0,
      isTip: true,
      isScale: false,
      sliderModel: null,
      sliderView: null,
      sliderController: null
    }, options);
  }

  currentValue () {
    return this.sliderModel.calculateRoundValue(this.sliderModel.startValue);
  }

  currentMaxValue () {
    return this.sliderModel.calculateRoundValue(this.sliderModel.endValue);
  }

  minValue () {
    return this.sliderModel.minVal;
  }

  maxValue () {
    return this.sliderModel.maxVal;
  }

  setMinValue (val) {
    this.minVal = parseInt(val);
    this.init();
  }

  setMaxValue (val) {
    this.maxVal = parseInt(val);
    this.init();
  }

  setCurrentValue (val) {
    this.sliderModel.setCurrentValue(val);
  }

  setCurrentMaxValue (val) {
    this.sliderModel.setCurrentMaxValue(val);
  }

  showTip () {
    this.isTip = true;
    this.init();
  }

  hideTip () {
    this.isTip = false;
    this.init();
  }

  showScale () {
    this.isScale = true;
    this.init();
  }

  hideScale () {
    this.isScale = false;
    this.init();
  }

  setVeticalOrientation () {
    this.orientation = 'vertical';
    this.init();
  }

  setHorisontalOrientation () {
    this.orientation = 'horizontal';
    this.init();
  }

  init () {
    this.sliderModel = new SliderModel({
      startValue: this.startValue,
      endValue: this.endValue,
      minVal: this.minVal,
      maxVal: this.maxVal,
      step: this.step,
      type: this.type
    });

    this.sliderView = new SliderView({
      el: this.el,
      type: this.type,
      orientation: this.orientation,
      model: this.sliderModel,
      isTip: this.isTip,
      isScale: this.isScale
    });
    this.sliderView.updateSlider();

    this.sliderController = new SliderController(this.sliderView, this.sliderModel);
    this.sliderController.init();
  }
}

  // let methods = {
  //   init : function( options ) {
  //     return this.each(function() {
  //       let dataConfig = {
  //         startValue: $(this).data('start-value'),
  //         endValue: $(this).data('end-value'),
  //         minVal: $(this).data('min-value'),
  //         maxVal: $(this).data('max-value'),
  //         type: $(this).data('type'),
  //         orientation: $(this).data('orientation'),
  //         step: $(this).data('step'),
  //         isTip: $(this).data('tip'),
  //         isScale: $(this).data('scale')
  //       };
  //
  //       let config = $.extend({}, {
  //         startValue: 0,
  //         endValue: 100,
  //         minVal: 0,
  //         maxVal: 100,
  //         type: 'single',
  //         orientation: 'horizontal',
  //         step: 0,
  //         isTip: true,
  //         isScale: false
  //       }, options, dataConfig);
  //
  //       let sliderModel = new SliderModel({
  //         startValue: config.startValue,
  //         endValue: config.endValue,
  //         minVal: config.minVal,
  //         maxVal: config.maxVal,
  //         step: config.step,
  //         type: config.type
  //       });
  //
  //       let sliderView = new SliderView({
  //         el: $(this),
  //         type: config.type,
  //         orientation: config.orientation,
  //         model: sliderModel,
  //         isTip: config.isTip,
  //         isScale: config.isScale
  //       });
  //       sliderView.drawSlider();
  //
  //       let sliderController = new SliderController(sliderView, sliderModel);
  //       sliderController.init();
  //     });
  //
  //   },
  //   showMinValue : function( ) {
  //
  //   },
  //   hide : function( ) {
  //
  //   },
  //   update : function( content ) {
  //
  //   }
  // };

let result;
  $.fn.customSlider = function(options) {

    let args = arguments;

    this.each(function () {

      if (typeof options === 'object' || ! options) {
          let dataConfig = {
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

    //console.log(result)
    return result;



    // function init(e) {
    //
    //   let dataConfig = {
    //     startValue: e.data('start-value'),
    //     endValue: e.data('end-value'),
    //     minVal: e.data('min-value'),
    //     maxVal: e.data('max-value'),
    //     type: e.data('type'),
    //     orientation: e.data('orientation'),
    //     step: e.data('step'),
    //     isTip: e.data('tip'),
    //     isScale: e.data('scale')
    //   };
    //
    //   let config = $.extend({}, {
    //     startValue: 0,
    //     endValue: 100,
    //     minVal: 0,
    //     maxVal: 100,
    //     type: 'single',
    //     orientation: 'horizontal',
    //     step: 0,
    //     isTip: true,
    //     isScale: false
    //   }, options, dataConfig);
    //
    //   let sliderModel = new SliderModel({
    //     startValue: config.startValue,
    //     endValue: config.endValue,
    //     minVal: config.minVal,
    //     maxVal: config.maxVal,
    //     step: config.step,
    //     type: config.type
    //   });
    //
    //   let sliderView = new SliderView({
    //     el: e,
    //     type: config.type,
    //     orientation: config.orientation,
    //     model: sliderModel,
    //     isTip: config.isTip,
    //     isScale: config.isScale
    //   });
    //   sliderView.drawSlider();
    //
    //   let sliderController = new SliderController(sliderView, sliderModel);
    //   sliderController.init();
    // }
    // this.each(function() { init($(this)); });
    // return this;
  };

  $('.slider').customSlider({
    //startValue: 10,
    //endValue: 80,
    //minVal: 5,
    //maxVal: 150,
    //type: 'interval',
    //orientation: 'vertical',
    //step: 17,
    //isTip: true
  });

