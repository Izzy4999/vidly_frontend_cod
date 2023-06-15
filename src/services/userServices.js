import http from "./httpServices";

const apiEndpoint = "/api/users/register";

export function register(email, password, name) {
  return http.post(apiEndpoint, { email, password, name });
}
