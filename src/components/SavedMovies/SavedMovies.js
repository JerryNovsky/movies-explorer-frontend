import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import { useState, useEffect } from "react";
import { filterByKeyword, filterByDuration } from "../../utils/filters";

function SavedMovies(savedMovies, loggedIn, handleDeleteMovie, isError) {
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isFliterActive, setIsFilterActive] = useState(false);
  const handleSearch = (searchQuery) => {
    setSearchedMovies(filterByKeyword(savedMovies, searchQuery));
  };

  const handleCheckBox = () => {
    setIsFilterActive((prevState) => !prevState);
  };

  useEffect(() => {
    setSearchedMovies(savedMovies);
  }, [savedMovies]);

  useEffect(() => {
    if (isFliterActive) {
      setFilteredMovies(filterByDuration(searchedMovies));
    } else {
      setFilteredMovies(searchedMovies);
    }
  }, [isFliterActive, searchedMovies]);

  return (
    <>
      <Header page={"movies"} loggedIn={loggedIn} />
      <main className="savedmovies">
        <SearchForm
          page={"savedmovies"}
          handleSearch={handleSearch}
          isChecked={isFliterActive}
          handleCheckBox={handleCheckBox}
        />
        {isError && (
          <p className="movies__error-message">
            Во время запроса произошла ошибка. Возможно, проблема с соединением
            или сервер недоступен. Подождите немного и попробуйте ещё раз.
          </p>
        )}
        {!isError && filteredMovies.length === 0 && (
          <p className="movies__error-message">Ничего не найдено</p>
        )}
        {!isError && filteredMovies.length > 0 && (
          <MoviesCardList
            page={"saved"}
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
