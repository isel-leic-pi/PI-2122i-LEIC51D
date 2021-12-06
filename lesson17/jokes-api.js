// File rsponsibilities
// Have the functions that handle HTTP requests and 
// delegate all domain logic to jokes-services module


const httpErrors = require('./http-errors')

module.exports = function(jokesServices) {
    if(!jokesServices)
        throw "Invalid jokes services argument"

        
    return {
        getJokes: getJokes,
        getJoke: getJoke,
        createJoke: createJoke,
        deleteJoke: deleteJoke,
        updateJoke: updateJoke,
    }


    async function getJokes(req, rsp){
        // jokesServices.getJokes()
        //     .then(jokes => rsp.json(jokes))
        //     .catch( e => rsp.status(500).json({description: "Internal error occurred"}))

        try {
            let userId = getUserId(req)
            console.log(userId)
            let jokes = await jokesServices.getJokes(userId, req.query.searchString)
            rsp.json(jokes)
        } catch(e) {
            processError(e, rsp)
        }
    }

    function getJoke(req, rsp){
        let userId = getUserId(req)
        jokesServices.getJoke(userId, userId, req.params.id)
            .then(joke => rsp.json(joke))
            .catch(e => processError(e, rsp))
    }

    function createJoke(req, resp){
        let userId = getUserId(req)
        jokesServices.createJoke(req.body.text)
            .then((newJoke)=>resp.status(201).json(newJoke))
            .catch(e => processError(e, rsp))
    }

    function updateJoke(req, rsp){
        let userId = getUserId(req)
        rsp.json({message : "updateJoke id = " + req.params.id })
    }


    function deleteJoke(req, rsp){ 
        let userId = getUserId(req)
        rsp.json({message : "deleteJoke " })
    }


    function processError(err, rsp) {
        let httpError = httpErrors.convertError(err)
        rsp.status(httpError.status).json(httpError.body)
    }



    function getUserId(req) {
        return req.get('Authorization').split(' ')[1]
    }

}

