
class CustomException extends Error {

    constructor(name, message , status , stack , property){
       
        super(message || "Server error" , status);
        this.name = name;
        this.code = name
        this.property = property
        //Error.captureStackTrace(stack);
        this.status = status || 500;
        this.stack = stack
    }
}


module.exports = {
    CustomException
}
