import TrackView from '../plugin/track/TrackView';

describe('TrackView', function() {
  let trackView: TrackView;

  beforeEach(function() {
    trackView = new TrackView({
      orientation: 'horizontal',
      type: 'single',
      _parentWidth: 350,
      _parentHeight: 350,
      _runnerWidth: 50,
      _runnerHeight: 50,
    });
  });

  it('Создается экземпляр класса TrackView', function() {
    expect(trackView).toBeDefined();
  });

});

describe('TrackView. Функция drawTrack', function() {
  let trackView: TrackView,
    parent: JQuery;

  beforeEach(function() {
    setFixtures('<div class="slider"></div>');
    parent = $('.slider');
    trackView = new TrackView({
      orientation: 'horizontal',
      type: 'single',
      _parentWidth: 350,
      _parentHeight: 350,
      _runnerWidth: 50,
      _runnerHeight: 50,
    });
    trackView.drawTrack();
  });

  it('Создает элемент slider__track внутри указанного родителя', function() {
    expect($('.slider .slider__track')).toExist();
  });

  it('Создает элемент slider__track-full внутри slider__track', function() {
    expect($('.slider .slider__track .slider__track-full')).toExist();
  });

  it('При вертикальном виде добавляет класс slider__track_vertical', function() {
    trackView = new TrackView({
      orientation: 'vertical',
      type: 'single',
      _parentWidth: 350,
      _parentHeight: 350,
      _runnerWidth: 50,
      _runnerHeight: 50,
    });
    trackView.drawTrack();
    expect($('.slider .slider__track_vertical')).toExist();
  });

  it('Вызывает функцию animateTrack', function() {
    const spy = spyOn(trackView, 'animateTrack');
    trackView.drawTrack();
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(2, 'start');
  });

  it('Поддерживает интервальный тип', function() {
    trackView = new TrackView({
      orientation: 'vertical',
      type: 'interval',
      _parentWidth: 350,
      _parentHeight: 350,
      _runnerWidth: 50,
      _runnerHeight: 50,
    });
    const spy = spyOn(trackView, 'animateTrack');
    trackView.drawTrack();
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(1, 'end');
  });

});

describe('TrackView. Функция animateTrack', function() {
  let trackView: TrackView,
    parent: JQuery;

  beforeEach(function() {
    setFixtures('<div class="slider"></div>');
    parent = $('.slider');
    $('.body').css('padding', '0');
    parent.css('width', '350px');
    parent.css('height', '350px');
    trackView = new TrackView({
      orientation: 'horizontal',
      type: 'single',
      _parentWidth: 350,
      _parentHeight: 350,
      _runnerWidth: 50,
      _runnerHeight: 50,
    });
    trackView.drawTrack();
    trackView.$element!.css('position', 'relative');
  });

  it('Возвращает false, если элемент неопределен', function() {
    trackView.$element = null;
    expect(trackView.animateTrack(2, 'start')).toEqual(false);
  });

  it('Устанавливает ширину дорожки, если тип слайдера single', function() {
    trackView.animateTrack(2, 'start');
    expect(trackView.$filledTrack!.css('width')).toEqual('200px');
  });

  it('Устанавливает высоту дорожки, если слайдер имеет вертикальный вид', function() {
    trackView = new TrackView({
      orientation: 'vertical',
      type: 'single',
      _parentWidth: 350,
      _parentHeight: 350,
      _runnerWidth: 50,
      _runnerHeight: 50,
    });
    trackView.drawTrack();
    trackView.animateTrack(2, 'start');
    expect(trackView.$filledTrack!.css('height')).toEqual('200px');
  });

  it('Устанавливает ширину и отступ дорожки, если тип слайдера interval', function() {
    trackView = new TrackView({
      orientation: 'horizontal',
      type: 'interval',
      _parentWidth: 350,
      _parentHeight: 350,
      _runnerWidth: 50,
      _runnerHeight: 50,
    });
    trackView.drawTrack();
    trackView.$element!.find('.slider__track-full').css('position', 'relative');

    trackView.animateTrack(2, 'start');
    trackView.animateTrack(1, 'end');

    expect(trackView.trackFull!.css('left')).toEqual('175px');
    expect(trackView.trackFull!.css('width')).toEqual('150px');
  });

  it('Устанавливает высоту и отступ дорожки, если тип слайдера interval, вид вертикальный', function() {
    trackView = new TrackView({
      orientation: 'vertical',
      type: 'interval',
      _parentWidth: 350,
      _parentHeight: 350,
      _runnerWidth: 50,
      _runnerHeight: 50,
    });
    trackView.drawTrack();
    trackView.$element!.css('height', '100%');
    trackView.$element!.find('.slider__track-full').css('position', 'relative');

    trackView.animateTrack(2, 'start');
    trackView.animateTrack(1, 'end');

    expect(trackView.$filledTrack!.css('top')).toEqual('175px');
    expect(trackView.$filledTrack!.css('height')).toEqual('150px');
  });

});
