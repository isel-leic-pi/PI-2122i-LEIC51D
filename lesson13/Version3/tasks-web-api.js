
const tasksServices = require('./tasks-services_mem')

module.exports = {
    getTasks : getTasks,
    getTask : getTask,
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

async function getTasks(req, resp){
    // tasksServices.getTask(req.params.id)
    //     .then(tasks => resp.json(tasks))
    //     .catch(()=>resp.status(404).json({message : "Not Found"}))

    try {
        let tasks = await tasksServices.getTask(req.params.id)
        resp.json(tasks)
    } catch(e) {
        resp.status(404).json({message : "Not Found"})
    }
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
