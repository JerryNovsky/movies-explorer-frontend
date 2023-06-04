import { useEffect, useState } from 'react';
import { urlRegExp } from '../../utils/urlRegExp';

function MoviesCard({
  movie,
  isSavedMoviesPage,
  savedMovies,
  handleSaveMovie,
  handleDeleteMovie,
}) {
  const [savedMovie, setSavedMovie] = useState(null);
  const trailerLink = urlRegExp.test(movie.trailerLink)
    ? movie.trailerLink
    : 'https://www.youtube.com';
  useEffect(() => {
    if (!isSavedMoviesPage) {
      setSavedMovie(savedMovies.find((item) => item.movieId === movie.id));
    }
  }, [movie.id, savedMovies, isSavedMoviesPage]);
  const toggleSave = (e) => {
    e.preventDefault();
    savedMovie
      ? handleDeleteMovie(savedMovie._id)
      : handleSaveMovie({
          country: movie.country || 'no country',
          director: movie.director || 'no director',
          duration: movie.duration || 0,
          year: movie.year || 0,
          description: movie.description || 'no description',
          image: 'https://api.nomoreparties.co/' + movie.image.url,
          trailerLink,
          thumbnail:
            'https://api.nomoreparties.co/' + movie.image.formats.thumbnail.url,
          movieId: movie.id,
          nameRU: movie.nameRU || 'no name',
          nameEN: movie.nameEN || 'no name',
        });
  };
  const toggleDelete = (e) => {
    e.preventDefault();
    handleDeleteMovie(movie._id);
  };

  function convertTimeDuration(mins) {
    let hours = Math.trunc(mins/60);
    let minutes = mins % 60;
    if (hours === 0) {
    return minutes + ' минут';
  }
  else {
    return hours + ' ч ' + minutes + ' м';
  }
  }

  return (
    
      <div className="moviescard">
        <div className="moviescard__container">
          <div>
            <p className="moviescard__title">{movie.nameRU}</p>
            <p className="moviescard__length">{convertTimeDuration(movie.duration)}</p>
          </div>
          {isSavedMoviesPage ? (
            <button
              className="button moviescard__like moviescard__like_type_delete"
              type="button"
              onClick={toggleDelete}
            />
          ) : (
            <button
              className={`button moviescard__like ${
                savedMovie && 'moviescard__like_type_checked'
              }`}
              type="button"
              onClick={toggleSave}
            ></button>
            )}
        </div>
        <a className="link moviescard__link" href={trailerLink} target="_blank" rel="noreferrer">
        <img
          className="moviescard__image"
          src={
            isSavedMoviesPage
            ? movie.image
            : 'https://api.nomoreparties.co/' + movie.image.url
        }
        alt={movie.nameRU}
        />
      </a>
      </div>
  );
}

export default MoviesCard;
