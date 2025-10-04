import { configureStore } from '@reduxjs/toolkit'
import ToDoReducer from './ToDoSlice'

const store = configureStore({
    reducer: {
        todo: ToDoReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export default store