import drawSlider from '../components/slider/slider';

describe('Функция должна рисовать слайдер', function () {

  it('Функция должна создавать элемент slider', function () {
    expect(drawSlider()).toEqual(2)
  })
});

