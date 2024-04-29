import { client } from "../../api/client";

export const login = (credentials) => {
  return client.post("api/auth/login", credentials);
};
