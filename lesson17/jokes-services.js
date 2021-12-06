
const errors = require('./errors')
const utils = require('./utils')

module.exports = function (jokesData) {
    if(!jokesData)
        throw "Invalid jokes data argument"
    
    return {
        getJokes : getJokes,
        getJoke : getJoke,
        updateJoke : updateJoke,
        createJoke : createJoke,
        deleteJoke : deleteJoke
    }


    async function getJokes(userId, searchStr){
        // TODO: Validate user
        if(!utils.isGuid(userId))
            throw errors.INVALID_USER_ID // Promise.reject(erros.INVALID_USER_ID)  
        return jokesData.getJokes(userId, searchStr)
    }
    
    async function getJoke(userId, id){
        id = Number(id)
        
        if(isNaN(id) || id <= 0) return Promise.reject(errors.INVALID_ID)
        return jokesData.getJoke(id)
    
    }
    
    async function createJoke(userId, text){
        return jokesData.createJoke(text)
    }
    
    async function updateJoke(userId, id, text){
        console.log("updateJoke")
    }
    
    async function deleteJoke(userId, id){ 
        console.log("deleteJoke")
    }
    
}

