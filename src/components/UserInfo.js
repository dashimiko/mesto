export class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._profileName = document.querySelector(nameSelector);
    this._profileJob = document.querySelector(jobSelector);
  }

  // возвращает объект с данными профиля, чтобы вставить данные в форму при открытии.
  getUserInfo() {
    const userData = {
      name: this._profileName.textContent,
      description: this._profileJob.textContent,
    }
    return userData
  }

  //принимает новые данные для профиля и добавляет их на страницу
  setUserInfo({name,description}) {
    this._profileName.textContent = name;
    this._profileJob.textContent = description;
  }
}
