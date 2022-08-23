const CONSTANTS = require('./../../constants');
const { CustomException }  = require('@store-service/error-handler/src/exception/serverException');
const _ = require('lodash');

const validateRequestToken = (requestToken) => {
    const token = 'Basic '+ Buffer.from(process.env.BASIC_AUTH_USR + ':' + process.env.BASIC_AUTH_PWD).toString('base64');
    if(token === requestToken) {
        return true;
    }
    return false;
}

const basicAuth = (request, reply, done) => {
    const AUTH_VALIDATIONS = CONSTANTS.authValidations;
    try {
        request.log.info({ headers : request.headers, params : request.params, hostname : request.hostname, url : request.url, method : request.method});
        let token = request.headers.Authorization || request.headers.authorization;
        if (!token || token.indexOf('Basic ') === -1) {
            done(new CustomException(AUTH_VALIDATIONS.statusMessages["missingHeaderError"],AUTH_VALIDATIONS.errorMessages["missingHeaderError"], AUTH_VALIDATIONS.errorCodes[401] || 500 , null , "Authorization header"))
              
        }
        if(!validateRequestToken(token)) {
            done(new CustomException(AUTH_VALIDATIONS.statusMessages["invalidAuth"],AUTH_VALIDATIONS.errorMessages["invalidAuth"], AUTH_VALIDATIONS.errorCodes[401] || 500 , null , "Authorization header"))
              
        }
    } catch (ex) {
        if(ex.hasOwnProperty('status') && ex.hasOwnProperty('code') && ex.hasOwnProperty('message')) {
            done(new CustomException(ex.code || "AUTHORIZATION_ERROR",_.get(ex,'message', "Authorization error"), ex.status || 500 , null ,ex.property || "Authorization header"))
        
        } else {
            done(new CustomException(AUTH_VALIDATIONS.statusMessages["internalServerError"],AUTH_VALIDATIONS.errorMessages["internalServerError"], AUTH_VALIDATIONS.errorCodes[500] || 500 , null , "Authorization header"))
              
        }
    }
};

const validateAuth =  (request, reply, done) => {
    try {
        basicAuth(request, reply, done)
        done();
    } catch (ex) {
        done(new CustomException(ex.code || "AUTHORIZATION HANDLER", ex.message, (ex.response ? ex.response.status : 500) , ex.stack));
    }
}
module.exports =  { validateAuth , basicAuth , validateRequestToken };