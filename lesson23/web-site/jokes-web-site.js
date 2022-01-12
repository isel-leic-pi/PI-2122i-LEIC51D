// File rsponsibilities
// Have the functions that handle HTTP requests and 
// delegate all domain logic to jokes-services module

const httpErrors = require('./http-errors')
const express = require('express')

module.exports = function(jokesServices) {
    if(!jokesServices) 
        throw "Invalid argument for jokesData"

    const router = express.Router()

    // HAMMER TIME: Middleware to insert an hardcoded user
    router.use(insertHammerUser) 


    router.get('/jokes', getJokes)
    router.get('/jokes/new', newJoke)
    router.post('/jokes', createJoke)
    router.get('/jokes/:id', getJoke)
    
    return router

    function insertHammerUser(req, rsp, next) {
        req.user = '0b115b6e-8fcd-4b66-ac26-33392dcb9340'
        next()
    }

    async function getJokes(req, rsp){
        let userId = req.user
        let jokes = await jokesServices.getJokes(userId)
        
        rsp.render('jokes', { title: 'All jokes', jokes: jokes.map((j, idx) =>  { return{ joke: j, beginRow: idx%2 == 0, endRow: idx%2 == 1 || idx == jokes.length-1}} )} )
    }
    

    async function newJoke(req, rsp){
        rsp.render('newJoke')
    }

    async function createJoke(req, res){
        // jokesServices.createJoke(req.body.text)
        //     .then( newJoke => res.render('joke', newJoke))
        let newJoke = await jokesServices.createJoke(req.user, req.body.text) 
        res.redirect(`/jokes/${newJoke.id}`)
    }

    async function getJoke(req, rsp){
        const joke = await jokesServices.getJoke(req.params.id)
        rsp.render('joke', joke)
    }



}


