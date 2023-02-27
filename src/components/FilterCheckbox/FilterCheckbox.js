function FilterCheckbox() {
  return (
    <div className="filtercheckbox">
      <label className="filtercheckbox__label" htmlFor="shortfilm">
        <input
          className="filtercheckbox__input"
          type="checkbox"
          name="shortfilm"
          id="shortfilm"
        />
        <span className="filtercheckbox__checkbox"></span>
        <span className="filtercheckbox__text">Короткометражки</span>
      </label>
    </div>
  );
}

export default FilterCheckbox;
