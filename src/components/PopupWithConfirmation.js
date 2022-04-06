import {Popup} from "./Popup.js";

export class PopupWithConfirmation extends Popup {
    constructor(popup, handleConfirmPopup) {
        super(popup)
        this._handleConfirmPopup = handleConfirmPopup;
        this._deleteButton = this._popup.querySelector('.popup__submit-button')
    }

    changeSubmitHandler(newSubmitHandler) {
      this._handleConfirmPopup = newSubmitHandler
    }

    setEventListeners() {
        super.setEventListeners()
        this._deleteButton.addEventListener('click', event => {
          event.preventDefault()
          this._handleConfirmPopup()
        })
    }
}
