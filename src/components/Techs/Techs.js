function Techs() {
  return (
    <section id="techs" className="techs">
      <div className="techs__container main__container">
        <h2 className="heading techs__heading">Технологии</h2>
        <div className="techs__description">
          <div className="techs__description-column">
            <h3 className="techs__title">7 технологий</h3>
            <p className="techs__text">
              На курсе веб-разработки мы освоили технологии, которые применили в
              дипломном проекте.
            </p>
            <div className="techs__list">
              <div className="techs__item">HTML</div>
              <div className="techs__item">CSS</div>
              <div className="techs__item">JS</div>
              <div className="techs__item">React</div>
              <div className="techs__item">Git</div>
              <div className="techs__item">Express.js</div>
              <div className="techs__item">mongoDB</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Techs;
