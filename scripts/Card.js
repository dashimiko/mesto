export class Card {
  constructor (data,cardSelector,handleCardClick) {
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
    this._alt = 'На изображении ' + data.name;
    this._cardTemplate = document
            .querySelector("#place-template")
            .content
}

//метод лайка
_likeCard = () => {
  
  this._likeButton.classList.toggle('card__like_active');
}

//метод удаления карточки
_handleDelete = () => {

  this._cardElement.closest('.card').remove();
}

//метод, объединяющий слушатели событий
_addListeners = () => {

  const deleteButton = this._cardElement.querySelector('.card__delete-button');
  this._likeButton.addEventListener('click',this._likeCard);
  deleteButton.addEventListener('click',this._handleDelete);

  this._cardImage.addEventListener('click', () => {
    this._handleCardClick(this._name, this._link)
  });
}

//метод, наполняющий карточки
_fillCard = () => {

  this._cardImage.src = this._link;
  this._cardImage.alt = this._alt;
  this._cardElement.querySelector('.card__description').textContent = this._name;
}

//метод, создающий карточки
getCardElement() {
  this._cardElement = this._cardTemplate.querySelector('.card').cloneNode(true);

  this._likeButton = this._cardElement.querySelector('.card__like');
  this._cardImage = this._cardElement.querySelector('.card__picture');

  this._fillCard();

  this._addListeners();

  return this._cardElement;
};
}
