import { useEffect, useState } from "react";
import { urlRegExp } from "../../utils/urlRegExp";

function MoviesCard({
  movie,
  isSavedMoviesPage,
  savedMovies,
  handleSave,
  handleDelete,
}) {
  const [savedMovie, setSavedMovie] = useState(null);
  const trailerLink = urlRegExp.test(movie.trailerLink)
    ? movie.trailerLink
    : "https://www.youtube.com";
  useEffect(() => {
    if (!isSavedMoviesPage) {
      //setSavedMovie(savedMovies.find((item) => item.movieId === movie.id));
    }
  }, [movie.id, savedMovies, isSavedMoviesPage]);

  const toggleSave = (e) => {
    e.preventDefault();
    savedMovie
      ? handleDelete(savedMovie._id)
      : handleSave({
          country: movie.country || "no country",
          director: movie.director || "no director",
          duration: movie.duration || 0,
          year: movie.year || 0,
          description: movie.description || "no description",
          image: "https://api.nomoreparties.co/" + movie.image.url,
          trailerLink,
          thumbnail:
            "https://api.nomoreparties.co/" + movie.image.formats.thumbnail.url,
          movieId: movie.id,
          nameRU: movie.nameRU || "no name",
          nameEN: movie.nameEN || "no name",
        });
  };

  const toggleDelete = (e) => {
    e.preventDefault();
    handleDelete(movie._id);
  };

  return (
    <a className="link" href={trailerLink} target="_blank" rel="noreferrer">
      <div className="moviescard">
        <div className="moviescard__container">
          <div>
            <p className="moviescard__title">{movie.nameRU}</p>
            <p className="moviescard__length">1ч 43м</p>
          </div>
          {isSavedMoviesPage ? (
            <button
              className={`button moviescard__like moviescard__like_type_`}
              type="button"
              onClick={toggleDelete}
            />
          ) : (
            <button
              className={`button moviescard__like moviescard__like_type_`}
              type="button"
              onClick={toggleSave}
            />
          )}
        </div>
        <img
          className="moviescard__image"
          src={
            isSavedMoviesPage
              ? movie.image
              : "https://api.nomoreparties.co/" + movie.image.url
          }
          alt={movie.nameRU}
        />
      </div>
    </a>
  );
}

export default MoviesCard;
