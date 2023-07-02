import React from "react";
import doneIcon from "../../images/Union.png";
import errorIcon from "../../images/Error.png";

function InfoTooltip({ onClose, isOpen, isDone }) {
  return (
    <div className={`infotooltip ${isOpen ? "infotooltip_opened" : ""}`}>
      <div className="infotooltip__content">
        <div className="infotooltip__form">
          <img
            className="infotooltip__image"
            src={isDone ? doneIcon : errorIcon}
            alt={
              isDone
                ? "Данные профиля успешно отредактированы!"
                : "Что-то пошло не так, попробуйте еще раз!"
            }
          />
          <h2 className="infotooltip__title">
            {isDone
              ? "Данные профиля успешно отредактированы!"
              : "Что-то пошло не так, попробуйте еще раз!"}
          </h2>
        </div>
        <button
          type="button"
          className={`button infotooltip__close-button`}
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
