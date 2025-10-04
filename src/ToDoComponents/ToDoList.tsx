import { useSelector } from "react-redux"
import type { RootState } from "../store/store"
import ToDoItem from "./ToDoItem"

const ToDoList = () => {
    const todos = useSelector((store: RootState) => store.todo.todos)

    return (
        <>
            <div className="to-do-tasks">
                {todos.map(todoItem => (
                    <ToDoItem key={todoItem.id} todo={todoItem}/>
                ))}
            </div>
        </>
    )
}

export default ToDoList