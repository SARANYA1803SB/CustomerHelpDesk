const create = require('../customError')

describe('customError handler tests', () => {
    it('Validate create is a function', () => {
        expect(typeof create === 'function').toBe(true)
    })
})