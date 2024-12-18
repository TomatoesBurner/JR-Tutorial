import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { TiEdit } from "react-icons/ti";
import TaskForm from "./TaskForm";

function Task({ tasks, completeTask, removeTask, updateTask }) {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    updateTask(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };
  if (edit.id) {
    return <TaskForm edit={edit} onSubmit={submitUpdate} />;
  }

  return tasks.map((task, index) => (
    <div
      className={task.isComplete ? "task-row complete" : "task-row"}
      key={index}
    >
      <div onClick={() => completeTask(task.id)} style={{ cursor: "pointer" }}>
        {task.text}
      </div>
      <div className="icons">
        <TiEdit
          onClick={() =>
            setEdit({
              id: task.id,
              value: task.text,
            })
          }
        />
        <IoCloseCircle
          onClick={() => removeTask(task.id)}
          className="delete-icon"
        />
      </div>
    </div>
  ));
}

export default Task;
