import {FormValidator} from './FormValidator.js'

import {Card} from './Card.js'

import Section from './Section.js'

import Popup from './Popup.js'

import PopupWithImage from './PopupWithImage.js'

import PopupWithForm from './PopupWithImage.js'

import UserInfo from './UserInfo.js'

import {fullPictureImage,fullPictureTitle,fullPicturePopup,openPopup,closePopup} from "./utils.js";


//массив карточек
const initialCards = [{
  name: 'Архыз',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
},

{
  name: 'Челябинская область',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
},

{
  name: 'Иваново',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
},

{
  name: 'Камчатка',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
},

{
  name: 'Холмогорский район',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
},

{
  name: 'Байкал',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}];

//переменные

//обертка для карточек
const elements = document.querySelector('.elements');

//попапы
const newPlacePopup = document.querySelector('.popup_new-place');
const profilePopup = document.querySelector('.popup_edit-profile');

//кнопки
const newPlacePopupButton = document.querySelector('.profile__add-button');
const profileOpenPopupButton = document.querySelector('.profile__edit-button');
const newPlaceSubmit = document.querySelector('.popup__submit-button_place');

//формы
const profileForm = document.querySelector('.popup__form_edit-profile');
const newPlaceForm = document.querySelector('.popup__form_new-place');

//инпуты
const nameInput = document.querySelector('.popup__input_edit_name');
const jobInput = document.querySelector('.popup__input_edit_description');
const placeNameInput = document.querySelector(".popup__input_place_name");
const placelinkInput = document.querySelector(".popup__input_place_link");

//имя и описание профиля из разметки
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');

//переменная для функции, объединяющей обработчики оверлея и крестиков
const popups = document.querySelectorAll('.popup');

const enableValidation = {

  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible',
};

//рендерим карточки
const cardsList = new Section({
  items: initialCards,
  renderer: items => {
    const cardElement = new Card(items, '#place-template', handleCardClick).getCardElement();
    return cardElement;
  }
}, ".elements")


//вызываем ренедер карточек
cardsList.renderItems()

function createCard(item) {

  const cardElement = new Card(item, '#place-template', handleCardClick).getCardElement();
  return cardElement
}

//функция, которая передает данные для открытия попапа с увеличенной картинкой (третий аргемент в классе конструктора карточки)
function handleCardClick(data) {
  const popupImage = new PopupWithImage(fullPicturePopup).open(data)
  return popupImage
}

//подключение валидации
const editProfileValidator = new FormValidator(enableValidation, profileForm);
const addPlaceValidator = new FormValidator(enableValidation, newPlaceForm);

editProfileValidator.enableValidation();
addPlaceValidator.enableValidation();


//слушатель открытия попапа редактирования профиля
profileOpenPopupButton.addEventListener('click', function() {

  editProfileValidator.resetErrors();

  editProfileValidator.toggleButtonState();

  const openingPrifilePopup = new Popup(profilePopup).open()
  return openingPrifilePopup;
});

//слушатель открытия попапа с формой добавления нового места
newPlacePopupButton.addEventListener('click', function() {

  addPlaceValidator.resetErrors();

  addPlaceValidator.toggleButtonState();

  const openingNewPlacePopup = new Popup(newPlacePopup).open()
  return openingNewPlacePopup
});

//функции
/*
//функция, которая передает данные для того чтобы открывать попап с увеличенной картинкой (передаем третьим аргементов в конструкторе карточки)
function handleCardClick(name,link) {
  fullPictureImage.src = link
  fullPictureImage.alt = 'На изображении ' + name
  fullPictureTitle.textContent = name

  openPopup(fullPicturePopup);
};

//функция для сохранения формы
function handleProfileFormSubmit(evt) {

  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(profilePopup);
};


//функция для наполнения формы содержимым при открытии
function openProfilePopup() {

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  openPopup(profilePopup);
};

//функция создания карточки

function createCard(item) {

  const cardElement = new Card(item, '#place-template', handleCardClick).getCardElement();
  return cardElement
}

//функция, рендерящая карточки
function renderCards(data,elements) {

  const cardElement = createCard(data);
  elements.prepend(cardElement);
};

//функция, перебирающая карточки в массиве
function render() {

  initialCards.forEach((data) => renderCards(data,elements));
};

render();


//функция, переназначающая параметры для карточек, которые создает пользователь
function addCard(event) {

  event.preventDefault();

  renderCards({
    name: placeNameInput.value,
    link: placelinkInput.value
  }, elements)

  newPlaceForm.reset();

  closePopup(newPlacePopup);
};


//функция, объединяющая обработчики оверлея и крестиков
popups.forEach((popup) => {

  popup.addEventListener('mousedown', (evt) => {

    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
});


//подключение валидации
const editProfileValidator = new FormValidator(enableValidation, profileForm);
const addPlaceValidator = new FormValidator(enableValidation, newPlaceForm);

editProfileValidator.enableValidation();
addPlaceValidator.enableValidation();


//слушатели

//слушатель открытия попапа редактирования профиля
profileOpenPopupButton.addEventListener('click', function() {

  editProfileValidator.resetErrors();

  editProfileValidator.toggleButtonState();

  openProfilePopup();
});

//слушатель сохранения формы попапа редактирования профиля
profileForm.addEventListener('submit', handleProfileFormSubmit);

//слушатель сохранения формы попапа добавления места
newPlaceForm.addEventListener('submit', addCard);

//слушатель открытия попапа с формой добавления нового места
newPlacePopupButton.addEventListener('click', function() {

  addPlaceValidator.resetErrors();

  addPlaceValidator.toggleButtonState();

  openPopup(newPlacePopup);
});
*/

