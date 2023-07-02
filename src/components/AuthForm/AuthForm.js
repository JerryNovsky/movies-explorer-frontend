function AuthForm({
  name,
  submitText,
  children,
  onSubmit,
  isValid,
  isLoading,
}) {
  return (
    <form
      className="login__form-container"
      name={`${name}-form`}
      onSubmit={onSubmit}
      noValidate
    >
      {children}
      <button
        className={`login__button register__button ${
          (!isValid || isLoading) && "login__button_disabled"
        }`}
        type="submit"
        disabled={!isValid || isLoading}
        aria-label={submitText}
      >
        {isLoading ? "Сохранение..." : submitText}
      </button>
    </form>
  );
}

export default AuthForm;
