import SliderView from '../view';

export default class TipView {
  constructor (options = {}) {
    Object.assign(this, {
      el: null,
      isGenerated: false,
      type: 'single',
      orientation: 'horizontal',
      parent: null
    }, options);
  }

  _createElem (el, elclass, parent) {
    let elem = document.createElement(el);
    elem.className = elclass;
    parent.appendChild(elem);
    return elem;
  }

  drawTip (parent, val) {
    let tipClass =
        this.orientation === 'horizontal' ? '' : ' slider__tip_vertical';
    this.el = this._createElem('div', 'slider__tip' + tipClass, parent);

    this.updateTip(val);
  }

  updateTip (val) {
    this.el.innerHTML = val;
  }

}