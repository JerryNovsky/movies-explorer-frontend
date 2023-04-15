import { Link } from "react-router-dom";

function Login() {
  return (
    <section className="login">
      <Link to="/" className="header__logo login__logo" />
      <h2 className="login__heading">Рады видеть!</h2>
      <form className="login__form-container">
        <label className="login__label">Email</label>
        <input className="login__input" name="email" type="email" required />
        <span className="login__span-error login__span-error_active">
          Введите email
        </span>
        <label className="login__label">Пароль</label>
        <input
          className="login__input login__input_error"
          name="password"
          type="password"
          required
        />
        <span className="login__span-error login__span-error_active">
          Что-то пошло не так...
        </span>
        {/*Сейчас здесь ссылка, чтобы перейти на страницу с фильмами, впоследствии будет кнопка*/}
        <Link to="/movies" className="link login__button">
          Войти
        </Link>
        <div className="login__text-container">
          <p className="login__text">Ещё не зарегистрированы?</p>
          <Link to="/signup" className="link login__link">
            Регистрация
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Login;
