import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popup, submitForm) {

    super(popup)

    this._submitForm = submitForm;//колбэк сабмита формы

    this._form = this._popup.querySelector('.popup__form')
  }

  _getInputValues() {

    const inputList = [...this._form.querySelectorAll('.popup_input')]

    // создаём пустой объект
    const formValues = {};

    // добавляем в этот объект значения всех полей
    inputList.forEach((input) => {
    formValues[input.name] = input.value;
  });
    // возвращаем объект значений
    return formValues;
  }

  setEventListeners () {

    super.setEventListeners()

    this._form.addEventListener('submit', () => { this._submitForm(this._getInputValues()) })
  }

  close() {
    super.close();
    this._form.reset()
  }
}

