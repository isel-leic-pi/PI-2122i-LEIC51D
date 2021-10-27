const fetch = require('node-fetch')


function processResponse(res) {
    return res.text()
}

function processText(text) {
    return text.length
}

fetch('https://eloquentjavascript.net/11_async.html') // Promise<Response>
    .then(processResponse) // Promise<String>
    .then(processText)     // Promise<Number>
    .then(console.log)     // Promise<Number>





function httpRequests(...urls) {   // Promise<Number>
    //urls.map(url => fetch(url))
    let promises = urls.map(url => fetch(url)) // [Promise<Result>]

    console.log(promises)
    let promise = promises[0]       // Promise<Result>
        .then(res => res.text())    // Promise<String>
        .then(txt => txt.length)    // Promise<Number>

    for(let i = 1; i < promises.length; ++i) {
        promise = promise.then(size => 
            promises[i]       // Promise<Result>
                .then(res => res.text())    // Promise<String>
                .then(txt => txt.length + size) 
            
        )
    }
    return promise
}


httpRequests('https://eloquentjavascript.net/11_async.html', 'https://eloquentjavascript.net/11_async.html')
    .then(console.log)

console.log("Request initiated. Now I have nothing more to do")