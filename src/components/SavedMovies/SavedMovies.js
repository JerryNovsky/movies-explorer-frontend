import "./SavedMovies.css";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({ savedMovies, loggedIn, handleDeleteMovie, isError }) {
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isFilterActive, setIsFilterActive] = useState(false);

  function filterName(array, key) {
    return array.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(key.toLowerCase());
    });
  }

  function filterDuration(array) {
    return array.filter((movie) => movie.duration <= 40);
  }

  function handleSearch(searchQuery) {
    setSearchedMovies(filterName(savedMovies, searchQuery));
  }

  function handleCheckbox() {
    setIsFilterActive((prevState) => !prevState);
  }

  useEffect(() => {
    setSearchedMovies(savedMovies);
  }, [savedMovies]);
  useEffect(() => {
    if (isFilterActive) {
      setFilteredMovies(filterDuration(searchedMovies));
    } else {
      setFilteredMovies(searchedMovies);
    }
  }, [isFilterActive, searchedMovies]);
  return (
    <>
      <Header page={"saved-movies"} loggedIn={loggedIn} />
      <main className="saved-movies">
        <SearchForm
          name={"saved-movies"}
          handleSearch={handleSearch}
          isChecked={isFilterActive}
          handleCheckBox={handleCheckbox}
        />
        {isError && (
          <p className="movies__error-message">
            Во время запроса произошла ошибка. Возможно, проблема с соединением
            или сервер недоступен. Подождите немного и попробуйте ещё раз.
          </p>
        )}
        {!isError && filteredMovies.length === 0 && (
          <p className="movies__error-message">
            К сожалению, ничего не найдено
          </p>
        )}
        {!isError && filteredMovies.length > 0 && (
          <MoviesCardList
            movies={filteredMovies}
            isSavedMoviesPage={true}
            handleDeleteMovie={handleDeleteMovie}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
