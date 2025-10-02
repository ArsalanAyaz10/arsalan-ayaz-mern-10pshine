import Logger from '../utils/logger.js';

const errorHandler = (req,res,err)=>{

    Logger.error({
        message: err.message,
        stack: err.stack,
        path: req.originalUrl,
        method: req.method,
    });

const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
const message = err.message || 'Internal Server Error';
    
if(err.name === 'ValidationError'){
    statusCode = 400;
    message = "Invalid Data" + Object.values(err.errors).map(e => e.message).join(", ");
}

if(err.name === 'CastError'){
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
}

  if (err.code === 11000) { 
    statusCode = 400;
    message = "Duplicate field value entered.";
  }

  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token. Authorization denied.";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired. Please log in again.";
  }

    res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;