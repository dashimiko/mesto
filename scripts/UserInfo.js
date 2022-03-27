export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {

    this._profileName = document.querySelector(nameSelector);
    this._profileJob = document.querySelector(jobSelector);
  }

  getUserInfo() {
    this._userData = {

      name: this._profileName.textContent,

      job: this._profileJob.textContent,
    }

    return this._userData
  }

  setUserInfo(title,job) {

    this._profileName.textContent = title
    this._profileJob.textContent = job
  }
}


