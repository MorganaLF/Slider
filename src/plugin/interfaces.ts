declare global {
    interface JQuery {
      customSlider: (...rest: any[]) => any;
    }
}