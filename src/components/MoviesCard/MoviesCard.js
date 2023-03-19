import moviesImage from "../../images/movies_card.png";

function MoviesCard() {
  return (
    <li className="moviescard">
      <div className="moviescard__container">
        <div>
          <p className="moviescard__title">Баския: Взрыв реальности</p>
          <p className="moviescard__length">1ч 43м</p>
        </div>
        <button className="button moviescard__like-button" />
      </div>
      <img
        className="moviescard__image"
        src={moviesImage}
        alt="Постер фильма"
      />
    </li>
  );
}

export default MoviesCard;
