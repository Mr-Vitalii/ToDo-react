import React, { useState } from "react";
import "../../assets/styles/CommonSettings.scss";
import "../TaskDialogsWindow/TaskDialogsWindow.scss";
import "../TaskDialogsWindow/TaskDialogsWindowDark.scss";
import sprite from "../../assets/icons/sprite.svg";
import { useTheme } from "../../hooks/useTheme";



const TaskDialogsWindow = ({ addTask, onClose }) => {

  const [inputValue, setInputValue] = useState("");
  const { isDark } = useTheme();

  const darkTheme = isDark? "": "dark"
  const isButtonDisabled = inputValue === "";
  
  const onChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleClose = () => {
    onClose();
  }

  const handleAddTask = () => {
    addTask(inputValue);
    handleClose();
  }

  return (
    <>
      <div className="task-modal-background" onClick={onClose}></div>
      <div className={`task-modal ${darkTheme}`}>
        <button className="task-modal__close-button" onClick={onClose}>
          <svg className="task-modal__close-icon" width="22px" height="22px">
            <use xlinkHref={`${sprite}#icon-close-black`} />
          </svg>
        </button>
        <h2 className="task-modal__title">What's up today?</h2>
        <p className="task-modal__text">
          To add a task, fill in the field and click the "Add new task"
        </p>
        <input
          className="task-modal__input"
          type="text"
          value={inputValue}
          onChange={onChange}
          placeholder="Create a new task..."
        />
        <div className="task-modal__button-container">
          <button className="task-modal__button" onClick={handleClose}>
            Cancel
          </button>
          <button
            className="task-modal__button"
            onClick={handleAddTask}
            disabled={isButtonDisabled}
          >
            Add new task
          </button>
        </div>
      </div>
    </>
  );
};

export { TaskDialogsWindow };
