import ToDoInput from "./ToDoInput"
import ToDoList from "./ToDoList"

const ToDo = () => {
    return (
        <>
            <main>
                <img src="" alt="" />
                <div className="to-do-content">
                    <div className="to-do-title">
                        <h1>To-Do List</h1>
                    </div>
                    <ToDoInput/>
                    <ToDoList/>
                </div>
                <div className="to-do-link-to-pomodoro">
                    <div className="play-icon"></div>
                    <a href="/">POMODORO</a>
                </div>
            </main>
        </>
    )
}

export default ToDo