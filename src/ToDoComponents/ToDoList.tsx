import { useSelector } from "react-redux"
import type { RootState } from "../store/store"
import ToDoItem from "./ToDoItem"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchToDos } from "../store/ToDoSlice"

const ToDoList = () => {
    const dispatch = useDispatch<any>()
    const todos = useSelector((store: RootState) => store.todo.todos)
    const filter = useSelector((store: RootState) => store.todo.filter)

    useEffect(() => {
        dispatch(fetchToDos())
    },[dispatch])

    const renderToDoListWithFilter = () => {
        switch (filter) {
            case ('All') :
                return (
                    todos.map(todoItem => (
                        <ToDoItem key={todoItem.id} todo={todoItem}/>
                    ))
                )
            case 'Completed' :
                return todos
                .filter((todoItem => todoItem.completed))
                .map(todoItem => (
                    <ToDoItem key={todoItem.id} todo={todoItem}/>
                ))
            case 'Incompleted' :
                return todos
                .filter((todoItem => !todoItem.completed))
                .map(todoItem => (
                    <ToDoItem key={todoItem.id} todo={todoItem}/>
                ))
        }
    }

    return (
        <>
            <div className="to-do-tasks">
                {renderToDoListWithFilter()}
            </div>
        </>
    )
}

export default ToDoList

// todos.map(todoItem => (
//                     <ToDoItem key={todoItem.id} todo={todoItem}/>
//                 ))