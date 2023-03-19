import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
  return (
    <div>
      <section className="section moviescardlist">
        <ul className="moviescardlist__container">
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
        </ul>
        <button className="moviescardlist__more-button">Ещё</button>
      </section>
    </div>
  );
}

export default MoviesCardList;
