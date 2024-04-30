import {
  client,
  setAuthorizationHeader,
  removeAuthorizationHeader,
} from "../../api/client";
import storage from "../utils/storage";

export const login = (credentials, storageRequest) => {
  return client.post("api/auth/login", credentials).then(({ accessToken }) => {
    setAuthorizationHeader(accessToken);
    if (storageRequest) {
      storage.set("auth", accessToken);
    }
  });
};

export const logout = () => {
  return Promise.resolve().then(() => {
    removeAuthorizationHeader(); // LLAMA AL MÉTODO PARA QUITAR LA CABECERA DE AUTENTICACIÓN
    storage.remove("auth"); // BORRA LO QUE HABÍAMOS GUARDADO COMO AUTH
  });
};
