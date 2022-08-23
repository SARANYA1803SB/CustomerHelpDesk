const customErrorHandler = require('./handlers/customError');
const { errorSchema }= require('./schema/errorSchema');

module.exports = {
    customErrorHandler,
    errorSchema
}