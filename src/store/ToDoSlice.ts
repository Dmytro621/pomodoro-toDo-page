import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ToDo {
    id: number,
    text: string,
    completed: boolean
}

interface ToDoState {
    todos: ToDo[]
}

const initialState: ToDoState = {
    todos: []
}

const ToDoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTask(state, action: PayloadAction<string>) {
            state.todos.push({
                id: Math.fround(Math.random() * 100000),
                text: action.payload,
                completed: false
            })
        },
        toggleTask(state, action: PayloadAction<number>) {
            const currentToDo = state.todos.find((item) => item.id === action.payload)
            if (currentToDo) {
                currentToDo.completed = !currentToDo.completed
            }
        },
        deleteTask(state, action: PayloadAction<number>) {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        }
    }
})

export const {addTask, toggleTask, deleteTask} = ToDoSlice.actions
export default ToDoSlice.reducer