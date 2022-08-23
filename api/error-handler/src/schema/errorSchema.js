const validationErrorSchema = {
    type: "object",
    properties: {
      errors: {
        type: "array",
        items: {
          type: "object",
          properties: {
            property: { type: "string" },
            message: { type: "string" },
            code: { type: "string" },
          }
        }
      }
    }
  };

const commonErrorSchema = {
  type: "object",
    properties: {
      errors: {
        type: "array",
        items: {
          type: "object",
          properties: {
            message: { type: "string" },
            code: { type: "string" },
          }
        }
      }
    }
}

  
  exports.errorSchema = {
      400: validationErrorSchema,   //schema validation error
      401: commonErrorSchema,    //authorization error
      404: commonErrorSchema,   //not found
      405: commonErrorSchema,   //method not allowed
      415: commonErrorSchema,   //unsupported media type
      500: commonErrorSchema,   //internal server error
      503: commonErrorSchema,  //service unavailable
      502: commonErrorSchema,  //bad gateway
      504: commonErrorSchema   //gateway timeout
  }
  