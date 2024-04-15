import { LuCheckCircle } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RiEdit2Line } from "react-icons/ri";
import styles from "./TodoItem.module.css";
function TodoItem({ item, index, editTodo,deleteTodo, updateTaskStatus }) {
  const getStatusClass = () => {
    console.log(item.status)
    switch (item.status) {
      case 'NotStarted':
        return styles.notStarted;
      case 'Completed':
        return styles.completed;
      default:
        return ''; 
    }
  };
  return (
    <li key={item.id} className={`${styles.todoItem} ${getStatusClass()}`}>
      <div  className={styles.todoInfo}>
         <span onClick={() => updateTaskStatus(index)} className={styles.todoIcon}><LuCheckCircle   /></span> 
        <span className={styles.todoName}>{item.name}</span>
      </div>
      <div className={styles.ActionBtns}>
          <button onClick={() => editTodo(item.id)} className={styles.editBtn}>
           <RiEdit2Line />
          </button>
          <button onClick={() => deleteTodo(item.id)} className={styles.deleteBtn}>
            <RiDeleteBin6Line />
          </button>
      </div>
     
    </li>
  );
}
export default TodoItem;
