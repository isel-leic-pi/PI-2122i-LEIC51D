
console.log("Utils module code begin")

module.exports = {
    repeat: repeat,
    reduce: reduce
}


function repeat(amount, task) {
    if(amount < 0) {
        throw "Amount must be a positive number"
    }
    for(let i = 0; i < amount; ++i) {
        task(i)
    }    
} 

function reduce(a, combiner, initialValue = a[0], finisher = acc => acc) {
    let acc = initialValue
    repeat(a.length, i => acc = combiner(acc, a[i], i))
    return finisher(acc, a)
}

Array.prototype.reducePro = function(combiner, initialValue, finisher) {
    return reduce(this, combiner, initialValue, finisher)
}


console.log("Utils module code end")