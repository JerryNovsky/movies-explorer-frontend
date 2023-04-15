function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h3 className="portfolio__title">Портфолио</h3>
        <ul className="portfolio__links-list">
          <li className="portfolio__link-container">
            <a
              className="link portfolio__link"
              href="https://jerrynovsky.github.io/how-to-learn/index.html"
              rel="noopener noreferrer"
              target="_blank"
            >
              Статичный сайт
              <span className="portfolio__link-arrow">&#8599;</span>
            </a>
          </li>
          <li className="portfolio__link-container">
            <a
              className="link portfolio__link"
              href="https://jerrynovsky.github.io/russian-travel/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Адаптивный сайт
              <span className="portfolio__link-arrow">&#8599;</span>
            </a>
          </li>
          <li className="portfolio__link-container">
            <a
              className="link portfolio__link"
              href="https://jerrynovsky.nomoredomains.rocks"
              rel="noopener noreferrer"
              target="_blank"
            >
              Одностраничное приложение
              <span className="portfolio__link-arrow">&#8599;</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;
