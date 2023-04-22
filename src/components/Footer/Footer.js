import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container section">
        <p className="footer__description">
          Учебный проект Яндекс.Практикум х BeatFilm
        </p>
        <div className="footer__about-container">
          <p className="footer__copyright">&copy; 2023</p>
          <div className="footer__link-container">
            <a
              href="https://practicum.yandex.ru"
              className="footer__link link"
              rel="noopener noreferrer"
              target="_blank"
            >
              Яндекс.Практикум
            </a>
            <a
              href="https://github.com"
              className="footer__link link"
              rel="noopener noreferrer"
              target="_blank"
            >
              Github
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
