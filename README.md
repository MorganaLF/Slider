# Custom Slider

[Demo](https://morganalf.github.io/Slider/dist/)

A flexible JQuery slider that supports many settings: a range of values, data display, scale display and much more.

Application layers:
  - SliderModel
  - SiderView
    - SliderRunner
    - SliderScale
    - SliderTip
    - SliderTrack
  - SliderController
  - SliderApp

## SliderModel

  - Does not use any classes inside;
  - To notify subscribers about changes using custom events;
  - Accepts constructor parameters from SliderApp.

## SliderView

 - Uses the RunnerView, TipView, ScaleView, and TrackView classes, which are parts of it;
 - Uses model data;
 - Accepts constructor parameters from SliderApp.
  
### RunnerView

- Does not use any classes inside;
- Notifies subscribers about the position of the runner using custom events;
- Accepts constructor parameters from SliderView;
 
### ScaleView

- Does not use any classes inside;
- Accepts constructor parameters from SliderView;
 
### TipView

- Does not use any classes inside;
- Accepts constructor parameters from SliderView;

### TrackView

- Does not use any classes inside;
- Accepts constructor parameters from SliderView;
 
## SliderController

- Takes as parameters SliderView and SliderModel;
- Uses SliderModel, RunnerView, TipView and TrackView classes;
- Accepts constructor parameters from SliderApp.

## SliderApp

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
| minVal | number | 0 | The value from which the slider begins |
| maxVal | number | 100 | The value that ends the slider |
| type | string | 'single' | Sets a single or interval slider type. Supports only two values: 'single' and 'interval' |
| orientation | string | 'horizontal' | Vertical or horizontal orientation of the slider. Supports only two values: 'vertical' and 'horizontal' |
| step | number | 0 | The step size, which is a multiple initial, final and current values of the slider |
| isTip | boolean | true | Show or hide the tip with the current slider value |
| isScale | boolean | true | Show or hide slider scale |
| trackItemsQuantity | number | 10 | Number of slider scale marks |

## Methods
| Method | Argument  | Description |
| ------ | ------ | ------ |
| getCurrentValue || Gets current value from which the slider range starts (interval type) or the current slider value (single type) |
| getCurrentMaxValue || Gets current value from which the slider range ends (only from interval type) |
| getMinValue || Gets the minimum slider value |
| getMaxValue || Gets the maximum slider value |
| getStepSize || Gets slider step size |
| getScaleItemsQuantity || Gets the number of parts of the slider scale |
| setMinValue | val: number | Sets the minimum slider value |
| setMaxValue | val: number | Sets the maximum slider value |
| setCurrentValue | val: number | Sets current value from which the slider range starts (interval type) or the current slider value (single type) |
| setCurrentMaxValue | val: number | Sets current value from which the slider range ends (only from interval type) |
| setStepSize | val: number | Sets slider step size |
| setScaleItemsQuantity | val: number | Sets the number of parts of the slider scale |
| showTip | | Shows slider tip with current value |
| hideTip | | Hides slider tip with current value |
| showScale | | Shows slider scale |
| hideScale | | Hides slider scale |
| setVeticalOrientation || Sets the vertical position of the slider |
| setHorisontalOrientation || Sets the horizontal position of the slider |

## Events
| Event | Params | Description |
| ------ | ------ | ------ |
| move | event, ratio | When clicking on the runner and then moving the mouse  |
| changestartvalue | event, model, value, coefficient | When changing current value or current start value of the slider |
| changeendvalue | event, model, value, coefficient | When changing current end value of the slider |

## UML 

![uml](https://d.radikal.ru/d14/1902/9a/8ee3ff08b81a.jpg)

License
----
Copyright (c) 2019 Viktoriya Chernenko
  
