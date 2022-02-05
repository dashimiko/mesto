//массив новых карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//достаем все что нужно для открытия/закрытия/редактирования попапа с формой изменения профиля
const profileOpenPopupButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup_edit-profile');
const popupCloseButton = document.querySelector('.popup__close_edit-profile');
let formElement = document.querySelector('.popup__form_edit-profile');
let nameInput = document.querySelector('.popup__input_edit_name');
let jobInput = document.querySelector('.popup__input_edit_description');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');
//достаем все что нужно для открытия/закрытия попапа с формой добавления карточки
const cardOpenPopupButton = document.querySelector('.profile__add-button');
const popupNewPlace = document.querySelector('.popup_new-place');
const popupCloseButtonNewPlace = document.querySelector('.popup__close_new-place');
//достаем все что нужно для отображения и появления новых карточек
const elements = document.querySelector('.elements');
const newPlaceSubmit = document.querySelector('.popup__submit-button_place');
let formElementNewPlace = document.querySelector('.popup__form_new-place');
const cardTemplate = document.querySelector("#place-template").content;
const cardElement = document.querySelector(".card");
let placeNameInput = document.querySelector(".popup__input_place_name");
let placelinkInput = document.querySelector(".popup__input_place_link");

//функции для открытия и закрытия попапа с редактированием формы
function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

//функция для заполнения формы
function formSubmitHandler (evt) {
  evt.preventDefault();//отменяем стандартное событие, чтобы задать свое
  profileName.textContent = nameInput.value;//делаем так, чтобы имя из формы становилось именем профиля
  profileJob.textContent = jobInput.value;//делаем так, чтобы описание из формы становилось описанием профиля
  closePopup();
}

//функции для открытия и закрытия попапа с формой добавления карточек
function openPopupNewPlace() {
  popupNewPlace.classList.add("popup_opened"); //добавляем класс, чтобы открыть попап
}

function closePopupNewPlace() {
  popupNewPlace.classList.remove("popup_opened"); //удаляем класс, чтобы закрыть попап
}

//функция отображающая карточки
function renderCards(card) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);//клонируем
  cardElement.querySelector(".card__description").textContent = card.name;//присваиваем значения
  cardElement.querySelector(".card__picture").src = card.link;
  cardElement.querySelector(".card__picture").alt = card.name;

  addListeners(cardElement);//слушатели событий с удалением и открытием попапа с фотографией
  elements.append(cardElement);//определяем место
}

//функция рендерящая карточки
function render() {
  initialCards.forEach((card) => renderCards(card));
}

render();

//Функция создающая карточки
function addNewCard(event) {
  event.preventDefault();

  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__description").textContent = placeNameInput.value;
  cardElement.querySelector(".card__picture").src = placelinkInput.value;
  cardElement.querySelector(".card__picture").alt = placeNameInput.value;
  placelinkInput.value = "";
  placeNameInput.value = "";

  addListeners(cardElement);

  elements.prepend(cardElement);
  closePopupNewPlace();
  prepareEventsForCards();
}

//функции для лайков

function likeCard (evt) {
  evt.target.classList.toggle('card__like_active');
}
function addLikeListener(element) {
  element.addEventListener('click', likeCard);
}
function prepareEventsForCards(){
  let likesBtn = document.querySelectorAll('.card__like');
  likesBtn.forEach(addLikeListener)
}
prepareEventsForCards();

//функция удаления карточек
function handleDelete (event) {
  event.target.closest('.card').remove();
}

//функция со слушателями собйтий
function addListeners(el) {
  el.querySelector('.card__delete-button').addEventListener('click', handleDelete);
  el.querySelector('.card__picture').addEventListener('click', openImage)
}

//открытие и закрытие попапа с картинкой
const popupOpenPicture = document.querySelector('.popup_open-picture');
const popupCloseButtonOpenPicture = document.querySelector('.popup__close-button_open-picture');
const popupBigImage = document.querySelector('.card__picture');
const popupImageFull = document.querySelector('.popup__picture')
const popupImageTitleFull = document.querySelector('.popup__description')

//функции для открытия и закрытия попапа с увеличенной картинкой
function openPopupPicture() {
  popupOpenPicture.classList.add('popup_opened');
}

function closePopupPicture() {
  popupOpenPicture.classList.remove('popup_opened');
}

//функция для открытия попапа с увеличенной картинкой
function openImage(event) {
  popupImageFull.src = event.target.src
  popupImageFull.alt = event.target.alt
  popupImageTitleFull.textContent = event.target.alt
  openPopupPicture();
}

//слушатели события для открытия попапа с увеличенной картинкой
popupBigImage.addEventListener('click', openPopupPicture);
popupCloseButtonOpenPicture.addEventListener('click', closePopupPicture);
//слушатели событий к открытию попапа, закрытию и отправке формы
formElement.addEventListener('submit', formSubmitHandler);
profileOpenPopupButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
//слушатели событий для открытия попапа с формой добавления нового места
cardOpenPopupButton.addEventListener("click", openPopupNewPlace);
popupCloseButtonNewPlace.addEventListener("click", closePopupNewPlace);
//слушатель события для добавления новой карточки
formElementNewPlace.addEventListener("submit", addNewCard);
