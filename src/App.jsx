
import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [task, setTask] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");

    return savedTodos
      ? JSON.parse(savedTodos)
      : [
          {
            text: "Complete React projects",
            date: "2025-09-11 10:30 AM",
            completed: false,
          },
        ];
  });

  // Save Todos to Local Storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add Todo
  const addTodo = () => {
    if (!task.trim()) return;

    const newTodo = {
      text: task,
      date: new Date().toLocaleString(),
      completed: isCompleted,
    };

    setTodos([...todos, newTodo]);
    setTask("");
    setIsCompleted(false);
  };

  // Toggle Todo Status
  const toggleCompleted = (index) => {
    const newTodos = [...todos];

    newTodos[index].completed = !newTodos[index].completed;

    setTodos(newTodos);
  };

  // Delete Todo
  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);

    setTodos(newTodos);
  };

  return (
    <div className="container">
      <h2 className="title">React Todo List</h2>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter your Todo..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="input-box"
        />

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={(e) => setIsCompleted(e.target.checked)}
          />
          Completed?
        </label>

        <button className="add-btn" onClick={addTodo}>
          Add
        </button>
      </div>

      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li
            key={index}
            className={`todo-item ${
              todo.completed ? "completed" : "not-completed"
            }`}
          >
            <div className="todo-info">
              <div className="todo-text-date">
                <p className="todo-text">{todo.text}</p>
                <small className="todo-date">{todo.date}</small>
              </div>
            </div>

            <div className="actions">
              <button
                onClick={() => toggleCompleted(index)}
                className={`status-btn ${
                  todo.completed ? "green" : "red"
                }`}
              >
                {todo.completed ? "Mark Not Done" : "Mark Done"}
              </button>

              <button
                onClick={() => deleteTodo(index)}
                className="delete-btn"
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
