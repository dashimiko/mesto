import {fullPictureImage,fullPictureTitle,fullPicturePopup,openPopup} from "./utils.js";

export class Card {
  constructor (data,cardTemplate) { //{ name,link } '#place-template'
    this._cardTemplate = cardTemplate;
    this._name = data.name;
    this._link = data.link;
}

_likeCard = () => {
  this._likeButton.classList.toggle('card__like_active');
}

_handleDelete = () => {
  this._cardElement.closest('.card').remove();
}

_openImage = () => {
  fullPictureImage.src = this._link
  fullPictureImage.alt = `изображение ${this._name}`
  fullPictureTitle.textContent = this._name
  openPopup(fullPicturePopup);
}

_addListeners = () => {
  const deleteButton = this._cardElement.querySelector('.card__delete-button');
  this._likeButton.addEventListener('click',this._likeCard);
  deleteButton.addEventListener('click',this._handleDelete);
  this._cardImage.addEventListener('click',this._openImage);
}

_fillCard = () => {
  this._cardImage.src = this._link;
  this._cardElement.querySelector('.card__description').textContent = this._name;
}

getCardElement () {
  this._cardTemplate = document.querySelector("#place-template").content;
  this._cardElement = this._cardTemplate.querySelector('.card').cloneNode(true);//клонируем
  this._likeButton = this._cardElement.querySelector('.card__like');
  this._cardImage = this._cardElement.querySelector('.card__picture');

  this._fillCard();

  this._addListeners();

  return this._cardElement;
};

}
