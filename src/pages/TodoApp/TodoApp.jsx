import { useState } from "react";
import { MdDelete, MdAddBox } from "react-icons/md";
import { ImCheckboxChecked } from "react-icons/im";
import { GrCheckbox } from "react-icons/gr";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
function TodoApp() {
    const [taskName, setTaskName] = useState("");
    const [todos, setTodos] = useState([
        { id: 0, name: "Complete DSA Basics", completed: true },
        { id: 1, name: "Complete Blind 75", completed: false }
    ]);

    function deleteTodo(id) {
        setTodos(todos => todos.filter(todo => todo.id !== id));
    }

    function addTodo() {
        if (taskName.trim() !== "") {
            setTodos(todos => [...todos, { id: todos.length, name: taskName, completed: false }]);
            setTaskName("");
        }
    }

    function updateTaskStatus(index) {
        setTodos(todos => {
            const updatedTodos = todos.map((todo, i) => {
                if (i === index) {
                    return { ...todo, completed: !todo.completed };
                }
                return todo;
            });
            return updatedTodos;
        });
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex items-center mb-4 pb-4 border-b-2 border-gray-200">
                <Link to="/" >
                   <IoArrowBackCircle  className="text-2xl" />
                </Link>
               <h1 className="text-3xl font-bold ml-4">My Tasks</h1>
            </div>
            <div className="flex mb-4">
                <input
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    placeholder="Add a new task..."
                    className="border border-gray-300 px-3 py-2 w-full rounded-lg mr-2 focus:outline-none"
                />
                <button
                    onClick={addTodo}
                    className="bg-blue-500 text-white p-4 rounded-lg transition duration-300 hover:bg-blue-600 focus:outline-none"
                >
                    <MdAddBox className="inline-block" /> 
                </button>
            </div>
            <ul>
                {todos.map((item, index) => (
                    <li
                        key={item.id}
                        className={`flex items-center justify-between p-4 border border-gray-300 rounded-lg mb-2 ${item.completed ? 'bg-gray-100' : ''}`}
                    >
                        <div  onClick={() => updateTaskStatus(index)} className="flex items-center cursor-pointer ">                            
                             {item.completed  ?  <ImCheckboxChecked />   : <GrCheckbox /> }
                             <span className={`${item.completed ? 'line-through' : ''} ml-2`}>{item.name}</span>

                        </div>
                        <button
                            onClick={() => deleteTodo(item.id)}
                            className="text-red-500 transition duration-300 hover:text-red-600 focus:outline-none"
                        >
                            <MdDelete />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoApp;
