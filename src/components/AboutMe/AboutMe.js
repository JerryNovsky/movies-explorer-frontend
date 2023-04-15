import myPhoto from "../../images/my_photo.jfif";

function AboutMe() {
  return (
    <section id="aboutme" className="aboutme__container main__container">
      <h2 className="heading aboutme__heading">Студент</h2>
      <section className="aboutme__section">
        <div className="aboutme__info-container">
          <h3 className="aboutme__name">Александр</h3>
          <h4 className="aboutme__about">Фронтенд-разработчик, 28 лет</h4>
          <p className="aboutme__bio">
            Я родился в Иркутске, живу в Красноярске, окончил ИРНИТУ по
            специальностям "Бурение нефтяных и газовых скважин" и "Инноватика".
            Пишу музыку, играю на бас-гитаре, увлекаюсь большим теннисом, люблю
            готовить.
          </p>
          <a
            className="link aboutme__github-link"
            href="https://github.com/JerryNovsky"
            rel="noopener noreferrer"
            target="_blank"
          >
            Github
          </a>
        </div>
        <img
          className="aboutme__photo"
          src={myPhoto}
          alt="Фотография студента"
        ></img>
      </section>
    </section>
  );
}

export default AboutMe;
