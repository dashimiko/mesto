import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popup) {

    super(popup)

    this._fullPictureImage = this._popup.querySelector('.popup__picture')
    this._fullPictureTitle = this._popup.querySelector('.popup__description')
  }

  open({name,link}) {

    this._fullPictureImage.src = link
    this._fullPictureImage.alt = 'На изображении ' + name
    this._fullPictureTitle.textContent = name

    super.open();
  }
}
