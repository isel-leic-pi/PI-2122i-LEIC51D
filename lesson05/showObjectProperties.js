const object = { a: 1, b: 2, c: 3 };

for (const property in object) {
  //console.log(`${property}: ${object[property]}`);
  console.log(property + ': ' + object[property] + object, object, [1,2,3,4]);
}

for(const property of Object.getOwnPropertyNames(object)) {
    console.log(property + ': ' + object[property]);
}

console.log(object)
console.log(object.toString())


