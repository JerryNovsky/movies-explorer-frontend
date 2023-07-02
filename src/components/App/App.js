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
import InfoTooltip from "../InfoTooltip/InfoTooltip";

function App() {
  const navigate = useNavigate();

  const [registerError, setRegisterError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("isAuth"));
  const [currentUser, setCurrentUser] = useState({});
  const [isMoviesLoadingError, setIsMoviesLoadingError] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState({
    isOpen: false,
    isDone: true,
  });

  //функция авторизации на сайте
  function authorization(email, password) {
    setIsFormLoading(true);
    Auth.login({ email, password })
      .then((res) => {
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

  //обновление информации о себе
  function updateUser({ name, email }) {
    setIsFormLoading(true);
    MainApi.updateUser({ name, email })
      .then((user) => {
        setCurrentUser(user);
        setIsInfoTooltip({
          isOpen: true,
          isDone: true,
        });
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => setIsFormLoading(false));
  }

  //добавление фильма в избранное
  function addToSavedMovies(data) {
    MainApi.saveNewMovie(data)
      .then((movie) => {
        setSavedMovies([movie, ...savedMovies]);
      })
      .catch((err) => console.log(err.message));
  }

  //удаление фильмов из избранного
  function removeFromSavedMovies(id) {
    MainApi.deleteMovie(id)
      .then((res) => {
        setSavedMovies((prevVal) => {
          return prevVal.filter((item) => item._id !== res._id);
        });
      })
      .catch((err) => console.log(err.message));
  }

  function closePopup() {
    setIsInfoTooltip({ ...isInfoTooltip, isOpen: false });
  }

  //получение данных пользователя
  useEffect(() => {
    if (loggedIn) {
      MainApi.getCurrentUser()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => {
          console.log(err.message);
        });
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
      .catch((err) => {
        setLoggedIn(false);
        localStorage.clear();
        console.log(err.message);
      });
  }, []);

  //получение списка избранных фильмов
  useEffect(() => {
    if (loggedIn) {
      MainApi.getSavedMovies()
        .then((res) => {
          const userMovies = res.filter(
            (movie) => movie.owner._id === currentUser._id
          );
          setSavedMovies(userMovies);
        })
        .catch((err) => {
          setIsMoviesLoadingError(true);
          console.log(err.message);
        });
    }
  }, [currentUser, loggedIn]);

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
          <InfoTooltip
            isOpen={isInfoTooltip.isOpen}
            onClose={closePopup}
            isDone={isInfoTooltip.isDone}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
