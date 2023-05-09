import React from "react";
import "../../assets/styles/CommonSettings.scss";
import Task from "../Task/Task";

const TasksList = ({ title, tasks, remove, changeTaskStatus }) => {

  return (
    <div>
      <h3>{title}</h3>
      <ul className="list-style">
        {tasks.map((task, index) => {
          return (
            <Task
              remove={remove}
              number={index + 1}
              task={task}
              key={task.id}
              changeTaskStatus={changeTaskStatus}
            />
          );
        })}
      </ul>
    </div>
  );
};

export  {TasksList};
