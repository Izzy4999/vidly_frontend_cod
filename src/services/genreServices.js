import http from "./httpServices";

export function getGenres() {
  return http.get("/api/genres");
}

export function getGenres() {
     return http.post("/api/genres", movie);
}
