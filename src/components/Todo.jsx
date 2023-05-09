import React from "react";
import { v4 } from "uuid";
import sprite from "../assets/icons/sprite.svg";
import "./Todo.scss";

import { TasksList } from "./TaskList/TasksList";
import { CustomIcon } from "../common/CustomIcon";
import { TaskDialogsWindow } from "./TaskDialogsWindow/TaskDialogsWindow";
import { useState } from "react";
import { Portal } from "./Portal/Portal";
import { useTheme } from "../hooks/useTheme";
import { useEffect } from "react";
import Quote from "./Quote/Quote";
import { CurrentTime } from "./СurrentTime/СurrentTime";


const Todo = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    return savedTasks !== null ? savedTasks : [];
  });

  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [quotes, setQuotes] = useState(
    "Life is what happens to you while you're busy making other plans"
  );

  const { isDark, setIsDark } = useTheme();
  const themeToggleIcon = isDark ? "#icon-sun" : "#icon-moon";
  const activeTasks = tasks.filter((task) => !task.isDone).length;

  const changeQuote = (quote) => {
    setQuotes(quote);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    setFilteredTasks(tasks);
  }, [tasks]);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const addNewTask = (taskText) => {
    const newTask = {
      id: v4(),
      text: taskText,
      isDone: false,
    };
    setTasks([...tasks, newTask]);
  };

  const removeTask = (task) => {
    setTasks(tasks.filter((t) => t.id !== task.id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.isDone));
  };

  const changeTaskStatus = (changedTask) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === changedTask.id) {
        return { ...task, isDone: !task.isDone };
      } else {
        return task;
      }
    });
    setTasks(updatedTasks);
  };

  const tasksFilter = (e) => {
    e.preventDefault();
    switch (e.target.id) {
      case "all-task":
        setFilteredTasks(tasks);
        break;
      case "active-task":
        const activeTask = tasks.filter((task) => !task.isDone);
        setFilteredTasks(activeTask);
        break;
      case "completed-task":
        const completedTask = tasks.filter((task) => task.isDone);
        setFilteredTasks(completedTask);
        break;
      default:
        setFilteredTasks(tasks);
        break;
    }
  };

  return (
    <div className="wrapper">
      <div className="todo">
        <div className="todo__header">
          <h2 className="todo__title">ToDo </h2>
          <div className="todo__quotes-container">
            <Quote changeQuote={changeQuote} quotes={quotes} />
          </div>
          <button
            className="todo__theme-toggle"
            onClick={() => setIsDark(!isDark)}
          >
            <CustomIcon
              iconType={`${sprite}${themeToggleIcon}`}
              size={"40px"}
              color={"white"}
            />
          </button>
        </div>
        <div className="todo__body">
          <div className="todo__add-task-block">
            <button className="todo__button" onClick={handleOpenDialog}>
              <CustomIcon
                iconType={`${sprite}#icon-plus`}
                size={"20px"}
                color={"white"}
                margin={"0 10 0 0"}
              />
              <span>Add Task</span>
            </button>
            <CurrentTime />
            <div style={{ display: "inline-block" }}>
              <span style={{ marginRight: "10px", fontWeight: "bold" }}>
                {activeTasks === 0 ? "" : activeTasks}
              </span>
              <span style={{ fontWeight: "bold" }}>
                {activeTasks === 0
                  ? "relax and enjoy life"
                  : "not completed tasks"}{" "}
              </span>
            </div>
          </div>
          {tasks.length !== 0 ? (
            <TasksList
              changeTaskStatus={changeTaskStatus}
              remove={removeTask}
              tasks={filteredTasks}
              title={"Your Tasks"}
            />
          ) : (
            <h3>No new task</h3>
          )}
          {isDialogOpen && (
            <Portal>
              <TaskDialogsWindow
                addTask={addNewTask}
                onClose={handleCloseDialog}
              />
            </Portal>
          )}
        </div>
        <div className="todo__bottom" onClick={tasksFilter}>
          <div>
            <button className="todo__bottom-button" id="all-task">
              All
            </button>
            <button className="todo__bottom-button" id="active-task">
              Active
            </button>
            <button className="todo__bottom-button" id="completed-task">
              Completed
            </button>
          </div>
          <button className="todo__bottom-button" onClick={clearCompleted}>
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
};

export { Todo };
