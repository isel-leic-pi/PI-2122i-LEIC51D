const jokesData = require('./jokes-db_mem')

module.exports = {
    getJokes : getJokes,
    getJoke : getJoke,
    updateJoke : updateJoke,
    createJoke : createJoke,
    deleteJoke : deleteJoke
}

async function getJokes(userId, searchStr){
    // TODO: Validate user

    return jokesData.getJokes(userId, searchStr)
}

async function getJoke(id){
    if(!(id  || Number(id))) return Promise.reject("Invalid ID")
    return jokesData.getJokeByID(id)
}

async function createJoke(text){
    return jokesData.createJoke(text)
}

async function updateJoke(id, text){
    console.log("updateJoke")
}

async function deleteJoke(id){ 
    console.log("deleteJoke")
}
