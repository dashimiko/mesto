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

//данные для валидации
export const enableValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible',
};
