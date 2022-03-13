import {fullPictureImage,fullPictureTitle,fullPicturePopup,openPopup} from "./utils.js";

export class Card {
  constructor (data,cardTemplate) {
    this._cardTemplate = cardTemplate;
    this._name = data.name;
    this._link = data.link;
}

//метод лайка
_likeCard = () => {

  this._likeButton.classList.toggle('card__like_active');
}

//метод удаления карточки
_handleDelete = () => {

  this._cardElement.closest('.card').remove();
}

//метод открытия попапа с большой картинкой
_openImage = () => {

  fullPictureImage.src = this._link
  fullPictureImage.alt = `изображение ${this._name}`
  fullPictureTitle.textContent = this._name

  openPopup(fullPicturePopup);
}

//метод, объединяющий слушатели событий
_addListeners = () => {

  const deleteButton = this._cardElement.querySelector('.card__delete-button');
  this._likeButton.addEventListener('click',this._likeCard);
  deleteButton.addEventListener('click',this._handleDelete);
  this._cardImage.addEventListener('click',this._openImage);
}

//метод, наполняющий карточки
_fillCard = () => {

  this._cardImage.src = this._link;
  this._cardElement.querySelector('.card__description').textContent = this._name;
}

//метод, создающий карточки
getCardElement() {

  this._cardTemplate = document.querySelector("#place-template").content;
  this._cardElement = this._cardTemplate.querySelector('.card').cloneNode(true);

  this._likeButton = this._cardElement.querySelector('.card__like');
  this._cardImage = this._cardElement.querySelector('.card__picture');

  this._fillCard();

  this._addListeners();

  return this._cardElement;
};
}
