# Custom Slider

[Demo](https://morganalf.github.io/Slider/)

A flexible JQuery slider that supports many settings: a range of values, data display, scale display and much more.
  
## Clone repository
``` 
git clone https://github.com/MorganaLF/Slider.git
```

## Installation
``` 
npm install
```

## Development
``` 
npm run dev
```

## Building
``` 
npm run build
```  

## Testing
``` 
npm run karma
```  

## Application layers:

  - SliderModel
  - SiderView
    - RunnerView
    - ScaleView
    - TipView
    - TrackView
  - SliderController
  - SliderApp

## SliderModel
  
  - Contains slider data;
  - Does not use any classes inside;
  - To notify subscribers about changes using custom events;
  - Accepts constructor parameters from SliderApp.

## SliderView

 - Draws a slider view;
 - Uses the RunnerView, TipView, ScaleView, and TrackView classes, which are parts of it;
 - Accepts constructor parameters from SliderApp.
  
### RunnerView

- Draws a runner view;
- Does not use any classes inside;
- Notifies subscribers about the position of the runner using custom events;
- Accepts constructor parameters from SliderView;
 
### ScaleView

- Draws a scale view;
- Does not use any classes inside;
- Accepts constructor parameters from SliderView;
 
### TipView

- Draws a tip view;
- Does not use any classes inside;
- Accepts constructor parameters from SliderView;

### TrackView

- Draws a track view;
- Does not use any classes inside;
- Accepts constructor parameters from SliderView;
 
## SliderController

- Handles user actions;
- Handles events generated by the SliderModel and RunnerView;
- Takes as parameters SliderView and SliderModel;
- Uses SliderModel, RunnerView, TipView and TrackView classes;
- Accepts constructor parameters from SliderApp.

## SliderApp

- Creates instances of SliderModel, SliderView and SliderController classes;
- Provides methods for working with the plugin;
- Uses SliderModel, SliderView and SliderController classes.

# Usage

Simple:
```html
<div class='slider'></div>
```

``` js
$('.slider').customSlider();
```

With options:
```html
<div class='slider'></div>
```

``` js
$('.slider').customSlider({
    orientation: 'vertical'
});
```

## Options

| Option | Type | Default | Description |
| ------ | ------ | ------ | ------ |
| startValue | number | 0 | The value from which the slider range starts (interval type) or the current slider value (single type)
| endValue | number | 100 | The value from which the slider range ends (only from interval type)
| minValue | number | 0 | The value from which the slider begins |
| maxValue | number | 100 | The value that ends the slider |
| type | string | 'single' | Sets a single or interval slider type. Supports only two values: 'single' and 'interval' |
| orientation | string | 'horizontal' | Vertical or horizontal orientation of the slider. Supports only two values: 'vertical' and 'horizontal' |
| stepSize | number | 0 | The step size, which is a multiple initial, final and current values of the slider |
| withTip | boolean | true | Show or hide the tip with the current slider value |
| withScale | boolean | true | Show or hide slider scale |
| scaleMarksQuantity | number | 10 | Number of slider scale marks |

## Methods
| Method | Argument  | Description |
| ------ | ------ | ------ |
| getCurrentValue || Gets current value from which the slider range starts (interval type) or the current slider value (single type) |
| getCurrentEndValue || Gets current value from which the slider range ends (only from interval type) |
| getMinValue || Gets the minimum slider value |
| getMaxValue || Gets the maximum slider value |
| getStepSize || Gets slider step size |
| getScaleMarksQuantity || Gets the number of parts of the slider scale |
| setMinValue | val: number | Sets the minimum slider value |
| setMaxValue | val: number | Sets the maximum slider value |
| setCurrentValue | val: number | Sets current value from which the slider range starts (interval type) or the current slider value (single type) |
| setCurrentEndValue | val: number | Sets current value from which the slider range ends (only from interval type) |
| setStepSize | val: number | Sets slider step size |
| setScaleMarksQuantity | val: number | Sets the number of parts of the slider scale |
| showTip | | Shows slider tip with current value |
| hideTip | | Hides slider tip with current value |
| showScale | | Shows slider scale |
| hideScale | | Hides slider scale |
| setVerticalOrientation || Sets the vertical position of the slider |
| setHorizontalOrientation || Sets the horizontal position of the slider |

## Events
| Event | Params | Description |
| ------ | ------ | ------ |
| move | event, ratio | When clicking on the runner and then moving the mouse  |
| setstartvalue | event, model, value, coefficient | When setting current value or current start value of the slider |
| setendvalue | event, model, value, coefficient | When setting current end value of the slider |
| changestartvalue | event, model, value, coefficient | When changing current value or current start value of the slider |
| changeendvalue | event, model, value, coefficient | When changing current end value of the slider |

## UML 

![uml](http://viktoriya-chernenko.tk/img/diagram.jpg)

License
----
Copyright (c) 2019 Viktoriya Chernenko
  
