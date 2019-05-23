import ScaleView from '../../plugin/views/ScaleView/ScaleView';

describe('ScaleView', () => {
  let scaleView: ScaleView;
  let $parent: JQuery;
  let $scaleItem: JQuery;

  beforeEach(() => {
    setFixtures('<div class="slider"></div>');

    $parent = $('.slider');

    scaleView = new ScaleView({
      $parent,
      orientation: 'horizontal',
    });
  });

  it('Создается экземпляр класса ScaleView', () => {
    expect(scaleView).toBeDefined();
  });

  describe('Функция drawScale', () => {
    beforeEach(() => {
      scaleView.drawScale({ stepSize: 5, minValue: 5, maxValue: 25 });
      $scaleItem = $('.slider .slider__scale .slider__scale-mark');
    });

    it('Не создает вложенные элементы, если корневой элемент неопределен', () => {
      (<any>scaleView).$element = null;

      expect((<any>scaleView)._drawMark({
        markText: 1,
        markIndent: 10,
      })).toEqual(false);
    });

    it('Создает элемент slider__scale внутри указанного родителя', () => {
      const $scale = $('.slider .slider__scale');

      expect($scale).toExist();
    });

    it('Поддерживает вертикальный вид', () => {
      (<any>scaleView).orientation = 'vertical';
      scaleView.drawScale({ stepSize: 5, minValue: 5, maxValue: 25 });
      const $verticalScale = $('.slider .slider__scale_vertical');

      expect($verticalScale).toExist();
    });

    it('Создает элементы slider__scale-item', () => {
      expect($scaleItem).toExist();
    });

    it('Количество элементов slider__scale-item можно установить', () => {
      expect($scaleItem.length).toEqual(5);
    });

    it('Элемент slider__scale-item содержит корректное значение', () => {
      expect($scaleItem.eq(0).text()).toEqual('5');
      expect($scaleItem.eq(1).text()).toEqual('10');
      expect($scaleItem.eq(2).text()).toEqual('15');
    });
  });
});
