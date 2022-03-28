import {FormValidator} from '../components/FormValidator.js'

import {Card} from '../components/Card.js'

import {Section} from '../components/Section.js'

import {PopupWithImage} from '../components/PopupWithImage.js'

import {PopupWithForm} from '../components/PopupWithForm.js'

import {UserInfo} from '../components/UserInfo.js'

//переменные

//формы
const profileForm = document.querySelector('.popup__form_edit-profile');
const newPlaceForm = document.querySelector('.popup__form_new-place');
//инпуты имени и описания человека в попапе
const nameInput = document.querySelector('.popup__input_edit_name');
const jobInput = document.querySelector('.popup__input_edit_description');
//кнопки открытия попапов
const newPlacePopupButton = document.querySelector('.profile__add-button');
const profileOpenPopupButton = document.querySelector('.profile__edit-button');

//массив исходных карточек
const initialCards = [{
  place: 'Архыз',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
},
{
  place: 'Челябинская область',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
},
{
  place: 'Иваново',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
},
{
  place: 'Камчатка',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
},
{
  place: 'Холмогорский район',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
},
{
  place: 'Байкал',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}];

//данные для редактирования профиля
const dataUserInfo = new UserInfo ({
  nameSelector: '.profile__name',
  jobSelector: '.profile__description'
})

//данные для валидации
const enableValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible',
};

//валидируем формы
const editProfileValidator = new FormValidator(enableValidation, profileForm)
const addPlaceValidator = new FormValidator(enableValidation, newPlaceForm)
//подключаем функционал увеличенной картинки
const popupImage = new PopupWithImage('.popup_open-picture')

//отрисовываем элементы
const cardsList = new Section({
  elements: initialCards,
  renderer: createCard
},'.elements')

//сабмитим форму редктирования профиля
const editProfilePopup = new PopupWithForm('.popup_edit-profile', (data) => {
  console.log('data',data)
  dataUserInfo.setUserInfo(data)
  editProfilePopup.close()
})

//сабмитим форму добавления карточки
const addCardPopup = new PopupWithForm('.popup_new-place', (data) => {
  const card = createCard({
    place: data.place,
    link: data.link
  })
  cardsList.addItem(card)
  addCardPopup.close();
});

//функция создания карточки
function createCard(item) {
  return new Card(item,'#place-template', handleCardClick).getCardElement()
}

//функция, которая передает данные для того чтобы открывать попап с увеличенной картинкой (третий аргемент в конструкторе карточки)
function handleCardClick(data) {
  popupImage.open(data)
}

//слушатели

//открываем форму добавления карточки
newPlacePopupButton.addEventListener('click', () => {
  addPlaceValidator.resetErrors()

  addCardPopup.open()
});

//открываем форму редактирования профиля
profileOpenPopupButton.addEventListener('click', () => {
  editProfileValidator.resetErrors()

  const userData = dataUserInfo.getUserInfo()

  nameInput.value = userData.name;
  jobInput.value = userData.description;

  editProfilePopup.open()
});

//валидируем
editProfileValidator.enableValidation();
addPlaceValidator.enableValidation();

//рендерим карточки
cardsList.renderItems()
