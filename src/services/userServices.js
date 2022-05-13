import http from "./httpServices";

const apiEndpoint = "/users/register";

export function register(email, password, name) {
  return http.post(apiEndpoint, { email, password, name });
}
