import SliderView from '../components/slider/view';
import $ from 'jquery';

describe('Функция должна рисовать слайдер', function () {
  let element = document.createElement('div');
  element.classList.add('slider');
  document.body.appendChild(element);
  let slider = new SliderView({el: element});
  slider.drawSlider();

  it('Функция должна создавать элемент slider__progress внутри элемента slider', function () {
    expect(element.children[0].classList.contains('slider__progress')).toEqual(true)
  });

  it('Функция должна создавать элемент slider__progress-full внутри элемента slider__progress', function () {
    expect(element.getElementsByClassName('slider__progress')[0].children[0].classList.contains('slider__progress-full')).toEqual(true)
  });

  it('Функция должна создавать элемент slider__runner внутри элемента slider', function () {
    expect(element.children[1].classList.contains('slider__runner')).toEqual(true)
  });

  it('Функция должна рисовать слайдер только один раз', function () {
    let element = document.createElement('div');
    element.classList.add('slider');
    document.body.appendChild(element);
    let slider = new SliderView({el: element});
    slider.drawSlider();
    slider.drawSlider();
    slider.drawSlider();
    expect(element.getElementsByClassName('slider__progress').length).toEqual(1)
  });
});

