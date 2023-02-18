import React from "react";

function Footer() {
  return (
    <footer className="footer page">
        <div className="footer__container section">
            <p className="footer__description">Учебный проект Яндекс.Практикум х BeatFilm</p>
            <div className="footer__about-container">
                <p className="footer__copyright">&copy; 2022</p>
                <div className="footer__link-container">
                    <a href="https://practicum.yandex.ru" className="footer__copyright footer__link">Яндекс.Практикум</a>
                    <a href="https://github.com/JerryNovsky" className="footer__copyright footer__link">Github</a>
                </div>
            </div>
        </div>
    </footer>
  );
}

export default Footer;