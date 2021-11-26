const jokesData = require('./jokes-db_mem')
const errors = require('./errors')

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
    id = Number(id)
    
    if(isNaN(id) || id <= 0) return Promise.reject(errors.INVALID_ID)
    return jokesData.getJoke(id)

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
