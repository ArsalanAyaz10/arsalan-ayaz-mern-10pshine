import Logger from '../utils/logger.js';

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  let message = err.message || "Internal Server Error";

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Invalid Data: " + Object.values(err.errors).map(e => e.message).join(", ");
  }

  if (err.name === "CastError") {
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

  Logger.error({
    name: err.name,
    message: err.message,
    stack: err.stack,
    statusCode,
    path: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  });

  Logger.error({
  name: err.name,
  message: err.message,
  stack: err.stack,
  statusCode,
  path: req.originalUrl,
  method: req.method,
  ip: req.ip,
  userAgent: req.headers["user-agent"],
});

console.error("Global Error Handler:", err); 
  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
