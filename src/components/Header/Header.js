import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header({ page, loggedIn }) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  function openNavMenu() {
    setIsNavOpen(true);
  }

  function closeNavMenu() {
    setIsNavOpen(false);
  }

  return (
    <header className={`header header_place_${page}`}>
      <Link to="/" className={`header__logo header__logo_place_${page}`}></Link>
      {loggedIn ? (
        <>
          <button className="button header__nav-button" onClick={openNavMenu} />
          <Navigation isOpened={isNavOpen} handleClose={closeNavMenu} />
        </>
      ) : (
        <div
          className={`header__link-container header__link-container_place_${page}`}
        >
          {/*Сейчас здесь ссылки, чтобы перейти на страницы регистрации и авторизации, впоследствии будет кнопка*/}
          <Link to="/signup" className="link header__link">
            Регистрация
          </Link>
          <Link to="/signin" className="header__signin-button button">
            Войти
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
