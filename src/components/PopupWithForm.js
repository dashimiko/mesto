import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popup, submitForm) {
    super(popup)
    this._submitForm = submitForm;
    this._submitButton = this._popup.querySelector('.popup__submit-button');
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

  setEventListeners() {
    super.setEventListeners()
    this._popup.addEventListener('submit', event => {
      event.preventDefault()
      this._submitForm(this._getInputValues())
    })
  }

  renderLoading(isLoading) {
    if(isLoading){
      this._submitButton.textContent = 'Сохранение...'
    } else {
      this._submitButton.textContent = 'Сохранить'
    }
  }

  close() {
    super.close();
    this._form.reset();
  }
}
