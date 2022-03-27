export default class Section {
  constructor(popup) {
    this._popup = document.querySelector(popup);
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

  setEventListeners = () => {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
        this.close()
      }
    })
  };
}
