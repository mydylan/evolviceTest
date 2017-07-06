import { setProp } from "./helpers/units";
const COMPONENT = "popup-component";

export default class Popup {
  constructor(container) {
    this.container = container;
    this.id = false;
  }

  __popupRenderer() {
    return (
      `<div class="${ COMPONENT }">
        <div class="close"></div>
        <div class="wrapper">
          <div class="content">
            <form id="update-form">
              <div class="form-wrapper"></div>
              <div class="save-wrapper">
                <button class="save" type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>`
    );
  }

  __contentRenderer(offer = {}) {
    const {
      name = "",
      category = "",
      description = "",
      productName = "",
      productBrand = "",
      retailerUrl = "",
      reducedPrice = {
        amount: 0,
        currencyCode: ""
      },
      originalPrice = {
        amount: 0,
        currencyCode: ""
      },
      productImagePointer = {
        itemName: ""
      }
    } = offer;
    return (
      `<div>
        <label>Name: </label>
        <input name="name" value="${name}" required/>
      </div>
      <div>
        <label>Category: </label>
        <input name="category" value="${category}"/>
      </div>
      <div>
        <label>Description: </label>
        <textarea name="description" value="${description}">${description}</textarea>
      </div>
      <div>
        <label>Product Name: </label>
        <input name="productName" value="${productName}"/>
      </div>
      <div>
        <label>Product Brand: </label>
        <input name="productBrand" value="${productBrand}"/>
      </div>
      <div>
        <label>Retailer Url: </label>
        <input name="retailerUrl" value="${retailerUrl}" type="url"/>
      </div>
      <div>
        <div class="price-field">
          <label>Reduced Price: </label>
          <input name="reducedPrice.amount" type="number" value="${reducedPrice.amount}"/>
        </div>
        <div class="price-field">
          <label>Currency Code: </label>
          <input name="reducedPrice.currencyCode" value="${reducedPrice.currencyCode}"/>
        </div>
      </div>
      <div>
        <div class="price-field">
          <label>Original Price: </label>
          <input name="originalPrice.amount" type="number" value="${originalPrice.amount}"/>
        </div>
        <div class="price-field">
          <label>Currency Code: </label>
          <input name="originalPrice.currencyCode" value="${originalPrice.currencyCode}"/>
        </div>
      </div>
      <div>
        <label>Image</label>
        <input name="productImagePointer.itemName" value="${productImagePointer.itemName}"/>
      </div>`
    );
  }

  __getData() {
    const elements = document.querySelectorAll("form [value]");
    const data = {};
    elements.forEach(({ name, value }) => setProp(data, name, value));
    return data;
  }

  __save = (e) => {
    e.preventDefault();
    this.onSave(this.__getData(), this.id);
  }

  show() {
    document.querySelector(`.${ COMPONENT }`).classList.add("show");
    return this;
  }

  hide() {
    this.id = false;
    document.querySelector(`.${ COMPONENT }`).classList.remove("show");
    return this;
  }

  setContent(offer = {}, id) {
    this.id = id;
    document.querySelector(`.${ COMPONENT } .form-wrapper`).innerHTML = this.__contentRenderer(offer.properties);
    return this;
  }

  setEvents(onSave) {
    this.onSave = onSave;
    document.querySelector('.close').addEventListener("click", this.hide);
    document.querySelector('#update-form').addEventListener("submit", this.__save);
    document.addEventListener("keyup", (e) => e.keyCode === 27 && this.hide());
    return this;
  }

  render() {
    this.container.insertAdjacentHTML('afterbegin', this.__popupRenderer());
    return this;
  }
}
