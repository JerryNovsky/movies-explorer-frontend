import moviesImage from "../../images/movies_card.png";
import moviesImageJanis from "../../images/movies_card_janis.png";
import moviesImageDesign from "../../images/movies_card_33words.png";

function MoviesCard({ page }) {
  return (
    <>
      <li className="moviescard">
        <div className="moviescard__container">
          <div>
            <p className="moviescard__title">Баския: Взрыв реальности</p>
            <p className="moviescard__length">1ч 43м</p>
          </div>
          <button
            className={`button moviescard__like moviescard__like_type_${page}`}
          />
        </div>
        <img
          className="moviescard__image"
          src={moviesImage}
          alt="Постер фильма"
        />
      </li>
      <li className="moviescard">
        <div className="moviescard__container">
          <div>
            <p className="moviescard__title">Бег - это свобода</p>
            <p className="moviescard__length">1ч 42м</p>
          </div>
          <button
            className={`button moviescard__like moviescard__like_type_${page}`}
          />
        </div>
        <img
          className="moviescard__image"
          src={moviesImageJanis}
          alt="Постер фильма"
        />
      </li>
      <li className="moviescard">
        <div className="moviescard__container">
          <div>
            <p className="moviescard__title">33 слова о дизайне</p>
            <p className="moviescard__length">1ч 47м</p>
          </div>
          <button
            className={`button moviescard__like moviescard__like_type_${page}`}
          />
        </div>
        <img
          className="moviescard__image"
          src={moviesImageDesign}
          alt="Постер фильма"
        />
      </li>
    </>
  );
}

export default MoviesCard;
