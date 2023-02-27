import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <section className="section searchform__form">
      <form className="searchform__container">
        <div className="searchform__input-container">
          <div className="searchform__search-icon"></div>
          <input
            className="searchform__input"
            placeholder="Фильм"
            autoFocus
            required
          ></input>
          <button
            className="searchform__button button"
            type="submit"
            aria-label="Поиск"
          ></button>
        </div>
        <FilterCheckbox />
      </form>
    </section>
  );
}

export default SearchForm;
