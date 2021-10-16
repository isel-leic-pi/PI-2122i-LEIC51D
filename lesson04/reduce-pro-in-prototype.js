function repeat(amount, task) {
    for(let i = 0; i < amount; ++i) {
        task(i)
    }    
} 


let a = [1,2,3,4,10, 12, 15, 7, 9.4, 14, 9.5, 12]

let max = a[0];
repeat(a.length, i => max = a[i] > max ? a[i] : max)

function reduce(a, combiner, initialValue = a[0], finisher = acc => acc) {
    let acc = initialValue
    repeat(a.length, i => acc = combiner(acc, a[i], i))
    return finisher(acc, a)
}

Array.prototype.reducePro = function(combiner, initialValue, finisher) {
    return reduce(this, combiner, initialValue, finisher)
}

let max1 = a.reducePro((acc, curr) => acc > curr ? acc : curr)
console.log(max1)
let count = a.reducePro((acc, curr) => ++acc, 0)
console.log(count)


let positiveAverage = a
                        .filter(e => e >= 9.5)
                        .reducePro((acc, curr) => acc+curr, 0, (sum, arr) => sum/arr.length)


console.log(positiveAverage)


