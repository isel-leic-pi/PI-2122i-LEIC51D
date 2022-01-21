
const errors = require('./errors')





module.exports = function (elasticUri) {
    return {
        getJokes: getJokes,
        getJoke: getJoke,
        updateJoke: updateJoke,
        createJoke: createJoke,
        deleteJoke: deleteJoke,
        getUserByUsername: getUserByUsername
    }

    function getJokes(searchText, skip = 0, limit = jokes.length) {
    }

    function getJoke(id) {
    }

    function createJoke(text) {

    }

    function updateJoke(id, text) {
    }

    function deleteJoke(id) {
    }



    async function getUserByUsername(username) {
        const user = USERS.find(user => user.userName == username)

        if (user)
            return user
        throw errors.INVALID_USERNAME
    }
}