export const fullPictureImage = document.querySelector('.popup__picture');
export const fullPictureTitle = document.querySelector('.popup__description');
export const fullPicturePopup = document.querySelector('.popup_open-picture');

//универсальная функция для открытия всех попапов
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupWithEsc);//слушатель закрытия попапа с увеличенной картинкой по оверлею
}

//универсальная функция для закрытия всех попапов
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupWithEsc);//слушатель закрытия попапа с увеличенной картинкой по оверлею
}

//функция закрытия попапов по клику на esc
export function closePopupWithEsc (event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
}
