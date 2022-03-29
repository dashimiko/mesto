import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popup, submitForm) {
    super(popup)
    this._submitForm = submitForm;
    this._form = this._popup.querySelector('.popup__form')

    this._inputList = [...this._form.querySelectorAll('.popup__input')]
  }

  //метод, собирающий данные всех полей формы
  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(input => {
      formValues[input.name] = input.value
    })
    return formValues
  }

  setEventListeners = () => {
    this._submitForm(this._getInputValues())

    super._setEventListeners;
  }

  open() {
    super.open();

    this._form.addEventListener('submit', this.setEventListeners)
  }

  close() {
    super.close();

    this._form.removeEventListener('submit', this.setEventListeners)
    this._form.reset();
  }
}
