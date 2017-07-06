const __merge = (offer) => (item) => {
  const mergedOffer = {
    id: item.id,
    properties: {
      ...item.properties,
      ...offer.offer[0].properties
    },
    createdAt: item.createdAt
  };
  return item.id === offer.id ? mergedOffer : item;
}

const parser = (offersList, offer) => {
  return {
    ...offersList,
    offers: offersList.offers.map(__merge(offer))
  }

}

export default parser;
