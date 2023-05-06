import Header from "../Header/Header";
import { useContext, useEffect } from "react";
import useForm from "../../utils/useForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile({ logout, handleUpdateProfile, loggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, errors, resetForm, isFormValid } = useForm();

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateProfile(values);
  }

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  const isSubmitDisabled =
    !isFormValid ||
    (currentUser.name === values.name && currentUser.email === values.email);

  return (
    <>
      <Header page={"profile"} loggedIn={loggedIn} />
      <section className="profile">
        <h2 className="login__heading profile__heading">
          {`Привет, ${currentUser.name}!`}
        </h2>
        <form className="profile" onSubmit={handleSubmit} noValidate>
          <div className="profile__text-container">
            <p className="profile__field">Имя</p>
            <input
              className="profile__input"
              type="text"
              name="name"
              id="profile-name"
              minLength="2"
              maxLength="30"
              onChange={handleChange}
              value={values.name || ""}
              required
            />
          </div>
          <span className="login__span-error">{errors.name}</span>
          <div className="profile__text-container">
            <p className="profile__field">Email</p>
            <input
              className="profile__input"
              type="email"
              name="email"
              id="profile-email"
              onChange={handleChange}
              value={values.email || ""}
              required
            />
          </div>
          <span className="login__span-error">{errors.email}</span>
          <button
            className={`button profile__button ${
              isSubmitDisabled && "profile__button_disabled"
            }`}
            type="submit"
            disabled={isSubmitDisabled}
          >
            Редактировать
          </button>
          <button
            className="link button profile__button profile__button_type_logout"
            type="button"
            onClick={logout}
          >
            Выйти из аккаунта
          </button>
        </form>
      </section>
    </>
  );
}

export default Profile;
