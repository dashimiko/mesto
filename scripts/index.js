//открытие и закрытие попапа

const profileOpenPopupButton = document.querySelector('.info__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close');

function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

profileOpenPopupButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);

//редактирование формы

// Находим форму в DOM
let formElement = document.forms.form;
let nameInput = formElement.name;
let jobInput = formElement.description;
let inputName = nameInput.value;
let inputJob = jobInput.value;

function formSubmitHandler (evt) {
  evt.preventDefault();


let inputs = document.querySelectorAll('input');

console.log(inputs[0].value);
console.log(inputs[1].value);

nameInput.textContent = inputName;
jobInput.textContent = inputJob;
closePopup();
}

formElement.addEventListener('submit' , formSubmitHandler);
