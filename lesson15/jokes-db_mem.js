const jokes = new Array(100).fill(undefined)
    .map((_, idx) => { return {id: idx+1, text: `joke${idx+1}`, userId: (idx%2)+1}})

let nextId = jokes.length

module.exports = {
    getJokes : getJokes,
    getJokeByID : getJoke,
    updateJoke : updateJoke,
    createJoke : createJoke,
    deleteJoke : deleteJoke
}

function getJokes(userId, search){
    console.log(userId)
    console.log(search)
    userId = Number(userId)
    let retJokes = jokes.filter(j => j.userId == userId)
    retJokes = !search ? retJokes : retJokes.filter(j => j.text.includes(search))
    
    return Promise.resolve(retJokes)
}

function getJoke(id){
    const joke = jokes.find(t => t.id == id)
    if(!joke) return Promise.reject("Not Found")
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
