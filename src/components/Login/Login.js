import { Link } from "react-router-dom";
import useForm from "../../utils/useForm";
import AuthForm from "../AuthForm/AuthForm";

function Login({ handleLogin }) {
  const { values, handleChange, errors, isFormValid } = useForm();

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(values.email, values.password);
  }

  return (
    <section className="login">
      <Link to="/" className="header__logo login__logo" />
      <h2 className="login__heading">Рады видеть!</h2>
      <AuthForm
        className="login__form-container"
        name="login"
        submitText="Войти"
        isValid={isFormValid}
        onSubmit={handleSubmit}
      >
        <label htmlFor="login-email" className="login__label">
          Email
        </label>
        <input
          className="login__input login__input_error"
          name="email"
          type="email"
          placeholder="Введите адрес электронной почты"
          id="login-email"
          onChange={handleChange}
          value={values.email || ""}
          autoFocus
          errors={errors.email}
          required
        />
        <span className="login__span-error">{errors.email}</span>
        <label htmlFor="login-password" className="login__label">
          Пароль
        </label>
        <input
          className="login__input login__input_error"
          name="password"
          type="password"
          placeholder="Введите пароль"
          id="login-password"
          onChange={handleChange}
          value={values.password || ""}
          errors={errors.password}
          required
        />
        <span className="login__span-error">{errors.password}</span>
        <div className="login__text-container">
          <p className="login__text">Ещё не зарегистрированы?</p>
          <Link to="/signup" className="link login__link">
            Регистрация
          </Link>
        </div>
      </AuthForm>
    </section>
  );
}

export default Login;
