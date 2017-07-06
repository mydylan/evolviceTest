const COMPONENT = "offer-component";

export default class Product {
  constructor(offer, onEdit, onDelete) {
    this.offer = offer;
    this.onEdit = onEdit;
    this.onDelete = onDelete;
  }

  __offerPreviewRenderer(preview) {
    const {
      productImagePointer,
      name,
      originalPrice,
      reducedPrice,
      category = "",
      description = "",
      productName = "",
      retailerUrl = "",
      productBrand = ""
    } = preview.properties;

    return (
      `<div id="${preview.id}" class="${COMPONENT}">
        <div class="wrapper">
          <div class="image">
            <img src="${productImagePointer.itemName}" alt="${productImagePointer.itemName}"/>
          </div>
          <div class="product-wrapper">
            <div class="title-wrapper">
              <div class="title">${name}</div>
              <div class="details">show details</div>
            </div>
            <div class="details-wrapper">
              <div class="row">
                <div>Category: </div><div>${category}</div>
              </div>
              <div class="row">
                <div>Description: </div><div class="description">${description}</div>
              </div>
              <div class="row">
                <div>Product Name: </div><div>${productName}</div>
              </div>
              <div class="row">
                <div>Retailer: </div><a href="${retailerUrl}">Retailer</a>
              </div>
              <div class="row">
                <div>Product Brand: </div><div>${productBrand}</div>
              </div>
            </div>
            <div class="actions">
              <div class="edit"></div>
              <div class="delete"></div>
            </div>
            <div class="price-wrapper">
              <div>${originalPrice.amount} ${originalPrice.currencyCode}</div>
              <div>${reducedPrice.amount} ${reducedPrice.currencyCode}</div>
            </div>
            <div class="timestamp">
              Added to basket - ${new Date(preview.createdAt).toUTCString()}
            </div>
          </div>
        </div>
      </div>`
    );
  }

  __showOffer = (id) => (e) => {
    document.querySelector(`#${id} .details-wrapper`).classList.toggle("active");
  }

  render(container, preview) {
    container.insertAdjacentHTML('beforeend', this.__offerPreviewRenderer(preview));
    return this;
  }

  setEvents(id) {
    document.querySelector(`#${id} .details`).addEventListener('click', this.__showOffer(id));
    document.querySelector(`#${id} .edit`).addEventListener('click', () => this.onEdit(id));
    document.querySelector(`#${id} .delete`).addEventListener('click', () => this.onDelete(id));
  }
}
