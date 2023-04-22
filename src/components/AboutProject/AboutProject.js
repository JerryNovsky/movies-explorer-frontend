function AboutProject() {
  return (
    <section id="aboutproject" className="aboutproject">
      <div className="aboutproject__container main__container">
        <h2 className="heading aboutproject__heading">О проекте</h2>
        <div className="aboutproject__description">
          <div className="aboutproject__description-column">
            <h3 className="aboutproject__title">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="aboutproject__text">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className="aboutproject__description-column">
            <h3 className="aboutproject__title">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="aboutproject__text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="aboutproject__metrics">
          <div className="aboutproject__backend">
            <div className="aboutproject__weeks aboutproject__weeks_type_backend">
              1 неделя
            </div>
            <p className="aboutproject__types">Back-end</p>
          </div>
          <div className="aboutproject__frontend">
            <div className="aboutproject__weeks aboutproject__weeks_type_frontend">
              4 недели
            </div>
            <p className="aboutproject__types">Front-end</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
