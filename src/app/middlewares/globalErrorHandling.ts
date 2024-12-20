import { ErrorRequestHandler, Request, Response } from 'express';
import { TerrorSourcres } from '../interfaces/errors';


const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Default error status and message
  let statusCode = err?.status || 500;
  let message = err?.message || 'Something went wrong!';


  let error: TerrorSourcres = [{
    path: '',
    message: 'Something went wrong!'
  }]

  const NODE_DEV = process.env.NODE_DEV

  // Send the response
  res.status(statusCode).json({
    success: false,
    message,
    error,
    stack: NODE_DEV === 'development' ? err?.stack : null
  });
};

export default globalErrorHandler;