const express = require('express')
const tasksApi = require('./tasks-web-api')

const app = express()

app.use(express.json())

app.get('/tasks', tasksApi.getTasks)
app.get('/tasks/:id', tasksApi.getTaskByID)
app.put('/tasks/:id', tasksApi.updateTask)
app.post('/tasks', tasksApi.createTask)
app.delete('/tasks/:id', tasksApi.deleteTask)

app.listen(8080, ()=> console.log('Listening'))


