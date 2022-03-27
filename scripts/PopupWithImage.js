import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {

  open({name,link}) {

    const fullPictureImage = this._popup.querySelector('.popup__picture')
    const fullPictureTitle = this._popup.querySelector('.popup__description')

    fullPictureImage.src = link
    fullPictureImage.alt = 'На изображении ' + name
    fullPictureTitle.textContent = name

    super.open();
  }
}
