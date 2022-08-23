const { errorSchema } = require('../errorSchema')

describe('errorSchema tests', () => {
    it('errorSchema should be declared', () => {
        expect(typeof errorSchema === 'object').toBe(true)
        expect(typeof errorSchema['400'] === 'object').toBe(true)
        expect(typeof errorSchema['401'] === 'object').toBe(true)
        expect(typeof errorSchema['404'] === 'object').toBe(true)
        expect(typeof errorSchema['405'] === 'object').toBe(true)
        expect(typeof errorSchema['415'] === 'object').toBe(true)
        expect(typeof errorSchema['500'] === 'object').toBe(true)
        expect(typeof errorSchema['503'] === 'object').toBe(true)
        
        expect(errorSchema['400'].hasOwnProperty('type'))
        expect(errorSchema['400'].hasOwnProperty('properties'))

        expect(errorSchema['401'].hasOwnProperty('type'))
        expect(errorSchema['401'].hasOwnProperty('properties'))
    })
})