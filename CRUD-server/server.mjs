import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())

let todos = []

app.use(express.json())

app.get('/', (req, res) => {
    res.send(todos)
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

app.listen(2000, () => {
    console.log('Server is work')
})