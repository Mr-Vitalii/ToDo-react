import React, { useState } from "react";
import sprite from "../../assets/icons/sprite.svg";
import {CustomIcon} from "../../common/CustomIcon";
import { useTheme } from "../../hooks/useTheme";
import "./Task.scss";

const Task = ({ remove, number, task, changeTaskStatus }) => {
  const [isDone, setIsDone] = useState(task.isDone);
  const { isDark } = useTheme();

  const iconColor = isDark ? `var(--accent-color)` : `var(--accent-color-dark)`;

  const onChange = () => {
    setIsDone(!isDone);
    changeTaskStatus(task);
  };

  const onClick = (e) => {
    switch (e.target.name) {
      case "deleteBtn":
        remove(task);
        break;
      case "doneBtn":
        onChange();
        break;
      default:
        break;
    }
  };

  return (
    <li>
      <div className="task">
        {isDone ? (
          <CustomIcon
            iconType={`${sprite}#check-mark`}
            size={"20px"}
            color={iconColor}
          />
        ) : (
          ""
        )}

        <input
          className="task__checkbox"
          type="checkbox"
          checked={isDone}
          onChange={onChange}
        />
        <div className="task__text-container">
          <span className="task__number"> {number}</span>
          <p className="task__text">{task.text}</p>
        </div>
        <div className="task__button-container">
          <button name="doneBtn" className="task__button" onClick={onClick}>
            Done
          </button>
          <button name="deleteBtn" className="task__button" onClick={onClick}>
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default React.memo(Task);
