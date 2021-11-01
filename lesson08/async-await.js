const fetch = require('node-fetch')

async function dummy() {
    return 0
    //return Promise.resolve(0)
}

async function getResponseSize(url) {
    // fetch(url)
    //     .then(rsp => rsp.text())
    //     .then(text => text.length) 

    let response = await fetch(url)
    let text = await response.text()
    return text.length
}


let res = getResponseSize('https://eloquentjavascript.net/11_async.html')

console.log(res)

console.log(dummy())