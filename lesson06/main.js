const utils = require('./utils')

utils.repeat(5, console.log)

let a = [1,2,3,4,5]

let res = utils.reduce(a, (prev, next) => prev+next)
console.log(res)

res = a.reducePro((prev, next) => prev+next)
console.log(res)

console.log("#########################")
const utils1 = require('./utils')
utils.repeat(5, console.log)