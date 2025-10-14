import { useDispatch } from "react-redux"
import type { ToDo } from "../store/ToDoSlice"
import { fetchDeleteToDo, fetchToggleCompletedToDo} from "../store/ToDoSlice"
import { AppDispatch } from "../store/store"

interface ToDoItemProps {
    todo: ToDo
}

const ToDoItem = ({todo}: ToDoItemProps) => {
    const dispatch = useDispatch<AppDispatch>()

    return (
        <div className={`task ${todo.completed ? 'completed': ''} `}>
            <p className="task-value">{todo.text}</p>
            <div className="task-managment">
                <label className="checkbox" >
                    <input type="checkbox" className="checkbox__input" checked = {todo.completed} onChange={() => dispatch(fetchToggleCompletedToDo(todo.id))}/>
                    <span className="checkbox__box" aria-hidden="true"></span>
                </label>
                <button onClick={() => dispatch(fetchDeleteToDo(todo.id))}></button>
            </div>
        </div>
    )
}

export default ToDoItem