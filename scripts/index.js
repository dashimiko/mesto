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

//переменные
//достаем все что нужно для открытия/закрытия/редактирования попапа с формой изменения профиля
const profileOpenPopupButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_edit-profile');
const profileCloseButton = document.querySelector('.popup__close_edit-profile');
const profileForm = document.querySelector('.popup__form_edit-profile');
const nameInput = document.querySelector('.popup__input_edit_name');
const jobInput = document.querySelector('.popup__input_edit_description');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
//достаем все что нужно для открытия/закрытия попапа с формой добавления карточки
const newPlacePopupButton = document.querySelector('.profile__add-button');
const newPlacePopup = document.querySelector('.popup_new-place');
const newPlaceCloseButton = document.querySelector('.popup__close_new-place');
//достаем все что нужно для отображения и появления новых карточек
const newPlaceSubmit = document.querySelector('.popup__submit-button_place');
const newPlaceForm = document.querySelector('.popup__form_new-place');
const placeNameInput = document.querySelector(".popup__input_place_name");
const placelinkInput = document.querySelector(".popup__input_place_link");
const elements = document.querySelector('.elements');
const cardTemplate = document.querySelector("#place-template").content;
//переменные для попапа с увеличивающейся картинкой
const fullPicturePopup = document.querySelector('.popup_open-picture');
const fullPictureCloseButton = document.querySelector('.popup__close_open-picture');
const cardPictureButton = document.querySelector('.card__picture');
const fullPictureImage = document.querySelector('.popup__picture');
const fullPictureTitle = document.querySelector('.popup__description')

//функции

//универсальная функция для открытия всех попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//универсальная функция для закрытия всех попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//функция для сохранения формы
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profilePopup);
}

//функция для наполнения формы содержимым при открытии
function openProfilePopup (){
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(profilePopup);
};

//функция, рендерящая карточки
function renderCards(card) {
  const cardElement = createCard(card);
  elements.append(cardElement);
}

//функция, перебирающая карточки в массиве
function render() {
  initialCards.forEach((card) => renderCards(card));
}

render();

//функция, создающая карточки
function createCard(card) {
  const newItem = cardTemplate.querySelector(".card").cloneNode(true);//клонируем
  const newItemdescription = newItem.querySelector(".card__description");
  const newItemPicture = newItem.querySelector(".card__picture");
  newItemdescription.textContent = card.name;
  newItemPicture.src = card.link;
  newItemPicture.alt = card.name;

  addListeners(newItem);
  return newItem;
}

//функция, переназначающая параметры для карточек, которые создает пользователь
function addCard(event) {
  event.preventDefault();
  const object = {
    name: placeNameInput.value,
    link: placelinkInput.value
  }
  elements.prepend(createCard(object));//другая позиция в доме
  placeNameInput.value = ''
  placelinkInput.value = ''
  closePopup(newPlacePopup);
}

//функция лайков
function likeCard (evt) {
  evt.target.classList.toggle('card__like_active');
}

//функция удаления карточек
function handleDelete (event) {
  event.target.closest('.card').remove();
}

//функция со слушателями событий лайка, увеличения картинки и иконки удаления
function addListeners(el) {
  el.querySelector('.card__delete-button').addEventListener('click', handleDelete);
  el.querySelector('.card__picture').addEventListener('click', openImage);
  el.querySelector('.card__like').addEventListener('click', likeCard);
}

//функция увеличения картинки
function openImage(event) {
  fullPictureImage.src = event.target.src
  fullPictureImage.alt = event.target.alt
  fullPictureTitle.textContent = event.target.alt
  openPopup(fullPicturePopup);
}

//слушатели

profileOpenPopupButton.addEventListener('click', openProfilePopup);//слушатель открытия попапа редактирования профиля

profileForm.addEventListener('submit', handleProfileFormSubmit);//слушатель сохранения формы попапа редактирования профиля

profileCloseButton.addEventListener('click', function() {
  closePopup(profilePopup)
}); //слушатель закрытия попапа редактирования профиля

newPlacePopupButton.addEventListener("click", function() {
  openPopup(newPlacePopup)
});//слушатель открытия попапа с формой добавления нового места

newPlaceCloseButton.addEventListener("click", function() {
  closePopup(newPlacePopup)
});//слушатель закрытия попапа с формой добавления нового места

newPlaceForm.addEventListener("submit", addCard);
document.querySelector('.popup__close_open-picture').addEventListener('click', function() {
  openPopup(fullPicturePopup)
});//слушатель открытия попапа с увеличенной картинкой

fullPictureCloseButton.addEventListener('click', function() {
  closePopup(fullPicturePopup);
});//слушатель закрытия попапа с увеличенной картинкой



///новый код по тренажеру

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_visible');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_error');
  errorElement.classList.remove('popup__error_visible');
  errorElement.textContent = '';
};


// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement);
  }
};

// Функция принимает массив полей

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
};

const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__submit-button');
  toggleButtonState(inputList, buttonElement);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};


const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};

// Вызовем функцию
enableValidation();

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

function toggleButtonState (inputList,buttonElement) {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__submit-button_inactive')
  } else {
    buttonElement.classList.remove('popup__submit-button_inactive')
  }

}

