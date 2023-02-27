function Portfolio() {
  return (
    <div className="portfolio">
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
            </a>
            <span className="portfolio__link-arrow">&#8599;</span>
          </li>
          <li className="portfolio__link-container">
            <a
              className="link portfolio__link"
              href="https://jerrynovsky.github.io/russian-travel/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Адаптивный сайт
            </a>
            <span className="portfolio__link-arrow">&#8599;</span>
          </li>
          <li className="portfolio__link-container">
            <a
              className="link portfolio__link"
              href="https://jerrynovsky.nomoredomains.rocks"
              rel="noopener noreferrer"
              target="_blank"
            >
              Одностраничное приложение
            </a>
            <span className="portfolio__link-arrow">&#8599;</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Portfolio;
