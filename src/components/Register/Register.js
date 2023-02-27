import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="login">
      <Link to="/" className="header__logo login__logo" />
      <h2 className="login__heading">Добро пожаловать!</h2>
      <form className="login__form__container">
        <label className="login__label">Имя</label>
        <input className="login__input" required />
        <span className="login__input-error login__input-error_active">
          Введите корректное имя
        </span>
        <label className="login__label">Email</label>
        <input className="login__input" name="email" type="email" required />
        <span className="login__input-error login__input-error_active">
          Введите email
        </span>
        <label className="login__label">Пароль</label>
        <input className="login__input" name="password" type="password" />
        <span className="login__input-error login__input-error_active">
          Что-то пошло не так...
        </span>
        <button className="login__button register__button" type="submit">
          Зарегистрироваться
        </button>
        <div className="login__text-container">
          <p className="login__text">Уже зарегистрированы?</p>
          <Link to="/signin" className="link login__link">
            Войти
          </Link>
        </div>
      </form>
    </div>
  );
}
export default Register;