import { client } from "../../api/client";

const advertsURL = "api/v1/adverts";

export function getLatestAds() {
  return client.get(advertsURL);
}
