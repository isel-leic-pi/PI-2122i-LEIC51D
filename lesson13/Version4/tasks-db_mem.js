const tasks = [
    {id : 1, text : "task1"},
    {id : 2, text : "task2"}
]

let nextId = 3

module.exports = {
    getTasks : getTasks,
    getTaskByID : getTaskByID,
    updateTask : updateTask,
    createTask : createTask,
    deleteTask : deleteTask
}

function getTasks(){
    return Promise.resolve(tasks)
}

function getTaskByID(id){
    const task = tasks.find(t => t.id == id)
    if(!task) return Promise.reject("Not Found")
    return Promise.resolve(task)
}

function createTask(text){
    const newId = nextId++
    const newTask = {id : newId, text : text}
    tasks.push(newTask)
    return Promise.resolve(newTask)
    
}

function updateTask(id, text){
    console.log("updateTask")
}

function deleteTask(id){ 
    console.log("deleteTask")
}
