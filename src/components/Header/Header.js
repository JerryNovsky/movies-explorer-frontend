import React from "react";

function Header() {
    return (
        <header className="header section">
            <div className="header__container">
                <div className="header__logo"></div>
                <div className="header__selector">
                    <p className="">Фильмы</p>
                    <p>Сохраненные фильмы</p>
                </div>
                <button className="header__account-button button">Аккаунт</button>
            </div>
        </header>
    );
}

export default Header;