// File rsponsibilities
// Have the functions that handle HTTP requests and 
// delegate all domain logic to jokes-services module

const httpErrors = require('../http-errors')
const express = require('express')

module.exports = function(jokesServices) {
    if(!jokesServices) 
        throw "Invalid argument for jokesServices"

    const router = express.Router()
    
    router.get('/', getJokes)           // Get all jokes
    router.get('/:id', getJoke)        // Get a joke details
    router.delete('/:id', deleteJoke)  // Delete a joke
    router.put('/:id', updateJoke)     // Update a joke
    router.post('/', createJoke)        // Delete a joke

    return router


    async function getJokes(req, rsp){
        // jokesServices.getJokes()
        //     .then(jokes => rsp.json(jokes))
        //     .catch( e => rsp.status(500).json({description: "Internal error occurred"}))
    
        try {
            const skip = req.query.skip ? undefined : Number(req.query.skip)
            const limit = req.query.limit ? undefined : Number(req.query.limit)
            
            let userId = req.user.userId
            
            let jokes = await jokesServices.getJokes(userId, req.query.searchString, skip , limit)
            rsp.json(jokes)
        } catch(e) {
            rsp.status(401).json({description: "Invalid user"})
        }
    }
    
    function getJoke(req, rsp){
        jokesServices.getJoke(req.params.id)
            .then(joke => rsp.json(joke))
            .catch(e => processError(e, rsp))
    }
    
    function processError(aplErr, rsp) {
        const httpErr = httpErrors(aplErr)
        console.log(httpErr)
        rsp.status(httpErr.status).json(httpErr.body)
    
    
    }
    
    function createJoke(req, resp){
        jokesServices.createJoke(req.body.text)
            .then((newJoke)=>resp.status(201).json(newJoke))
            .catch((e)=>resp.status(500).json({message : `Server Error: ${e}`}))
    }
    
    function updateJoke(req, rsp){
        rsp.json({message : "updateJoke id = " + req.params.id })
    }
    
    
    function deleteJoke(req, rsp){ 
        const jokeId = req.params.id
        jokesServices.deleteJoke(req.user.userId, jokeId)
            .then((_)=>rsp.status(200).json({ status: `joke with id ${jokeId} deleted` } ))
            // TODO: Handle erros properly
            .catch((e)=>rsp.status(500).json({message : `Server Error: ${e}`}))
    }    
}


