export class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._profileName = document.querySelector(nameSelector);
    this._profileJob = document.querySelector(jobSelector);
  }

  // возвращает объект с данными профиля, чтобы вставить данные в форму при открытии.
  getUserInfo() {
    const userData = {
      name: this._profileName.textContent,
      about: this._profileJob.textContent,
    }
    return userData
  }

  //принимает новые данные для профиля и добавляет их на страницу
  setUserInfo(name,about) {
    this._profileName.textContent = name;
    this._profileJob.textContent = about;
  }
}
