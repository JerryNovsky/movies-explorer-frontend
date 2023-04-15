import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";

function SavedMovies() {
  return (
    <>
      <Header page={"movies"} loggedIn={true} />
      <SearchForm page={"savedmovies"} />
      <main className="savedmovies">
        <MoviesCardList page={"saved"} />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
