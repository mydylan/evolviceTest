import Store from './store/store.js'
import Offer from './Offer';
import Popup from './Popup';

const COMPONENT = "app-component";

export default class App {
  constructor(store) {
    this.store = store;
    document.querySelector("#root").insertAdjacentHTML('afterbegin', this.__appRenderer());
    document.querySelector(".create").addEventListener("click", this.__onCreate);
  }

  __appRenderer() {
    const { id } = this.store.read();
    return (
      `<div class="${COMPONENT}">
        <div class="wrapper">
          <div class="offers-info">
            <h3>Offers List ID: ${id}</h3>
            <div class="create">New Offer</div>
          </div>
          <div class="offers-wrapper">
            <div class="offers-preview">
            </div>
          </div>
        </div>
        <div class="popup"></div>
      </div>`
    );
  }

  __getOffer = (id) => this.store.read().offers.find(offer => offer.id === id);

  __getID = () => `abc-${Math.random().toString().substr(2)}`;

  __offersRenderer = () => {
    const { offers } = this.store.read();
    this.container = document.querySelector(".offers-preview");
    offers.forEach(preview => {
      new Offer(this.__getOffer(preview.id), this.__onEdit, this.__onDelete)
        .render(this.container, preview)
        .setEvents(preview.id);
    });
  }

  __popupRenderer() {
    const popupContainer = document.querySelector(".popup");
    this.popup = new Popup(popupContainer).render().setEvents(this.__onSave.bind(this));
  }

  __onSave(data, id) {
    const offersList = this.__getSavedData(this.store.read(), data, id);
    this.store.update(offersList);
    this.popup.hide();
    this.update();
  }

  __getSavedData = (offersList, data, id) => {
    return id
      ? { ...offersList, offers: offersList.offers.map(this.__editOffer(data, id)) }
      : { ...offersList, offers: [...offersList.offers, this.__createOffer(data)] };
  }

  __editOffer = (data, id) => (offer) => offer.id === id ? { ...offer, properties: data } : offer;

  __createOffer = (data) => {
    return {"id": `${this.__getID()}`, "createdAt": new Date().toISOString(), properties: { ...data }};
  }

  __onCreate = () => {
    this.popup.setContent().show();
  }

  __onEdit = (id) => {
    const offer = this.__getOffer(id);
    this.popup.setContent(offer, id).show();
  }

  __onDelete = (id) => {
    const offersList = this.store.read();
    const newStore = {
      ...offersList,
      offers: [...offersList.offers.filter(offer => offer.id !== id)]
    };
    this.store.update(newStore);
    this.update();
  }

  update() {
    this.container.innerHTML = "";
    this.__offersRenderer();
  }

  render() {
    this.__offersRenderer();
    this.__popupRenderer();
  }
}
