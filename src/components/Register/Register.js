import { Link } from "react-router-dom";
import useForm from "../../utils/useForm";
import AuthForm from "../AuthForm/AuthForm";

function Register({ handleRegister }) {
  const { values, errors, handleChange, isFormValid } = useForm();

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(values.name, values.email, values.password);
  }

  return (
    <section className="login">
      <Link to="/" className="header__logo login__logo" />
      <h2 className="login__heading">Добро пожаловать!</h2>
      <AuthForm
        name="register"
        submitText="Зарегистрироваться"
        onSubmit={handleSubmit}
        isValid={isFormValid}
      >
        <label htmlFor="register-name" className="login__label">
          Имя
        </label>
        <input
          className="login__input"
          type="text"
          name="name"
          placeholder="Ваше имя"
          id="register-name"
          onChange={handleChange}
          value={values.name || ""}
          errors={errors.name}
          minLength={"2"}
          maxLength={"30"}
          autoFocus
          required
        />
        <span className="login__span-error">{errors.name}</span>
        <label htmlFor="register-email" className="login__label">
          Email
        </label>
        <input
          className="login__input"
          name="email"
          type="email"
          placeholder="Email"
          id="register-email"
          onChange={handleChange}
          value={values.email || ""}
          errors={errors.name}
          minLength={"2"}
          maxLength={"30"}
          autoFocus
          required
        />
        <span className="login__span-error">{errors.email}</span>
        <label htmlFor="register-password" className="login__label">
          Пароль
        </label>
        <input
          className="login__input login__input_error"
          name="password"
          type="password"
          placeholder="Пароль"
          id="register-password"
          onChange={handleChange}
          value={values.password || ""}
          errors={errors.password}
          minLength={"2"}
          maxLength={"30"}
          autoFocus
          required
        />
        <span className="login__span-error">{errors.password}</span>
        <div className="login__text-container">
          <p className="login__text">Уже зарегистрированы?</p>
          <Link to="/signin" className="link login__link">
            Войти
          </Link>
        </div>
      </AuthForm>
    </section>
  );
}
export default Register;
