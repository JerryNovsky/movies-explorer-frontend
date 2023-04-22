import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function Movies() {
  return (
    <>
      <Header page={"movies"} loggedIn={true} />
      <SearchForm />
      <main className="movies">
        <MoviesCardList />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
