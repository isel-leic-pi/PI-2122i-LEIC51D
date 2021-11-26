const errors = require('./errors')

const USERS = ['0b115b6e-8fcd-4b66-ac26-33392dcb9340', '3dfd8596-cfd3-431d-8e36-f0fc4c64f364']

const jokes = new Array(100).fill(undefined)
    .map((_, idx) => { return {id: idx+1, text: `joke${idx+1}`, userId: USERS[(idx%2)]}})

let nextId = jokes.length

module.exports = {
    getJokes : getJokes,
    getJoke : getJoke,
    updateJoke : updateJoke,
    createJoke : createJoke,
    deleteJoke : deleteJoke
}

function getJokes(userId, search){
    let retJokes = jokes.filter(j => j.userId == userId)
    retJokes = !search ? retJokes : retJokes.filter(j => j.text.includes(search))
    
    return Promise.resolve(retJokes)
}

function getJoke(id){
    const joke = jokes.find(t => t.id == id)
    if(!joke) return Promise.reject(errors.NOT_FOUND)
    return Promise.resolve(joke)
}

function createJoke(text){
    const newId = nextId++
    const newJoke = {id : newId, text : text}
    jokes.push(newJoke)
    return Promise.resolve(newJoke)
    
}

function updateJoke(id, text){
    console.log("updateJoke")
}

function deleteJoke(id){ 
    console.log("deleteJoke")
}
