let CLIENT_ID = process.env.ATLAS_CLIENT_ID
const BOARD_GAME_ATLAS = `https://api.boardgameatlas.com/api/search?order_by=popularity&ascending=false&client_id=${CLIENT_ID}`

let fs = require('fs/promises')
let fetch = require('node-fetch')

fetch(BOARD_GAME_ATLAS)
    .then(res => res.json())
    .then(createLocalGameObjects)
    .then(createGamesList)
    //.catch(e => processError)



function createLocalGameObjects(g) {
    return g.games.map(g => { return {id: g.id, gameName: g.name}})
}

function createGamesList(g) {
    let str = g
        .map(game => game.id)
        //.map(console.log)
        .reduce((acc, str) => `${acc}\n${str}`)
        console.log(str)

    fs.writeFile('game.ids1.txt', str).then(() => console.log("File written"))
}


function processError(err) {
    console.log(`Error occurred ${err}`)
}


