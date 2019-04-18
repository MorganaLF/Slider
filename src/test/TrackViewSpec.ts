import TrackView from '../plugin/TrackView/TrackView';

describe('TrackView', () => {
  const $body = $('.body');
  let trackView: TrackView;
  let $parent: JQuery;

  beforeEach(() => {
    setFixtures('<div class="slider"></div>');
    $parent = $('.slider');

    trackView = new TrackView({
      $parent,
      orientation: 'horizontal',
      type: 'single',
      _parentWidth: 350,
      _parentHeight: 350,
      _runnerWidth: 50,
      _runnerHeight: 50,
    });
  });

  it('Создается экземпляр класса TrackView', () => {
    expect(trackView).toBeDefined();
  });

  describe('Функция drawTrack', () => {
    beforeEach(() => {
      trackView.drawTrack();
    });

    it('Создает элемент slider__track внутри указанного родителя', () => {
      const $track = $('.slider .slider__track');

      expect($track).toExist();
    });

    it('Создает элемент slider__track-full внутри slider__track', () => {
      const $filledTrack = $('.slider .slider__track .slider__filled-track');

      expect($filledTrack).toExist();
    });

    it('При вертикальном виде добавляет класс slider__track_vertical', () => {
      (<any>trackView).orientation = 'vertical';
      trackView.drawTrack();

      const $verticalTrack = $('.slider .slider__track_vertical');

      expect($verticalTrack).toExist();
    });
  });

  describe('Функция animateTrack', () => {
    beforeEach(() => {
      $body.css('padding', '0');
      $parent.css({ width: '350px', height: '350px' });
    });

    it('Устанавливает ширину дорожки, если тип слайдера single', () => {
      trackView.animateTrack(2, 'start');

      expect(trackView.$filledTrack!.css('width')).toEqual('200px');
    });

    it('Если коэффициент равен нулю, ширина дорожки равна нулю', () => {
      trackView.animateTrack(0, 'start');

      expect(trackView.$filledTrack!.css('width')).toEqual('0px');
    });

    it('Устанавливает высоту дорожки, если слайдер имеет вертикальный вид', () => {
      (<any>trackView).orientation = 'vertical';
      trackView.drawTrack();
      trackView.animateTrack(2, 'start');

      expect(trackView.$filledTrack!.css('height')).toEqual('200px');
    });

    it('Устанавливает ширину и отступ дорожки, если тип слайдера interval', () => {
      (<any>trackView).type = 'interval';
      trackView.drawTrack();

      trackView.$filledTrack!.css('position', 'relative');

      trackView.animateTrack(2, 'start');
      trackView.animateTrack(1, 'end');

      expect(trackView.$filledTrack!.css('left')).toEqual('175px');
      expect(trackView.$filledTrack!.css('width')).toEqual('150px');
    });

    it(
      `Устанавливает высоту и отступ дорожки,
      если тип слайдера interval, вид вертикальный`,
      () => {
        (<any>trackView).type = 'interval';
        (<any>trackView).orientation = 'vertical';

        trackView.drawTrack();

        trackView.$element!.css('height', '100%');
        trackView.$filledTrack!.css('position', 'relative');

        trackView.animateTrack(2, 'start');
        trackView.animateTrack(1, 'end');

        expect(trackView.$filledTrack!.css('top')).toEqual('175px');
        expect(trackView.$filledTrack!.css('height')).toEqual('150px');
      });
  });
});
