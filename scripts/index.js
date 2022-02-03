//достаем все что нужно для открытия/закрытия/редактирования попапа с формой изменения профиля
const profileOpenPopupButton = document.querySelector('.profile__edit-button');//берем кнопку редактирования в работу
const popup = document.querySelector('.popup_edit-profile');//берем попап в работу
const popupCloseButton = document.querySelector('.popup__close_edit-profile');//берем кнопку закрытия в работу
let formElement = document.querySelector('.popup__form_edit-profile');//берем форму в работу
let nameInput = document.querySelector('.popup__input_edit_name');//берем поле с именем в форме в работу
let jobInput = document.querySelector('.popup__input_edit_description');//берем поле с описанием в форме в работу
let profileName = document.querySelector('.profile__name');//берем поле имя из верстки профиля в работу
let profileJob = document.querySelector('.profile__description');//берем описание из верстки профиля в работу

//функции для открытия и закрытия попапа
function openPopup() {
  popup.classList.add('popup_opened');//добавляем класс, чтобы открыть попап
  nameInput.value = profileName.textContent;//делаем так, чтобы при открытии отражалось имя из value
  jobInput.value = profileJob.textContent;//делаем так, чтобы при открытии отражалось описание из value
}

function closePopup() {
  popup.classList.remove('popup_opened');//удаляем класс, чтобы закрыть попап
}

//функция для заполнения формы
function formSubmitHandler (evt) {
  evt.preventDefault();//отменяем стандартное событие, чтобы задать свое
  profileName.textContent = nameInput.value;//делаем так, чтобы имя из формы становилось именем профиля
  profileJob.textContent = jobInput.value;//делаем так, чтобы описание из формы становилось описанием профиля
  closePopup();
}

//слушатели событий к открытию попапа, закрытию и отправке формы
formElement.addEventListener('submit', formSubmitHandler);//после сабмита реализовать функцию formSubmitHandler
profileOpenPopupButton.addEventListener('click', openPopup);//после клика реализовать функцию openPopup
popupCloseButton.addEventListener('click', closePopup);//после клика реализовать функцию closePopup

//достаем все что нужно для открытия/закрытия попапа с формой добавления карточки
const cardOpenPopupButton = document.querySelector('.profile__add-button');//берем кнопку добавления нового места в работу
const popupNewPlace = document.querySelector('.popup_new-place');//берем попап в работу
const popupCloseButtonNewPlace = document.querySelector('.popup__close_new-place');//берем кнопку закрытия в работу

//достаем все что нужно для гененирования новых карточек
const elements = document.querySelector('.elements');//берем в работу секцию, где будут размещены карточки
const newPlaceSubmit = document.querySelector('.popup__submit-button_place');//берем кнопку создания новых мест
let formElementNewPlace = document.querySelector('.popup__form_new-place');//берем форму

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

//функции для открытия и закрытия попапа с формой добавления карточек
function openPopupNewPlace() {
  popupNewPlace.classList.add('popup_opened');//добавляем класс, чтобы открыть попап
}

function closePopupNewPlace() {
  popupNewPlace.classList.remove('popup_opened');//удаляем класс, чтобы закрыть попап
}

cardOpenPopupButton.addEventListener('click', openPopupNewPlace);//после клика реализовать функцию openPopupNewPlace
popupCloseButtonNewPlace.addEventListener('click', closePopupNewPlace);//после клика реализовать функцию closePopupNewPlace

const cardTemplate = document.querySelector('#place-template').content;
const cardElement = document.querySelector('.card');

//функция отображающая карточки
function renderCards(card) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__description').textContent = card.name;
  cardElement.querySelector('.card__picture').src = card.link;
  elements.append(cardElement);
};

function render() {
  initialCards.forEach(renderCards);
}

let placeNameInput = document.querySelector('.popup__input_place_name');
let placelinkInput = document.querySelector('.popup__input_place_link');

function addNewCard(event) {
  event.preventDefault();
  initialCards.unshift ({
    name: placeNameInput.value,
    link: placelinkInput.value,
});
closePopupNewPlace();
render();
}

//слушатель события
formElementNewPlace.addEventListener('submit', addNewCard);

render();
