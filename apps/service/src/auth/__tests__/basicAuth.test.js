const { validateAuth } = require('../basicAuth/index');
let request = {}
describe('Basic Auth Validation Tests' , () => {
    const done = jest.fn();
    done.mockImplementation((error) => {
        throw error;
    })
    request.log = {
        info : (x) => (x)
    }
    it('Should throw requestValidationError' , () => {
        request.headers = {
            authorization : ""
        }
        try{
            validateAuth(request , {} , done)
        }
        catch(error){
            expect(error.code).toEqual('REQUEST_VALIDATION_ERROR');
            expect(error.status).toEqual(500)
        }
    })
    it('Should throw Invalid Authorization Header error' , () => {
        request.headers = {
            authorization : "Basic "
        }
        try{
            validateAuth(request , {} , done)
        }
        catch(error){
            expect(error.code).toEqual('Invalid Auth token');
            expect(error.status).toEqual(500)
        }
    })

})