import http from "./httpServices";

export function getGenres() {
  return http.get("/api/genres");
}

export function addGenre(genre) {
     return http.post("/api/genres", {name:genre});
}
