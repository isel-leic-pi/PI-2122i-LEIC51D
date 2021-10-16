function repeat(amount, task) {
    for(let i = 0; i < amount; ++i) {
        task(i)
    }    
} 


let a = [1,2,3,4,10, 12, 15, 7, 9.4, 14, 9.5, 12]

function filter(a, predicate) {
    let res = []
    repeat(a.length, i => { if(predicate(a[i])) { res.push(a[i])} })

    return res
}

console.log("PositiveGrades")
let positiveGrades = filter(a, e => e >= 9.5 )
console.log(positiveGrades)


console.log("Even numbers")
let evenNumbers = filter(a, e => e % 2 == 0 )
console.log(evenNumbers)




