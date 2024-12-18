import React, { useState, useEffect, useRef } from "react";

function TaskForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: Date.now(),
      text: input,
    });
    setInput("");
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      {props.edit ? (
        <>
          <input
            type="text"
            placeholder="Update your item"
            value={input}
            name="text"
            className="task-input edit"
            onChange={handleChange}
            ref={inputRef}
          />
          <button className="task-button edit">Update</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Add a Task"
            value={input}
            name="text"
            className="task-input"
            onChange={handleChange}
            ref={inputRef}
          />
          <button className="task-button">Add Task</button>
        </>
      )}
    </form>
  );
}

export default TaskForm;
