const MOVIES_URL = "https://api.nomoreparties.co/beatfilm-movies";

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export function getAllMovies() {
  console.log("PUCK!");
  return fetch(MOVIES_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => checkResponse(res));
}
