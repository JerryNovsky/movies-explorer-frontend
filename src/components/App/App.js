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
  const [currentUser, setCurrentUser] = useState({});
  const [registerError, setRegisterError] = useState("");
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("isAuth"));
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const [isMoviesLoadingError, setIsMoviesLoadingError] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isFormLoading, setIsFormLoading] = useState(false);

  function handleLogin({ email, password }) {
    setIsFormLoading(true);
    Auth.login({ email, password })
      .then((user) => {
        setCurrentUser(user);
        setLoggedIn(true);
        localStorage.setItem("isAuth", true);
        localStorage.setItem("token", user.token);
        setLoginError("");
        navigate("/movies");
      })
      .catch((err) => {
        setLoginError(err.message);
      })
      .finally(() => setIsFormLoading(false));
  }

  function handleRegister({ name, email, password }) {
    setIsFormLoading(true);
    Auth.register({ name, email, password })
      .then(() => {
        setRegisterError("");
        handleLogin({ email, password });
      })
      .catch((err) => {
        setRegisterError(err.message);
      })
      .finally(() => setIsFormLoading(false));
  }

  function logout() {
    setLoggedIn(false);
    navigate("/");
    setCurrentUser({});
    localStorage.clear();
  }

  function handleUpdateUser({ name, email }) {
    setIsFormLoading(true);
    MainApi.updateUser({ name, email })
      .then((user) => {
        setCurrentUser(user);
        setIsInfoTooltipOpen(true);
      })
      .catch(() => {
        setIsInfoTooltipOpen(true);
      })
      .finally(() => setIsFormLoading(false));
  }

  function handleInfoTooltipClose() {
    setIsInfoTooltipOpen(false);
  }

  const loadSavedMovies = () => {
    MainApi.getSavedMovies()
      .then((res) => {
        setSavedMovies(res);
      })
      .catch((err) => {
        setIsMoviesLoadingError(true);
        console.log(err);
      });
  };
  const handleSaveMovie = (data) => {
    MainApi.saveNewMovie(data)
      .then((movie) => {
        setSavedMovies([movie, ...savedMovies]);
      })
      .catch((err) => console.log(err));
  };
  const handleDeleteMovie = (id) => {
    MainApi.deleteMovie(id)
      .then((res) => {
        setSavedMovies((prevVal) => {
          return prevVal.filter((item) => item._id !== res._id);
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (loggedIn) {
      loadSavedMovies();
    }
  }, [loggedIn]);

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
        console.log(err);
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
                  handleSaveMovie={handleSaveMovie}
                  handleDeleteMovie={handleDeleteMovie}
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
                  handleDeleteMovie={handleDeleteMovie}
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
                  handleUpdateProfile={handleUpdateUser}
                  isInfoTooltipOpen={isInfoTooltipOpen}
                  handleInfoTooltipClose={handleInfoTooltipClose}
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
                    handleLogin={handleLogin}
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
                    handleRegister={handleRegister}
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
