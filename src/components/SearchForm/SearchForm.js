import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useState, useEffect } from "react";

function SearchForm({ name, handleSearch, isChecked, handleCheckbox }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryError, setSearchQueryError] = useState("");
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    setSearchQueryError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchQuery
      ? handleSearch(searchQuery)
      : setSearchQueryError("Нужно ввести ключевое слово");
  };

  useEffect(() => {
    if (name === "movies") {
      const query = localStorage.getItem("searchQuery");
      if (query) {
        setSearchQuery(query);
      }
    }
  }, [name]);

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
            onChange={handleSearchInputChange}
            value={searchQuery}
            required
          ></input>
          <div className="searchform__border"></div>
          <button
            className="searchform__button button"
            type="submit"
            aria-label="Поиск"
          ></button>
          <FilterCheckbox
            isChecked={isChecked}
            handleCheckBox={handleCheckbox}
          />
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
