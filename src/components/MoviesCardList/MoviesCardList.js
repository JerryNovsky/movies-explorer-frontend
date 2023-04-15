import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ page }) {
  return (
    <>
      <section className="section moviescardlist">
        <ul className="moviescardlist__container">
          <MoviesCard page={page} />
          <MoviesCard page={page} />
          <MoviesCard page={page} />
          <MoviesCard page={page} />
          <MoviesCard page={page} />
          <MoviesCard page={page} />
        </ul>
        <button className="moviescardlist__more-button">Ещё</button>
      </section>
    </>
  );
}

export default MoviesCardList;
