import { useState } from "react"
import { useDispatch } from "react-redux"
import { addTask } from "../store/ToDoSlice"

const ToDoInput = () => {
    const dispatch = useDispatch()
    const [value, setValue] = useState('')

    function handleAddToDo () {
        if(value.trim() !== '') {
            dispatch(addTask(value))
            setValue('')
        }
    }

    return (
        <>
            <div className="to-do-managment">
                <input type="text" value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => {
                    if(e.key === 'Enter') {
                        handleAddToDo()
                    }
                }}/>
                <div className="add-to-do" onClick={handleAddToDo}>
                    <button ></button>
                </div>
                <div className="dropdown">
                    <div className="dropdown-header">All</div>
                    <ul>
                        <li>All</li>
                        <li>Completed</li>
                        <li>Incompleted</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default ToDoInput