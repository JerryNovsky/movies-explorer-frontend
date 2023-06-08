import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import { useState, useEffect } from "react";
import * as MoviesApi from "../../utils/MoviesApi";

function Movies({ loggedIn, savedMovies, handleSaveMovie, handleDeleteMovie }) {
  const [allMovies, setAllMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [screenSize, setScreenSize] = useState(undefined);

  //сортировка фильмов по названию
  function filterName(array, key) {
    return array.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(key.toLowerCase());
    });
  }

  //сортировка фильмов по длительности
  function filterDuration(array) {
    return array.filter((movie) => movie.duration <= 40);
  }

  //обработчик поискового запроса
  function handleSearch(query) {
    setIsError(false);
    setIsLoading(true);
    setIsSearchActive(true);
    if (allMovies.length === 0) {
      MoviesApi.getAllMovies()
        .then((res) => {
          setAllMovies(res);
          localStorage.setItem("allMovies", JSON.stringify(res));
          const filteredArray = filterName(res, query);
          setSearchedMovies(filteredArray);
          localStorage.setItem("searchedMovies", JSON.stringify(filteredArray));
        })
        .catch((err) => {
          console.log(err);
          setIsError(true);
        })
        .finally(() => setIsLoading(false));
    } else {
      const filteredArray = filterName(allMovies, query);
      setSearchedMovies(filteredArray);
      localStorage.setItem("searchedMovies", JSON.stringify(filteredArray));
      setIsLoading(false);
    }
    localStorage.setItem("searchValue", query);
    isFilterActive
      ? localStorage.setItem("filterActive", "true")
      : localStorage.removeItem("filterActive");
  }

  //обработчик чекбокса с короткометражками
  function handleCheckbox() {
    isFilterActive
      ? localStorage.removeItem("filterActive")
      : localStorage.setItem("filterActive", "true");
    setIsFilterActive((prevState) => !prevState);
  }

  //управление кнопкой "ещё" для загрузки фильмов
  function addMoviesList() {
    let addition = screenSize > 1024 ? 6 : 4;
    setSelectedMovies((prevVal) => {
      return prevVal.concat(
        filteredMovies.slice(prevVal.length, prevVal.length + addition)
      );
    });
  }

  useEffect(() => {
    let timeout;
    const getScreenSize = () => {
      setScreenSize(window.innerWidth);
    };
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        getScreenSize();
      }, "500");
    };
    window.addEventListener("resize", handleResize);
    getScreenSize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isFilterActive) {
      setFilteredMovies(filterDuration(searchedMovies));
    } else {
      setFilteredMovies(searchedMovies);
    }
  }, [isFilterActive, searchedMovies]);

  useEffect(() => {
    let limit;
    if (screenSize > 1024) {
      limit = 12;
    } else if (screenSize > 480) {
      limit = 8;
    } else {
      limit = 5;
    }
    if (filteredMovies.length > limit) {
      setSelectedMovies(filteredMovies.slice(0, limit));
    } else {
      setSelectedMovies(filteredMovies);
    }
  }, [screenSize, filteredMovies]);

  useEffect(() => {
    const allMovies = localStorage.getItem("allMovies");
    const searchedMovies = localStorage.getItem("searchedMovies");
    const isChecked = localStorage.getItem("filterActive");
    if (allMovies) {
      setAllMovies(JSON.parse(allMovies));
    }
    if (searchedMovies) {
      setSearchedMovies(JSON.parse(searchedMovies));
    }
    if (isChecked) {
      setIsFilterActive(true);
    }
  }, []);

  return (
    <>
      <Header page={"movies"} loggedIn={loggedIn} />
      <main className="movies">
        <SearchForm
          name={"movies"}
          onSearch={handleSearch}
          isChecked={isFilterActive}
          onCheckbox={handleCheckbox}
        />
        {isLoading && <Preloader />}
        {isError && (
          <p className="movies__error-message">
            Произошла ошибка. Повторите запрос позже.
          </p>
        )}
        {!isLoading &&
          !isError &&
          isSearchActive &&
          filteredMovies.length === 0 && (
            <p className="movies__error-message">
              К сожалению, ничего не найдено
            </p>
          )}
        {!isLoading && !isError && filteredMovies.length > 0 && (
          <>
            <MoviesCardList
              movies={selectedMovies}
              savedMovies={savedMovies}
              isSavedMoviesPage={false}
              handleSaveMovie={handleSaveMovie}
              handleDeleteMovie={handleDeleteMovie}
            />
            {selectedMovies.length < filteredMovies.length && (
              <button
                className="moviescardlist__more-button"
                type="button"
                onClick={addMoviesList}
              >
                Ещё
              </button>
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
