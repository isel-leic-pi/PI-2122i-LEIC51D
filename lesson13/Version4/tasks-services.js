const taskData = require('./tasks-db_mem')

module.exports = {
    getTasks : getTasks,
    getTaskByID : getTaskByID,
    updateTask : updateTask,
    createTask : createTask,
    deleteTask : deleteTask
}

function getTasks(){
    return taskData.getTasks()
}

function getTaskByID(id){
    if(!id) return Promise.reject("Invalid ID")
    return tasksData.getTaskByID(id)
}

function createTask(text){
    return tasksData.createTask(text)
}

function updateTask(id, text){
    console.log("updateTask")
}

function deleteTask(id){ 
    console.log("deleteTask")
}
