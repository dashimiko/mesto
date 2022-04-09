import {FormValidator} from '../components/FormValidator.js'

import {Card} from '../components/Card.js'

import {Section} from '../components/Section.js'

import {PopupWithImage} from '../components/PopupWithImage.js'

import {PopupWithForm} from '../components/PopupWithForm.js'

import {UserInfo} from '../components/UserInfo.js'

import {api} from '../components/Api.js'

import {PopupWithConfirmation} from '../components/PopupWithConfirmation.js'

import {elements,profileForm,editAvatarForm,newPlaceForm,nameInput,jobInput,newPlacePopupButton,profileOpenPopupButton,avatarPopupButton,enableValidation} from '../utils/constants.js'

import './index.css'

let userId;

api.getInfo()
  .then(([elements, res]) => {
    userId = res._id
    dataUserInfo.setUserInfo(res.name, res.about,)
    dataUserInfo.setAvatarInfo(res.avatar)

    elements.forEach((data) => {
      const card = createCard({
        place: data.name,
        link: data.link,
        likes: data.likes,
        id: data._id,
        userId: userId,
        ownerId: data.owner._id
      })
      cardsList.addItemAppend(card)
    })
  })
  .catch((err) => {
    console.log(err);
  })

//данные для редактирования профиля
const dataUserInfo = new UserInfo ({
  nameSelector: '.profile__name',
  jobSelector: '.profile__description',
  avatarSelector: '.profile__avatar'
})

const editProfileValidator = new FormValidator(enableValidation, profileForm)
const editAvatarValidator = new FormValidator(enableValidation, editAvatarForm)
const addPlaceValidator = new FormValidator(enableValidation, newPlaceForm)
const popupImage = new PopupWithImage('.popup_open-picture')
const deletePopup = new PopupWithConfirmation('.popup_delete')

//отрисовываем элементы
const cardsList = new Section({
  elements: elements,
  renderer: createCard
},'.elements')

function createCard(item) {
  const card = new Card(item, '#place-template', handleCardClick,
  (id) => {
    deletePopup.open()
    deletePopup.changeSubmitHandler(() => {
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
    })} else {
      api.addLike(id)
    .then(res => {
      card.setLikes(res.likes)
    })
    }
  })
  return card.getCardElement()
}

//сабмитим форму редктирования профиля
const editProfilePopup = new PopupWithForm('.popup_edit-profile', (data) => {
  editProfilePopup.renderLoading(true)
  const {name, about} = data
  api.editProfile(name, about)
  .then(res => {
    dataUserInfo.setUserInfo(name, about);
    editProfilePopup.close()
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => editProfilePopup.renderLoading(false))
})

const addCardPopup = new PopupWithForm('.popup_new-place', (data) => {
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
    cardsList.addItemPrepend(card)
    addCardPopup.close();
  })
  .catch((err) => {
    console.log(err);
  })
});

const editAvatarPopup = new PopupWithForm('.popup_change-avatar', (data) => {
  const {avatar} = data
  editAvatarPopup.renderLoading(true);
  api.editAvatar(avatar)
  .then(res => {
    dataUserInfo.setAvatarInfo(avatar);
    editAvatarPopup.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => editAvatarPopup.renderLoading(false))
})

//функция, которая передает данные для того чтобы открывать попап с увеличенной картинкой (третий аргемент в конструкторе карточки)
function handleCardClick(data) {
  popupImage.open(data);
}

//слушатели
//открываем форму добавления карточки
newPlacePopupButton.addEventListener('click', () => {
  addPlaceValidator.resetValidation();

  addCardPopup.open();
});
//открываем форму редактирования аватара
avatarPopupButton.addEventListener('click', () => {
  editAvatarValidator.resetValidation();

  editAvatarPopup.open();
})

//открываем форму редактирования профиля
profileOpenPopupButton.addEventListener('click', () => {
  editProfileValidator.resetValidation();

  const userData = dataUserInfo.getUserInfo();

  nameInput.value = userData.name;
  jobInput.value = userData.about;

  editProfilePopup.open();
});

//валидируем
editProfileValidator.enableValidation();
addPlaceValidator.enableValidation();
editAvatarValidator.enableValidation();

//слушатели для закрытия попапов
popupImage.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
editAvatarPopup.setEventListeners();
deletePopup.setEventListeners();
