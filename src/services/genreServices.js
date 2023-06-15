import http from "./httpServices";

export function getGenres() {
  return http.get("/api/genres");
}

export function addGenre() {
     return http.post("/api/genres", movie);
}
