const USER1 = '098ae99e-5c50-463d-b8d4-0176202221bc'
const UNKNOWN_USER = '098ae99e-5c50-463d-b8d4-0176202221bd'

const testJokes = [
        {
            id: 1, text: "joke1", userId: USER1
        },
        {
            id: 1, text: "joke2", userId: USER1
        }
    ]

const jokesData = require('../jokes-db_mem')(testJokes)

const errors = require('../errors')
const services = require('../jokes-services')(jokesData)



describe('getJokes tests', () => {
    test('should get All jokes for a valid user', () => {
        // Arrange
        // Act
        return services.getJokes(USER1)
                        .then(checkJokes)
        // Assert
        function checkJokes(jokes) {
            expect(jokes).toHaveLength(2)
        }
    })

    test('should get All jokes for a valid user with a search string', () => {
        // Arrange
        // Act
        return services.getJokes(USER1, '1')
                        .then(checkJokes)
        // Assert
        function checkJokes(jokes) {
            expect(jokes).toHaveLength(1)
        }
    })
    
    test('should throw user not found exception for an unknown userId', () => {
        return invert(services.getJokes(UNKNOWN_USER))
                    .then(error => {
                        expect(error).toEqual(errors.USER_NOT_FOUND)
                    })        

    })
    
    test('should throw invalid user id exception for an invalid userId', () => {
        return invert(services.getJokes(1))
                    .then(error => {
                        expect(error).toEqual(errors.INVALID_USER_ID)
                    })        
    })
})



function invert(p) {
    return new Promise((resolve, reject) => 
        p.then(v => reject(v)).catch(error => resolve(error))
    )
}
