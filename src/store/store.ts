import { configureStore } from '@reduxjs/toolkit'
import ToDoReducer from './ToDoSlice'
import logger from 'redux-logger'

const store = configureStore({
    reducer: {
        todo: ToDoReducer,
    },
    middleware: (defaultMiddleware) => defaultMiddleware().concat(logger)
})

export type RootState = ReturnType<typeof store.getState>

export default store