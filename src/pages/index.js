import {FormValidator} from '../components/FormValidator.js'

import {Card} from '../components/Card.js'

import {Section} from '../components/Section.js'

import {PopupWithImage} from '../components/PopupWithImage.js'

import {PopupWithForm} from '../components/PopupWithForm.js'

import {UserInfo} from '../components/UserInfo.js'

import { api } from '../components/Api.js'

import {profileForm,newPlaceForm,nameInput,jobInput,newPlacePopupButton,profileOpenPopupButton,initialCards,enableValidation} from '../utils/constants.js'

import './index.css'

api.getProfile()
.then(res => {
  //console.log('ответ',res)
  dataUserInfo.setUserInfo(res.name,res.about)
})

api.getInitialCards()
.then(elements => {
  elements.forEach(data => {
    const card = createCard({
      place: data.name,
      link: data.link,
      likes: data.likes,
    })
    cardsList.addItem(card)
  })
})

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
  elements: elements,
  renderer: createCard
},'.elements')

const elements = []

function createCard(item) {

  return new Card(item, '#place-template', handleCardClick, handleDeleteClick).getCardElement()
}

function handleDeleteClick() {
  deletePopup.open()
}

//сабмитим форму редктирования профиля
const editProfilePopup = new PopupWithForm('.popup_edit-profile', (data) => {
  const {name, about} = data
  api.editProfile(name, about)
  .then(res => {
    dataUserInfo.setUserInfo(name, about);
    editProfilePopup.close()
  })
})

editProfilePopup.setEventListeners()

//сабмитим форму добавления карточки
const addCardPopup = new PopupWithForm('.popup_new-place', (data) => {
  //const card = createCard({
   // place: data.place,
   // link: data.link
  //})
  api.addImage(data.place,data.link,data.likes)
  .then(res => {
    console.log('res',res)
    const card = createCard({
    place: res.name,
    link: res.link,
    likes: res.likes,
    })
    cardsList.addItem(card)
    addCardPopup.close();
  })
});

addCardPopup.setEventListeners()

//popup_delete

//функция, которая передает данные для того чтобы открывать попап с увеличенной картинкой (третий аргемент в конструкторе карточки)
function handleCardClick(data) {
  popupImage.open(data)
}

const deletePopup = new PopupWithForm('.popup_delete', () => {
  api.deleteCard('624d6c053407a100bb9b4c26')
  .then(res => {
    console.log('res',res)
  })
})

deletePopup.setEventListeners()

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
  jobInput.value = userData.about;

  editProfilePopup.open()
});

//валидируем
editProfileValidator.enableValidation();
addPlaceValidator.enableValidation();

//рендерим карточки
//cardsList.renderItems()
