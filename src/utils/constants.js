//переменные

//формы
export const profileForm = document.querySelector('.popup__form_edit-profile');
export const newPlaceForm = document.querySelector('.popup__form_new-place');
export const editAvatarForm = document.querySelector('.popup__form_avatar');
//инпуты имени и описания человека в попапе
export const nameInput = document.querySelector('.popup__input_edit_name');
export const jobInput = document.querySelector('.popup__input_edit_description');
//кнопки открытия попапов
export const newPlacePopupButton = document.querySelector('.profile__add-button');
export const profileOpenPopupButton = document.querySelector('.profile__edit-button');
export const avatarPopupButton = document.querySelector('.profile__avatar-container');

//массив исходных карточек
export const initialCards = [{
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

//данные для валидации
export const enableValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible',
};
