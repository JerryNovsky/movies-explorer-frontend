import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import { useState, useEffect } from "react";
import * as MoviesApi from "../../utils/MoviesApi";
import { filterByKeyword, filterByDuration } from "../../utils/filters";
import useWindowWidth from "../../utils/useWindowWidth";

function Movies({ loggedIn, savedMovies, handleSaveMovie, handleDeleteMovie }) {
  
const SCREEN_SIZE_MEDIUM = 1024;
const SCREEN_SIZE_SMALL = 480;
const CARDS_PER_PAGE_LARGE = 12;
const CARDS_PER_PAGE_MEDIUM = 8;
const CARDS_PER_PAGE_SMALL = 5;
const MORE_CARDS_LARGE = 6;
const MORE_CARDS_MEDIUM = 4;
  
  const [allMovies, setAllMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [slicedMovies, setSlicedMovies] = useState([]);
  const windowWidth = useWindowWidth();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const handleSearch = (searchQuery) => {
    setIsLoading(true);
    setIsSearchActive(true);
    setIsError(false);
    if (allMovies.length === 0) {
      MoviesApi.getAllMovies()
        .then((res) => {
          setAllMovies(res);
          localStorage.setItem('allMovies', JSON.stringify(res));
          const filteredArray = filterByKeyword(res, searchQuery);
          setSearchedMovies(filteredArray);
          localStorage.setItem('searchedMovies', JSON.stringify(filteredArray));
        })
        .catch((err) => {
          console.log(err);
          setIsError(true);
        })
        .finally(() => setIsLoading(false));
    } else {
      const filteredArray = filterByKeyword(allMovies, searchQuery);
      setSearchedMovies(filteredArray);
      localStorage.setItem('searchedMovies', JSON.stringify(filteredArray));
      setIsLoading(false);
    }
    localStorage.setItem('searchQuery', searchQuery);
    isFilterActive
      ? localStorage.setItem('filterActive', 'true')
      : localStorage.removeItem('filterActive');
  };
  const handleCheckBox = () => {
    isFilterActive
      ? localStorage.removeItem('filterActive')
      : localStorage.setItem('filterActive', 'true');
    setIsFilterActive((prevState) => !prevState);
  };
  const addMovies = () => {
    let addition =
      windowWidth > SCREEN_SIZE_MEDIUM ? MORE_CARDS_LARGE : MORE_CARDS_MEDIUM;
    setSlicedMovies((prevVal) => {
      return prevVal.concat(
        filteredMovies.slice(prevVal.length, prevVal.length + addition),
      );
    });
  };
  useEffect(() => {
    if (isFilterActive) {
      setFilteredMovies(filterByDuration(searchedMovies));
    } else {
      setFilteredMovies(searchedMovies);
    }
  }, [isFilterActive, searchedMovies]);
  useEffect(() => {
    let limit;
    if (windowWidth > SCREEN_SIZE_MEDIUM) {
      limit = CARDS_PER_PAGE_LARGE;
    } else if (windowWidth > SCREEN_SIZE_SMALL) {
      limit = CARDS_PER_PAGE_MEDIUM;
    } else {
      limit = CARDS_PER_PAGE_SMALL;
    }
    if (filteredMovies.length > limit) {
      setSlicedMovies(filteredMovies.slice(0, limit));
    } else {
      setSlicedMovies(filteredMovies);
    }
  }, [windowWidth, filteredMovies]);
  useEffect(() => {
    const all = localStorage.getItem('allMovies');
    const searched = localStorage.getItem('searchedMovies');
    const isChecked = localStorage.getItem('filterActive');
    if (all) {
      setAllMovies(JSON.parse(all));
    }
    if (searched) {
      setSearchedMovies(JSON.parse(searched));
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
          handleSearch={handleSearch}
          isChecked={isFilterActive}
          handleCheckBox={handleCheckBox}
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
            <p className="movies__error-message">Ничего не найдено</p>
          )}
        {!isLoading && !isError && filteredMovies.length > 0 && (
          <>
            <MoviesCardList
              movies={slicedMovies}
              savedMovies={savedMovies}
              isSavedMoviesPage={false}
              handleSaveMovie={handleSaveMovie}
              handleDeleteMovie={handleDeleteMovie}
            />
            {slicedMovies.length < filteredMovies.length && (
              <button
                className="moviescardlist__more-button"
                type="button"
                onClick={addMovies}
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
