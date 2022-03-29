import {FormValidator} from '../components/FormValidator.js'

import {Card} from '../components/Card.js'

import {Section} from '../components/Section.js'

import {PopupWithImage} from '../components/PopupWithImage.js'

import {PopupWithForm} from '../components/PopupWithForm.js'

import {UserInfo} from '../components/UserInfo.js'

import {profileForm,newPlaceForm,nameInput,jobInput,newPlacePopupButton,profileOpenPopupButton,initialCards,enableValidation} from '../utils/constants.js'

import './index.css'

//данные для редактирования профиля
const dataUserInfo = new UserInfo ({
  nameSelector: '.profile__name',
  jobSelector: '.profile__description'
})

//валидируем формы
const editProfileValidator = new FormValidator(enableValidation, profileForm)
const addPlaceValidator = new FormValidator(enableValidation, newPlaceForm)
//подключаем функционал увеличенной картинки
const popupImage = new PopupWithImage('.popup_open-picture')
popupImage.setEventListeners()

//отрисовываем элементы
const cardsList = new Section({
  elements: initialCards,
  renderer: createCard
},'.elements')

function createCard(item) {
  return new Card(item,'#place-template', handleCardClick).getCardElement()
}

//сабмитим форму редктирования профиля
const editProfilePopup = new PopupWithForm('.popup_edit-profile', (data) => {

  dataUserInfo.setUserInfo(data)

  editProfilePopup.close()
})
editProfilePopup.setEventListeners()

//сабмитим форму добавления карточки
const addCardPopup = new PopupWithForm('.popup_new-place', (data) => {
  const card = createCard({
    place: data.place,
    link: data.link
  })
  cardsList.addItem(card)
  addCardPopup.close();
});

addCardPopup.setEventListeners()

//функция, которая передает данные для того чтобы открывать попап с увеличенной картинкой (третий аргемент в конструкторе карточки)
function handleCardClick(data) {
  popupImage.open(data)
}

//слушатели
//открываем форму добавления карточки
newPlacePopupButton.addEventListener('click', () => {
  addPlaceValidator.resetValidation()

  addCardPopup.open()
});

//открываем форму редактирования профиля
profileOpenPopupButton.addEventListener('click', () => {
  editProfileValidator.resetValidation()

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
