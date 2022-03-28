import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {

  //перезаписываем родительский метод
  open({name,link}) {
    const fullPictureImage = this._popup.querySelector('.popup__picture')
    const fullPictureTitle = this._popup.querySelector('.popup__description')

    fullPictureImage.src = link
    fullPictureImage.alt = 'На изображении ' + name
    fullPictureTitle.textContent = name

    super.open();
  }
}
