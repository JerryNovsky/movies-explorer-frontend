function NavTab() {
  return (
    <div className="navtab">
      <button className="navtab__button">О проекте</button>
      <button href="#techs" className="navtab__button">
        Технологии
      </button>
      <button href="#aboutme" className="navtab__button">
        Студент
      </button>
    </div>
  );
}

export default NavTab;
