// File rsponsibilities
// Have the functions that handle HTTP requests and 
// delegate all domain logic to jokes-services module

const httpErrors = require('../http-errors')
const express = require('express')
const urls = require('./jokes-urls')

module.exports = function(jokesServices) {
    if(!jokesServices) 
        throw "Invalid argument for jokesData"

    const router = express.Router()

    router.get('/', getJokes)
    router.get('/new', newJoke)
    router.post('/', createJoke)
    router.get('/:id', getJoke)
    
    
    return router

    async function getJokes(req, rsp){
        try {
            let userId = req.user ? req.user.userId : undefined
            let username = req.user ? req.user.username : "anonymous"
            let jokes = await jokesServices.getJokes(userId)
            rsp.render('jokes', { user: req.user, title: 'All jokes', jokes: jokes.map((j, idx) =>  { return{ joke: j, beginRow: idx%2 == 0, endRow: idx%2 == 1 || idx == jokes.length-1}} )} )
        } catch(err) {
            console.log(err)
            rsp.redirect(urls.LOGIN)
        }
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


