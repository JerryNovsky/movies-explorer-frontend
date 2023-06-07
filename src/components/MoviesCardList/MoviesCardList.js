import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  movies,
  savedMovies,
  isSavedMoviesPage,
  handleSaveMovie,
  handleDeleteMovie,
}) {
  const moviesCard = movies.map((item) => {
    return (
      <li className="moviescard" key={isSavedMoviesPage ? item._id : item.id}>
        <MoviesCard
          movie={item}
          isSavedMoviesPage={isSavedMoviesPage}
          handleDeleteMovie={handleDeleteMovie}
          handleSaveMovie={handleSaveMovie}
          savedMovies={savedMovies}
        />
      </li>
    );
  });

  return (
    <section className="section moviescardlist">
      <ul className="moviescardlist__container">{moviesCard}</ul>
    </section>
  );
}

export default MoviesCardList;
