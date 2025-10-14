import { createSlice, PayloadAction , createAsyncThunk} from '@reduxjs/toolkit'

export interface ToDo {
    id: number,
    text: string,
    completed: boolean
}

interface ToDoState {
    todos: ToDo[],
    filter: string,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null
}

const initialState: ToDoState = {
    todos: [],
    filter: 'All',
    status: 'idle',
    error: null,
}

export const fetchToDos = createAsyncThunk(
    'todo/fetchToDos',
    async () => {
        const url = 'http://localhost:2000/'
        const response = await fetch(url)
        if(!response.ok) throw new Error('Pending Error')
        const data = await response.json()
        return data
    }
)

export const fetchAddTodo = createAsyncThunk(
    'todo/fetchAddTodo',
    async (arg: string) => {
        const url = 'http://localhost:2000/'
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({text: arg})
        })
        const data = await response.json()
        return data
    }
)

export const fetchDeleteToDo = createAsyncThunk(
    'todo/fetchDeleteToDo',
    async (id: number) => {
        const url = `http://localhost:2000/${id}`
        const response = await fetch(url, {
            method: 'DELETE'
        })
        if(!response.ok) throw new Error('Pending Error')
        const data = await response.json()
        return data
    }
)

export const fetchToggleCompletedToDo = createAsyncThunk(
    'todo/fetchToggleCompletedToDo',
    async (id: number) => {
        const url = `http://localhost:2000/completed/${id}`
        const response = await fetch(url, {
            method: 'PUT'
        })
        if(!response.ok) throw new Error('Pending Error')
        const data = await response.json()
        return data
    }
)

const ToDoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        changeFilter(state, action: PayloadAction<string>) {
            state.filter = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchToDos.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchToDos.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.todos = action.payload
        })
        .addCase(fetchToDos.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message || 'Error'
        })
        .addCase(fetchAddTodo.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchAddTodo.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.todos = action.payload
        })
        .addCase(fetchAddTodo.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message || 'Error'
        })
        .addCase(fetchDeleteToDo.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchDeleteToDo.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.todos = action.payload
        })
        .addCase(fetchDeleteToDo.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message || 'Error'
        })
        .addCase(fetchToggleCompletedToDo.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchToggleCompletedToDo.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.todos = action.payload
        })
        .addCase(fetchToggleCompletedToDo.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message || 'Error'
        })
    }
})

export const {changeFilter} = ToDoSlice.actions
export default ToDoSlice.reducer