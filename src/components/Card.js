export class Card {
  constructor (data,cardSelector,handleCardClick,handleDeleteClick) {
    this._handleCardClick = handleCardClick;
    this._name = data.place;
    this._link = data.link;
    this._likes = data.likes;


    this._handleDeleteClick = handleDeleteClick;
    this._alt = 'На изображении ' + data.name;
    this._cardTemplate = document
            .querySelector(cardSelector)
            .content
  }

  //метод лайка
  _likeCard = () => {
    this._likeButton.classList.toggle('card__like_active');
  }

  //метод удаления карточки
  //_handleDelete = () => {
    //this._cardElement.closest('.card').remove();
  //}

  //метод, объединяющий слушатели событий
  _addListeners = () => {
    const deleteButton = this._cardElement.querySelector('.card__delete-button');
    this._likeButton.addEventListener('click',this._likeCard);
    deleteButton.addEventListener('click', () => {
      this._handleDeleteClick()
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick({ name: this._name, link: this._link})
    });
  }

  //метод, наполняющий карточки
  _fillCard = () => {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._alt;
    this._cardElement.querySelector('.card__description').textContent = this._name;
  }

  _setLikes() {
    const likeCounElement = this._cardElement.querySelector('.card__like-count');
    likeCounElement.textContent = this._likes.length;
  }


  //метод, создающий карточки
  getCardElement() {
    this._cardElement = this._cardTemplate.querySelector('.card').cloneNode(true);
    this._likeButton = this._cardElement.querySelector('.card__like');
    this._cardImage = this._cardElement.querySelector('.card__picture');

    this._fillCard();
    this._addListeners();
    this._setLikes();

    return this._cardElement;
  };
}
