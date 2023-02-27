import moviesImage from "../../images/movies_card.png";

function MoviesCard() {
  return (
      <li className="moviescard">
        <img
          className="moviescard__image"
          src={moviesImage}
          alt="Постер фильма"
        />
        <div className="moviescard__container">
          <p className="moviescard__title">Баския: Взрыв реальности</p>
          <button className="button moviescard__like-button" />
        </div>
        <p className="moviescard__length">1ч 43м</p>
      </li>
  );
}

export default MoviesCard;
