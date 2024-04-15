import React, { useState } from "react";
import TodoItem from "./components/TodoItem/TodoItem";
import { IoMdClose } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";
import styles from "./TodoApp.module.css"; 

function TodoApp() {
  const [modalState, setModalState] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [editTaskId, setEditTaskId] = useState(null); 
  const [todos, setTodos] = useState([
    { id: 0, name: "Complete DSA Basics", status: "NotStarted" },
    { id: 1, name: "Complete Blind 75", status: "NotStarted" },
    { id: 2, name: "Revise Angular topics", status: "Completed" },
  ]);

  function deleteTodo(id) {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }

  function addTodoTask(taskName) {
    if (taskName.trim() !== "") {
      if (editTaskId !== null) {
        setTodos((todos) =>
          todos.map((todo) =>
            todo.id === editTaskId ? { ...todo, name: taskName } : todo
          )
        );
        setEditTaskId(null); 
      } else {
        setTodos((todos) => [
          ...todos,
          { id: todos.length, name: taskName, status: "NotStarted" },
        ]);
      }
      setTaskName("");
      toggleModel();
    }
  }

  function editTodo(id) {
    setEditTaskId(id);
    const taskToEdit = todos.find((todo) => todo.id === id);
    setTaskName(taskToEdit.name);
    toggleModel();
  }

  function toggleModel() {
    setModalState((state) => !state);
  }

  function updateTaskStatus(index) {
    setTodos((todos) => {
      const updatedTodos = todos.map((todo, i) => {
        if (i === index) {
          return { ...todo, status: todo.status === "NotStarted" ? "Completed" : "NotStarted" };
        }
        return todo;
      });
      return updatedTodos;
    });
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.listContainer}>
            <ul className={styles.list}>
              {todos.map((item, index) => (
                <TodoItem
                  key={index}
                  item={item}
                  index={index}
                  updateTaskStatus={updateTaskStatus}
                  deleteTodo={deleteTodo}
                  editTodo={editTodo}
                />
              ))}
            </ul>
            {!todos.length && (
          <div className={styles.noTasks}>
            <IoAddCircleOutline className={styles.icon} /> 
            <h2>Add some tasks</h2>
          </div>
        )}
        </div>
          <div className={styles.btnContainer}>
            <button
              onClick={() => {
                setTaskName(""); 
                setEditTaskId(null);
                toggleModel();
              }}
              className={styles.btn}
            >
              Add a new Task{" "}
            </button>
          </div>
        </div>
      </div>
      {modalState && (
        <div className={styles.modal}>
          <div className={styles.modalCard}>
            <div className={styles.modalTitle}>
              <h3>{editTaskId !== null ? "Edit Task" : "Add new Task"}</h3>
              <button className={styles.modalCloseBtn} onClick={()=> toggleModel()}><IoMdClose  /></button> 
            </div>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Enter task name..."
              className="input"
            />
            <button
              disabled={!taskName}
              onClick={() => addTodoTask(taskName)}
              className={styles.btn}
            >
              {editTaskId !== null ? "Update Task" : "Add Task"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default TodoApp;
