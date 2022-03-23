export default class Section {

  constructor({ items, renderer }, selector) {
    this._data = items;
    this._renderer = renderer;

    this._container = document.querySelector(selector);
  }

  renderItems() {

    this._data.forEach(element => {
      this.addItem(this._renderer(element));
    })
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
