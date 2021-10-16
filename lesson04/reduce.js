function repeat(amount, task) {
    for(let i = 0; i < amount; ++i) {
        task(i)
    }    
} 


let a = [1,2,3,4,10]

let max = a[0];
repeat(a.length, i => max = a[i] > max ? a[i] : max)

function reduce(a, combiner, initialValue = a[0], finisher = acc => acc) {
    let acc = initialValue
    repeat(a.length, i => acc = combiner(acc, a[i], i))
    finisher(acc)

    return acc
}


let max1 = reduce(a, (acc, curr) => acc > curr ? acc : curr)
console.log(max1)
let count = reduce((acc, curr) => ++acc, 0)
console.log(count)

function averageCombiner(acc, curr) {
    let ret =  {sum: acc.sum + curr, count: ++acc.count}
    ret.average = ret.sum/ret.count
    return ret
}

let average = reduce(a, (acc, curr, i) => (acc*(i)+curr)/(i+1), 0)
let average1 = reduce(a, averageCombiner, {sum: 0, count: 0, average: 0})
console.log(average1.average)


let average2 = reduce(a, (acc, curr) => acc+curr, 0, sum => sum/a.length)


let strArr  = reduce(a, (acc, curr) => acc+=curr + ",", "[", acc => acc + "]" )



