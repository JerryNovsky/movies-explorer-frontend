import { NavLink, Link } from "react-router-dom";

function Navigation({ isOpened, handleClose }) {
  return (
    <section className={`navigation ${isOpened ? "navigation_opened" : ""}`}>
      <div className="navigation__nav-menu">
        <button
          className="button navigation__close navigation__hidden"
          onClick={handleClose}
        />
        <ul className="navigation__links">
          <li>
            <NavLink
              to="/"
              className="link navigation__link navigation__hidden"
            >
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies" className="link navigation__link">
              Фильмы
            </NavLink>
          </li>
          <li>
            <NavLink to="/saved-movies" className="link navigation__link">
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
        <Link to="/profile" className="navigation__profile-link">
          Аккаунт
        </Link>
      </div>
    </section>
  );
}

export default Navigation;
