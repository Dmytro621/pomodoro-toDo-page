import { useState } from "react"
import { useDispatch } from "react-redux"
import { addTask, changeFilter } from "../store/ToDoSlice"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"

const ToDoInput = () => {
    const dispatch = useDispatch()
    const [value, setValue] = useState('')
    const [dropdown, setDropdown]= useState<boolean>(false)
    const filter = useSelector((store: RootState) => store.todo.filter)

    function handleAddToDo () {
        if(value.length > 25) {
            return alert('Maximum length is 25 characters')
        } else if(value.trim() !== '') {
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
                <div className={`dropdown ${dropdown ? 'open' : 'close'}`} onClick={() => setDropdown(!dropdown)}>
                    <div className="dropdown-header">
                        <p>{filter}</p>
                        <div className='dropdown-arrow'></div>
                    </div>
                    <div className="dropdown-list">
                        <ul>
                            <li onClick={() => dispatch(changeFilter('All'))}>All</li>
                            <li onClick={() => dispatch(changeFilter('Completed'))}>Completed</li>
                            <li onClick={() => dispatch(changeFilter('Incompleted'))}>Incompleted</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ToDoInput