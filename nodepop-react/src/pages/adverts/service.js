import { client } from "../../api/client";

const advertsUrl = "api/v1/adverts";

export function getLatestAds() {
  const url = `${advertsUrl}`;
  return client.get(url);
}

export function getAdvert(advertId) {
  const url = `${advertsUrl}/${advertId}`;
  return client.get(url);
}

export function createNewAd(advert) {
  const newAdvert = {
    name: advert.name,
    sale: advert.sale,
    price: parseInt(advert.price),
    tags: [advert.tags],
  };

  return client.post(advertsUrl, newAdvert);
}
