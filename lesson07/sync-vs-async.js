

function longOperation(a) {


}

function longOperationAsync(a, cb) {


}


function processResult0(res) {
    return longOperation(res)
}


function processResult1(res) {
    return res*res
}

function processResult2(res) {
    console.log(res)
}


// Synchronous model
let res = longOperation(1,2)
processResult(res)



// Asynchronous model with callback
//longOperation(1,2, res => processResult(res))
longOperation(1,2, processResult)
console.log(123)


// Asynchronous model with callback
let promiseRes = longOperation(1,2)
//promiseRes.then(res => processResult(res))
promiseRes.             // Promise<Number>
    then(processResult0) // Promise<Promise<Number>> => Promise<Number>
    then(processResult1) // Promise<Number>
    then(processResult2) // Promise<Undefined>




    