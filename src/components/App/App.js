import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import ErrorPage from "../ErrorPage/ErrorPage";
import "../../components/App/App.css";
import * as MainApi from "../../utils/MainApi";
import * as Auth from "../../utils/Auth";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const navigate = useNavigate();

  const [registerError, setRegisterError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("isAuth"));
  const [currentUser, setCurrentUser] = useState({});
  const [isMoviesLoadingError, setIsMoviesLoadingError] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isFormLoading, setIsFormLoading] = useState(false);

  //функция авторизации на сайте
  function authorization(email, password) {
    setIsFormLoading(true);
    Auth.login({ email, password })
      .then((res) => {
        localStorage.getItem("isAuth");
        localStorage.setItem("token", res.token);
        setCurrentUser(res);
        setLoggedIn(true);
        navigate("/movies");
      })
      .catch((err) => {
        setLoginError(err.message);
      })
      .finally(() => setIsFormLoading(false));
  }

  //функция регистрации нового пользователя
  function registration(name, email, password) {
    setIsFormLoading(true);
    Auth.register({ name, email, password })
      .then(() => {
        authorization(email, password);
      })
      .catch((err) => {
        setLoginError(err.message);
      })
      .finally(() => setIsFormLoading(false));
  }

  //выход из профиля
  function logout() {
    setLoggedIn(false);
    navigate("/");
    setCurrentUser({});
    localStorage.clear();
  }

  //обновлении информации о себе
  function updateUser({ name, email }) {
    setIsFormLoading(true);
    MainApi.updateUser({ name, email })
      .then((user) => {
        setCurrentUser(user);
      })
      .finally(() => setIsFormLoading(false));
  }

  //получение списка избранных фильмов
  const getSavedMovies = () => {
    MainApi.getSavedMovies()
      .then((res) => {
        setSavedMovies(res);
      })
      .catch(() => {
        setIsMoviesLoadingError(true);
      });
  };

  //добавление фильма в избранное
  const addToSavedMovies = (data) => {
    MainApi.saveNewMovie(data)
      .then((movie) => {
        setSavedMovies([movie, ...savedMovies]);
      })
      .catch((err) => console.log(err));
  };

  //удаление фильмов из избранного
  const removeFromSavedMovies = (id) => {
    MainApi.deleteMovie(id)
      .then((res) => {
        setSavedMovies((prevVal) => {
          return prevVal.filter((item) => item._id !== res._id);
        });
      })
      .catch((err) => console.log(err));
  };

  //получение сохранненых конкретным пользователем фильмов
  useEffect(() => {
    if (loggedIn) {
      getSavedMovies();
    }
  }, [loggedIn]);

  //сохранение данных о пользователе в локальном хранилище
  useEffect(() => {
    MainApi.getCurrentUser()
      .then((user) => {
        setLoggedIn(true);
        localStorage.setItem("isAuth", true);
        setCurrentUser(user);
      })
      .catch(() => {
        setLoggedIn(false);
        localStorage.clear();
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <div className="app__container">
          <Routes>
            <Route path="/" element={<Main loggedIn={loggedIn} />} />
            <Route
              path="/movies"
              element={
                <ProtectedRoute
                  component={Movies}
                  loggedIn={loggedIn}
                  savedMovies={savedMovies}
                  handleSaveMovie={addToSavedMovies}
                  handleDeleteMovie={removeFromSavedMovies}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  component={SavedMovies}
                  loggedIn={loggedIn}
                  savedMovies={savedMovies}
                  handleDeleteMovie={removeFromSavedMovies}
                  isError={isMoviesLoadingError}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  component={Profile}
                  loggedIn={loggedIn}
                  logout={logout}
                  handleUpdateProfile={updateUser}
                />
              }
            />
            <Route
              path="/signin"
              element={
                loggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Login
                    handleLogin={authorization}
                    loginError={loginError}
                    setLoginError={setLoginError}
                    isFormLoading={isFormLoading}
                  />
                )
              }
            />
            <Route
              path="/signup"
              element={
                loggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Register
                    handleRegister={registration}
                    registerError={registerError}
                    setRegisterError={setRegisterError}
                    isFormLoading={isFormLoading}
                  />
                )
              }
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
