export default class UserInfo {
  constructor({ data }) {

    this._profileName = document.querySelector(data.name);
    this._profileJob = document.querySelector(data.job);
  }

  getUserInfo() {
    this._userData = {

      name: this._profileName.textContent,

      job: this._profileJob.textContent,
    }

    return this._userData
  }

  setUserInfo(data) {

    this._profileName.textContent = data.name
    this._profileJob.textContent = data.job
  }
}
