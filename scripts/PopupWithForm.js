import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popup,submitForm) {
    super(popup)

    this._submitForm = submitForm;//колбэк сабмита формы

    this._form = this._popup.querySelector('.popup__form')
    this._inputList = this._form.querySelectorAll('.popup__input')
  }

  _getInputValues() {
    // создаём пустой объект
    this._formValues = {};

    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
    this._formValues[input.name] = input.value;
  });
    // возвращаем объект значений
    return this._formValues;
  }

  setEventListeners() {

    this._form.addEventListener('submit', event => {
      event.preventDefault()
      this._submitForm(this._getInputValues())
    })

    super.setEventListeners()
  }

  close() {
    this._form.reset()
    super.close();
  }
}
