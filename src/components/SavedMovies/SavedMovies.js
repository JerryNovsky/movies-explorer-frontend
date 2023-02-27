import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";

function SavedMovies() {
  return (
    <>
      <Header page={"movies"} loggedIn={true} />
      <main className="savedmovies">
        <SearchForm />
        <MoviesCardList />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
