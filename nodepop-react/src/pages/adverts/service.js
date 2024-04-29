import { client } from "../../api/client";

const advertsUrl = "api/v1/adverts";

export function getLatestAds() {
  const url = `${advertsUrl}`;
  return client.get(url);
}
