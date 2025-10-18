import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(cors())
app.use(express.static(path.join(__dirname, 'client/build')))

let todos = []

app.use(express.json())

app.get('/api/todos', (req, res) => {
    res.json(todos)
})

app.post('/', (req, res) => {
    const {text} = req.body
    todos = [...todos, {id: Math.floor(Math.random() * 1000), completed: false, text: text}]
    res.send(todos)
})

app.put('/:id' , (req, res) => {
    const {text} = req.body
    const {id} = req.params
    const todo = todos.find(todo => Number(id) === todo.id)

    todos = todos.map(toDo => {
        return toDo.id === Number(id) ? {...todo, text} : toDo
    })
    res.send('todo updated')
})

app.put('/completed/:id', (req, res) => {
    const {id} = req.params

    let todo = todos.find(todo => Number(id) === todo.id)
    todo = {...todo, completed: !todo.completed}
    todos = todos.map(t => t.id === Number(id) ? todo : t)

    res.send(todos)
})

app.delete('/:id', (req, res) => {
    const {id} = req.params
    const parseId = parseInt(id)
    todos = todos.filter((todo) => todo.id !== parseId)
    res.send(todos)
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'))
})

const PORT = process.env.PORT || 2000
app.listen(PORT, () => {
    console.log(`Server is work on port ${PORT}`)
})