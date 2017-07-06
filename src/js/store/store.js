export default class Store {
  constructor(offersList) {
    !sessionStorage.getItem('appStore') && this.update(offersList);
  }

  read() {
    return JSON.parse(sessionStorage.getItem('appStore'));
  }

  update(store) {
    sessionStorage.setItem('appStore', JSON.stringify(store));
  }
}
