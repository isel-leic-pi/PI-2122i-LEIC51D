const repeat = require('../utils').repeat

test('test repeat with a positive number', () => {
    countRepetitions(5)
})


test('test repeat with zero repetitions', () => {
    countRepetitions(0)
})

test('test repeat with a negative repetitions', () => {
        // try {
    //     repeat(-1, _ => ++count)
    // } catch(e) {
    //     return
    // }
    // expect(true).toBeFalsy()


    expect(() => repeat(-1)).toThrow("Amount must be a positive number")

    
})



function countRepetitions(repetitions) {
    let count = 0
    repeat(repetitions, _ => ++count)
    expect(count).toBe(repetitions)
}