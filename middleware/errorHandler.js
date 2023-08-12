const {status} = require('../constants');

const errorHandler = function(err,req,res,next){

    const statusCode = res.statusCode ? res.statusCode : 500;

    switch(statusCode){

        case status.VALIDATION_ERROR :
            res.json({
                title: "Validation Error",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case status.UNAUTHORIZED :
            res.json({
                title: "Unauthorized resource access Error",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case status.FORBIDDEN :
            res.json({
                title: "Forbidden URI Error",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case status.NOT_FOUND :
            res.json({
                title: "Resource Not found Error",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case status.SERVER_ERROR :
            res.json({
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        default :
            console.log("NO Errors :)");
            break;
            
    };

}

module.exports = errorHandler;