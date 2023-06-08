import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useState, useEffect } from "react";

function SearchForm({ name, onSearch, isChecked, onCheckbox }) {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(searchQuery);
  }

  useEffect(() => {
    if (name === "movies") {
      const searchValue = localStorage.getItem("searchValue");
      if (searchValue) {
        setSearchQuery(searchValue);
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
      </form>
    </section>
  );
}

export default SearchForm;
