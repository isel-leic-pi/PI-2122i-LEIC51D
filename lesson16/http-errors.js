module.exports = {
    convertError: convertError
}


const httpErrors = {
    e400: HttpError(400, 'Invalid ID supplied'),
    e404: HttpError(404, 'Joke not found'),
    e500: HttpError(500, 'Internal server errors. Contact the administrator')
}
 
const aplToHttpErrors = {
    '1000': httpErrors.e400,
    '1001': httpErrors.e404,
    '1008': httpErrors.e404
}



function HttpError(status, body) {
    return {
        status: status,
        body: body
    }
}


function convertError(aplErr) {
    let httpErr = aplToHttpErrors[aplErr.code] ||  httpErrors.e500
    httpErr.body = aplErr.text || httpErr.body

    return httpErr
    
}



