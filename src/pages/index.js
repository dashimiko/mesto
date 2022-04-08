import {FormValidator} from '../components/FormValidator.js'

import {Card} from '../components/Card.js'

import {Section} from '../components/Section.js'

import {PopupWithImage} from '../components/PopupWithImage.js'

import {PopupWithForm} from '../components/PopupWithForm.js'

import {UserInfo} from '../components/UserInfo.js'

import { api } from '../components/Api.js'

import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js'

import {profileForm,editAvatarForm, newPlaceForm,nameInput,jobInput,newPlacePopupButton,profileOpenPopupButton,avatarPopupButton,enableValidation} from '../utils/constants.js'

import './index.css'

let userId;

api.getProfile()
.then(res => {
  console.log(res)
  dataUserInfo.setUserInfo(res.name,res.about)
  dataUserInfo.setAvatarInfo(res.avatar);
  userId = res._id
})


api.getInitialCards()
.then(elements => {
  elements.forEach(data => {
    const card = createCard({
      place: data.name,
      link: data.link,
      likes: data.likes,
      id: data._id,
      userId: userId,
      ownerId: data.owner._id
    })
    cardsList.addItem(card)
  })
})

//данные для редактирования профиля
const dataUserInfo = new UserInfo ({
  nameSelector: '.profile__name',
  jobSelector: '.profile__description',
  avatarSelector: '.profile__avatar'
})

//валидируем формы
const editProfileValidator = new FormValidator(enableValidation, profileForm)
const editAvatarValidator = new FormValidator(enableValidation, editAvatarForm)
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

  const card = new Card(item, '#place-template', handleCardClick, (id) => {
    deletePopup.open()
    deletePopup.changeSubmitHandler(()=>{
      api.deleteCard(id)
      .then(res => {
        deletePopup.close()
        card.deleteCard()
      })
    })
  },
  (id) => {
    if(card.isLiked()) {
      api.deleteLike(id)
    .then(res => {
      card.setLikes(res.likes)
      //console.log(res)
    })
    } else {
      api.addLike(id)
    .then(res => {
      card.setLikes(res.likes)
      //console.log(res)
    })
    }
  })
  return card.getCardElement()
}

//function handleDeleteClick() {}

//сабмитим форму редктирования профиля
const editProfilePopup = new PopupWithForm('.popup_edit-profile', (data) => {
  editProfilePopup.renderLoading(true)
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
  addCardPopup.renderLoading(true)
  api.addImage(data.place,data.link,data.likes)
  .then(res => {
    const card = createCard({
    place: res.name,
    link: res.link,
    likes: res.likes,
    id: res._id,
    userId: userId,
    ownerId: res.owner._id
    })
    cardsList.addItem(card)
    addCardPopup.close();
  })
});

addCardPopup.setEventListeners()

const editAvatarPopup = new PopupWithForm('.popup_change-avatar', (data) => {
  const {avatar} = data
  editAvatarPopup.renderLoading(true)
  api.editAvatar(avatar)
  .then(res => {
    dataUserInfo.setAvatarInfo(avatar);
    editAvatarPopup.close()
  })
})

editAvatarPopup.setEventListeners()


//функция, которая передает данные для того чтобы открывать попап с увеличенной картинкой (третий аргемент в конструкторе карточки)
function handleCardClick(data) {
  popupImage.open(data)
}

const deletePopup = new PopupWithConfirmation('.popup_delete')

deletePopup.setEventListeners()

//слушатели
//открываем форму добавления карточки
newPlacePopupButton.addEventListener('click', () => {
  addPlaceValidator.resetValidation()

  addCardPopup.open()
});

avatarPopupButton.addEventListener('click', () => {
  editAvatarValidator.resetValidation();

  editAvatarPopup.open()
})

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
editAvatarValidator.enableValidation();

//рендерим карточки
//cardsList.renderItems()
