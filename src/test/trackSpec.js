import $ from 'jquery';
import TrackView from '../components/slider/track/TrackView';

/* TRACK VIEW */

describe('TrackView', function () {
  let trackView;

  beforeEach(function () {
    trackView = new TrackView();
  });

  it('Создается экземпляр класса TrackView', function () {
    expect(trackView).toBeDefined();
  });

});

describe('TrackView. Функция drawTrack', function () {
  let trackView,
      parent;

  beforeEach(function () {
    setFixtures('<div class="slider"></div>');
    parent = $('.slider');
    trackView = new TrackView();
    trackView.drawTrack(parent, 2, 1);
  });

  it('Создает элемент slider__track внутри указанного родителя', function () {
    expect($('.slider .slider__track')).toExist();
  });

  it('Создает элемент slider__track-full внутри slider__track', function () {
    expect($('.slider .slider__track .slider__track-full')).toExist();
  });

  it('При вертикальном виде добавляет класс slider__track_vertical', function () {
    trackView.orientation = 'vertical';
    trackView.drawTrack(parent);
    expect($('.slider .slider__track_vertical')).toExist();
  });

  it('Вызывает функцию animateTrack', function () {
    let spy = spyOn(trackView, 'animateTrack');
    trackView.drawTrack(parent, 2, 1);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(2, 'start');
  });

  it('Поддерживает интервальный тип', function () {
    trackView.type = 'interval';
    let spy = spyOn(trackView, 'animateTrack');
    trackView.drawTrack(parent, 2, 1);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(1, 'end');
  });

});

describe('TrackView. Функция animateTrack', function () {
  let trackView,
      parent;

  beforeEach(function () {
    setFixtures('<div class="slider"></div>');
    parent = $('.slider');
    $('.body').css('padding', '0');
    parent.css('width', '350px');
    parent.css('height', '350px');
    trackView = new TrackView({
      orientation: 'horizontal',
      type: 'single',
      parentWidth: 350,
      parentHeight: 350,
      runnerWidth: 50,
      runnerHeight: 50,
      parentLeftPoint: 0,
      parentRightPoint: 350,
      parentTopPoint: 0,
      parentBottomPoint: 350,
    });
    trackView.drawTrack(parent, 2, 1);
    trackView.el.css('position', 'relative');
  });

  it('Устанавливает ширину дорожки, если тип слайдера single', function () {
    trackView.animateTrack(2, 'start');
    expect(trackView.trackFull.css('width')).toEqual('200px');
  });

  it('Устанавливает высоту дорожки, если слайдер имеет вертикальный вид', function () {
    trackView.orientation = 'vertical';
    trackView.animateTrack(2, 'start');
    expect(trackView.trackFull.css('height')).toEqual('200px');
  });

  it('Устанавливает ширину и отступ дорожки, если тип слайдера interval', function () {
    trackView = new TrackView({
      orientation: 'horizontal',
      type: 'interval',
      parentWidth: 350,
      parentHeight: 350,
      runnerWidth: 50,
      runnerHeight: 50,
      parentLeftPoint: 0,
      parentRightPoint: 350,
      parentTopPoint: 0,
      parentBottomPoint: 350,
    });
    trackView.drawTrack(parent, 2, 1);
    trackView.el.find('.slider__track-full').css('position', 'relative');

    trackView.animateTrack(2, 'start');
    trackView.animateTrack(1.75, 'end');

    expect(trackView.trackFull.css('left')).toEqual('175px');
    expect(trackView.trackFull.css('width')).toEqual('25px');
  });

  it('Устанавливает высоту и отступ дорожки, если тип слайдера interval, вид вертикальный', function () {
    trackView = new TrackView({
      orientation: 'vertical',
      type: 'interval',
      parentWidth: 350,
      parentHeight: 350,
      runnerWidth: 50,
      runnerHeight: 50,
      parentLeftPoint: 0,
      parentRightPoint: 350,
      parentTopPoint: 0,
      parentBottomPoint: 350,
    });
    trackView.drawTrack(parent, 2, 1);
    trackView.el.css('height', '100%');
    trackView.el.find('.slider__track-full').css('position', 'relative');

    trackView.animateTrack(2, 'start');
    trackView.animateTrack(1.75, 'end');

    expect(trackView.trackFull.css('top')).toEqual('175px');
    expect(trackView.trackFull.css('height')).toEqual('25px');
  });

});
