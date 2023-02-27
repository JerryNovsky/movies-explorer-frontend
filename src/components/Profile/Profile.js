import Header from "../Header/Header";
import { Link } from "react-router-dom";

function Profile() {
  return (
    <>
      <Header page={"profile"} loggedIn={true} />
      <div className="profile">
        <h2 className="login__heading profile__heading">Привет, гость!</h2>
        <div className="profile__text-container">
          <p className="profile__field">Имя</p>
          <p className="profile__quantity">Гость</p>
        </div>
        <div className="profile__text-container">
          <p className="profile__field">Email</p>
          <p className="profile__quantity">pochta@yandex.ru</p>
        </div>
        <button className="button profile__button">Редактировать</button>
        <Link
          to="/"
          className="link button profile__button profile__button_logout"
        >
          Выйти из аккаунта
        </Link>
      </div>
    </>
  );
}

export default Profile;
