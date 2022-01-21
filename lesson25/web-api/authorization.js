module.exports = function(req, rsp, next) {
    let userId = undefined
    let auth = req.get('Authorization')
    if(auth) {
        let authParts = req.get('Authorization').split(' ')
        if(authParts.length  == 2) {
            userId = authParts[1]
        }
    }
    
    req.user = {
        userId: userId

    }
    next()
}