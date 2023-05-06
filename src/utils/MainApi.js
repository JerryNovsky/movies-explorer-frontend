const MAIN_URL = "https://api.movies-explorer.jn.nomoredomainsclub.ru";

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export function getCurrentUser() {
  return fetch(`${MAIN_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((res) => checkResponse(res));
}

export function updateUser({ name, email }) {
  return fetch(`${MAIN_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ name, email }),
  }).then((res) => checkResponse(res));
}

export function saveNewMovie({
  country,
  director,
  duration,
  year,
  description,
  image,
  trailerLink,
  thumbnail,
  movieId,
  nameRU,
  nameEN,
}) {
  return fetch(`${MAIN_URL}/movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    }),
  }).then((res) => checkResponse(res));
}

export function getSavedMovies() {
  return fetch(`${MAIN_URL}/movies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((res) => checkResponse(res));
}

export function deleteMovie(id) {
  return fetch(`${MAIN_URL}/movies/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((res) => checkResponse(res));
};
