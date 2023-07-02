import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useState } from "react";

function SearchForm({ name, handleSearch, isChecked, onCheckbox }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setSearchError("");
  };

  function handleSubmit(e) {
    e.preventDefault();
    searchQuery
      ? handleSearch(searchQuery)
      : setSearchError("Строка поиска пуста");
  }

  return (
    <section className="searchform__form">
      <form
        className="searchform__container"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="searchform__input-container">
          <div className="searchform__search-icon"></div>
          <input
            className="searchform__input"
            placeholder="Фильм"
            autoFocus
            onChange={handleSearchChange}
            value={searchQuery}
            required
          ></input>
          <div className="searchform__border"></div>
          <button
            className="searchform__button button"
            type="submit"
            aria-label="Поиск"
          ></button>
          <FilterCheckbox isChecked={isChecked} handleCheckbox={onCheckbox} />
        </div>
        <span
          className={`searchform__error-span ${
            searchError && "searchform__error-span_active"
          }`}
        >
          {searchError}
        </span>
      </form>
    </section>
  );
}

export default SearchForm;
