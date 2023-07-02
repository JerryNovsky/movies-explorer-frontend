const MAIN_URL = "https://api.movies-explorer.jn.nomoredomainsclub.ru";

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export function register({ name, email, password }) {
  return fetch(`${MAIN_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then((res) => checkResponse(res));
}

export function login({ email, password }) {
  return fetch(`${MAIN_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
}
