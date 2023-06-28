import { Link, useNavigate } from "react-router-dom";

function ErrorPage() {
  const previousPage = useNavigate();

  function handleClick() {
    previousPage(-1);
  }

  return (
    <section className="errorpage__text-container">
      <h2 className="errorpage__error">404</h2>
      <p className="errorpage__description">
        Страница по указанному маршруту не найдена
      </p>
      <Link
        to=""
        onClick={handleClick}
        className="link login__link errorpage__link"
      >
        Назад
      </Link>
    </section>
  );
}
export default ErrorPage;
