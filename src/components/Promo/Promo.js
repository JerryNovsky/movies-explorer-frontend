import backgroundImage from "../../images/pic__COLOR_landing-logo.svg";

function Promo() {
  return (
    <div className="promo">
      <h1 className="promo__description">
        Учебный проект студента факультета Веб-разработки
      </h1>
      <img
        className="promo__background-image"
        src={backgroundImage}
        alt="Фоновое изображение"
      />
    </div>
  );
}

export default Promo;
