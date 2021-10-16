function repeat(amount, task) {
    for(let i = 0; i < amount; ++i) {
        task(i)
    }    
} 

let total = 0

// let total = 0
// while (count <= 10) {
//   total += count;
//   count += 1;
// }

repeat(10, function(repetition) { total += repetition})
repeat(10, repetition => total += repetition+1)
console.log(total)


// for(let i = 0; i < 15; ++i) {
//     console.log(i)
// }
repeat(15, i => console.log(i))
repeat(15, console.log)


// ----------------------------

function power(number, pow) {
    let result = 1
    repeat(pow, i => result * number)
}

pow(23, 10)
pow(55, 10)
pow(60, 10)


function powerGenerator(pow) {
    return number => power(number, pow)
}

let pow10 = powerGenerator(10)
pow10(23)
pow10(55)
pow10(60)


