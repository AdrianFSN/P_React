import { client, setAuthorizationHeader } from "../../api/client";
import storage from "../utils/storage";

export const login = (credentials, storageRequest) => {
  return client.post("api/auth/login", credentials).then(({ accessToken }) => {
    setAuthorizationHeader(accessToken);
    if (storageRequest) {
      storage.set("auth", accessToken);
    }
  });
};
