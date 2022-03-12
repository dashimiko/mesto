export class FormValidator {
  constructor(settings, form) {
    this._form = form;
    this._settings = settings;
    this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    this._buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
  }

  _showInputError (inputElement, errorMessage) {
    const {inputErrorClass,errorClass} = this._settings;

    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  };

  // Функция, которая удаляет класс с ошибкой
  _hideInputError (inputElement) {
    const {inputErrorClass,errorClass} = this._settings;

    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  };

  // Функция, которая проверяет валидность поля
  _isValid (inputElement){
  if (!inputElement.validity.valid) {
    this._showInputError(inputElement, inputElement.validationMessage);
  } else {
    this._hideInputError(inputElement);
  }
  };

  // Функция принимает массив полей и проходит по нему, оценивая валидность
  _hasInvalidInput () {
  return this._inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
  };

  // Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
  toggleButtonState () {
    if(this._hasInvalidInput()) {
      this._buttonElement.setAttribute('disabled', '');
      this._buttonElement.classList.add(this._settings.inactiveButtonClass);
  } else {
    this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  }
};

  _setEventListeners () {
    // ищем все поля внутри формы, делаем из них массив

    this.toggleButtonState(this._settings.inactiveButtonClass);//проверяем валидность при открытии формы
    // Обойдём все элементы коллекции
    this._inputList.forEach((inputElement) => {
      // каждому полю добавлен обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка зовем isValid, передавая ей форму и проверяемый элемент
        this._isValid(inputElement);
        this.toggleButtonState();
      });
    });
  };

  enableValidation () {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      });
      this._setEventListeners();
    };

  resetErrors() {
    this._form.reset()
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    })
  }

  }
