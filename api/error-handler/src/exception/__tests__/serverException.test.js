const { CustomException } = require('../serverException')

describe('serverException tests', () => {
    it('Validate CustomException is called with args', () => {
        let message = 'error msg'
        let status = 400
        let name = 'dummy name'
        let property = 'dummy property'
        try{
            throw new CustomException(name, message, status, 500, property)
        }
        catch(e){
            expect(e.status).toBe(status)
            expect(e.message).toEqual(message)
            expect(e.name).toEqual(name)
            expect(e.property).toEqual(property)
            expect(e.stack).toBe(500)
        }
    })

    it('Validate CustomException is called without args', () => {
        try{
            throw new CustomException()
        }
        catch(e){
            expect(e.status).toBe(500)
            expect(e.message).toEqual('Server error')
            expect(e.name).toBeUndefined()
            expect(e.property).toBeUndefined()
            expect(e.stack).toBeUndefined()
        }
    })
})