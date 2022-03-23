export default class Section {
  constructor(popup) {
    this._popup = popup;
  }

  open() {
    this._popup.classList.add('popup_opened');

    this._popup.addEventListener('mousedown', this.setEventListeners);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');

    this._popup.removeEventListener('mousedown', this.setEventListeners);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (event) => {

    if (event.key === 'Escape') {
      this.close()
    }
  }

  setEventListeners = (event) => {

    if (event.target.classList.contains('popup_opened')) {

      this.close()
    }

    if (event.target.classList.contains('popup__close')) {

      this.close()
    }
  };
}
