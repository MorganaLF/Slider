import TipView from '../../plugin/views/TipView/TipView';

describe('TipView', () => {
  let tipView: TipView;

  beforeEach(() => {
    setFixtures('<div class="slider"><div class="slider__runner"></div></div>');

    const $parent = $('.slider__runner');

    tipView = new TipView({
      $parent,
      orientation: 'horizontal',
    });
  });

  it('Создается экземпляр класса RunnerView', () => {
    expect(tipView).toBeDefined();
  });

  describe('Функция drawTip', () => {
    beforeEach(() => {
      tipView.drawTip();
    });

    it('Должна создавать элемент slider__tip внутри элемента slider__runner', () => {
      const $tip = $('.slider .slider__runner .slider__tip');

      expect($tip).toExist();
    });

    it('Добавляет класс slider__tip_vertical, если имеет вертикальный вид', () => {
      (<any>tipView).orientation = 'vertical';
      tipView.drawTip();
      const $verticalTip = $('.slider .slider__runner .slider__tip_vertical');

      expect($verticalTip).toExist();
    });

  });

  describe('Функция updateTip', () => {
    it('Должна обновлять значение внутри подсказки', () => {
      tipView.updateTip(15);
      const $tip = $('.slider .slider__runner .slider__tip');

      expect($tip.text()).toEqual('15');
    });
  });
});
