
const tasksServices = require('./tasks-services_mem')

module.exports = {
    getTasks : getTasks,
    getTaskByID : getTaskByID,
    updateTask : updateTask,
    createTask : createTask,
    deleteTask : deleteTask
}

//TODO ERRORS

function getTasks(req, resp){
    //resp.json(tasksServices.getTasks())
    tasksServices.getTasks()
        .then(tasks => resp.json(tasks))
        .catch(()=>resp.status(500).json({message : "Server Error"}))
}

function getTaskByID(req, resp){
    tasksServices.getTaskByID(req.params.id)
        .then(task => resp.json(task))
        .catch(()=>resp.status(404).json({message : "Not Found"}))
}

function createTask(req, resp){
    tasksServices.createTask(req.body.text)
        .then(()=>resp.status(201).json({message : "Created"}))
        .catch(()=>resp.status(500).json({message : "Server Error"}))
}

function updateTask(req, resp){
    resp.json({message : "updateTask id = " + req.params.id })
}

function deleteTask(req, resp){ 
    resp.json({message : "deleteTask " })
}
