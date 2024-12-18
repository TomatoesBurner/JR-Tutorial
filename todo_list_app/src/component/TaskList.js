import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import Task from "./Task";

function TaskList() {
  // 从 localStorage 加载任务
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState("all");

  // 将任务保存到 localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(task) {
    if (!task.text || /^\s*$/.test(task.text)) {
      return;
    }
    setTasks((tasks) => [...tasks, task]);
  }

  function completeTask(id) {
    let updateTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isComplete: !task.isComplete };
      }
      return task;
    });
    setTasks(updateTasks);
  }

  function updateTask(taskId, newValue) {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    setTasks((prev) =>
      prev.map((item) => (item.id === taskId ? newValue : item))
    );
  }

  function removeTask(id) {
    const removeArr = [...tasks].filter((task) => task.id !== id);
    setTasks(removeArr);
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.isComplete;
    if (filter === "uncompleted") return !task.isComplete;
    return true;
  });

  return (
    <div>
      <h1>What's the Plan for Today</h1>
      <TaskForm onSubmit={addTask} />
      <div className="filter-buttons">
        <button
          className={`filter-button ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`filter-button ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
        <button
          className={`filter-button ${
            filter === "uncompleted" ? "active" : ""
          }`}
          onClick={() => setFilter("uncompleted")}
        >
          Uncompleted
        </button>
      </div>
      <Task
        tasks={filteredTasks}
        completeTask={completeTask}
        removeTask={removeTask}
        updateTask={updateTask}
      />
    </div>
  );
}

export default TaskList;
