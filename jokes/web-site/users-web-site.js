// File responsibilities
// Handle users management and logon sessions

const httpErrors = require('../http-errors')
const express = require('express')
const passport = require('passport') 
const urls = require('./jokes-urls')

module.exports = function(app, jokesServices) {
    if(!jokesServices) 
        throw "Invalid argument for jokesData"

    const router = express.Router()

    // Passport initialization
    app.use(passport.initialize())
    app.use(passport.session())
    passport.serializeUser((user, done) => done(null, user))
    passport.deserializeUser((user, done) => done(null, user))

    router.get('/create', createUserForm) 
    router.post('/', createUser) 
    router.get('/login', loginForm) 
    router.post('/login', login) 
    router.post('/logout', logout)     
    return router

    function createUserForm(req, rsp) {
        rsp.end("createUserForm")
    }

    function createUser(req, rsp) {
        rsp.end("createUser")
    }

    function loginForm(req, rsp) {
        rsp.render("login", urls)
    }

    async function login(req, rsp) {
        let username = req.body.username
        let pass = req.body.password

        try {
            let userId = await jokesServices.validateCredentials(username, pass)
            req.login({userId: userId, username: username}, (err) => rsp.redirect('/'))
            
        } catch(err) {
            rsp.status(401).render('login', { username: username, message: 'Invalid credentials'})
        }
    }

    function logout(req, rsp) {
        req.logout()
        rsp.redirect(urls.LOGIN)
    }
}

