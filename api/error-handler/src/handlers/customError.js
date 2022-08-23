const fp = require("fastify-plugin");
const statusCodes = require("http").STATUS_CODES;

module.exports = function create(options = {}) {
  return fp((fastify, opts, next) => {
    fastify.setErrorHandler(function (error, request, reply) {
      request.log.error(error);
      const statusCode =
        Array.isArray(error) && error.length
          ? error[0].status
          :  error.status ||parseInt(error.message.errorCode) ||
          error.statusCode ||
          reply.statusCode ||
          reply.res.statusCode ||
          "500";

      if (error.validation) {
        let errors = [
          {
            code: "REQUEST_VALIDATION_ERROR",
          }
        ]
        if(error.validationContext === "headers" && error.validation[0].hasOwnProperty('params')){
          errors[0] = {
            ...errors[0],
            ...{property : error.validation[0].params.missingProperty ? error.validation[0].params.missingProperty : 
                           `${error.validation[0].dataPath} : ${error.validation[0].params.allowedValues}`},
            ...{message : `${error.validation[0].dataPath} ${error.validation[0].message}`}
                      
          }
        }
        else if((error.validationContext === "params"|| error.validationContext === "body" || error.validationContext === "querystring") && error.validation[0].hasOwnProperty('params')){
          errors[0] = {
            ...errors[0],
            ...{property : error.validation[0].dataPath ? error.validation[0].dataPath : 
                           "params"},
            ...{message :  error.validation[0].keyword === "required" ? error.validation[0].message
                            : `parameter violates the  ${error.validation[0].keyword} constraint`}
          }
        }
        reply.code(statusCode).send({
           errors : errors
        });
      }
      else {
        let errors;
        if (Array.isArray(error)) {
          errors = error.map(err => ({
            code: err.code || statusCodes[statusCode + ""],
            message: err.message
          }));
        } else {
            let customError = {
                code: error.code || statusCodes[statusCode + ""],
                message: error.message
            }
            if(error.hasOwnProperty("status")){
              customError = { 
                ...customError,
                ...{status:error.status}
              }
            }
            if(error.hasOwnProperty("attribute")){
              customError = { 
                ...customError,
                ...{attribute:error.attribute}
              }
            }
            if(error.hasOwnProperty("property")){
                customError = { 
                  ...customError,
                  ...{property: error.property}
                }
            }
            errors = [
              {
                ...customError
              }
            ];
        }

        reply.code(statusCode).send({ errors });
      }
    });
    next();
  });
};
