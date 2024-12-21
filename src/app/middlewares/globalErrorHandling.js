"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (err, req, res, next) => {
    var _a;
    // Default error status and message
    let statusCode = (err === null || err === void 0 ? void 0 : err.statusCode) || 500;
    let message = (err === null || err === void 0 ? void 0 : err.message) || 'Something went wrong!';
    let error = [{
            path: '',
            message: 'Something went wrong!'
        }];
    const NODE_DEV = process.env.NODE_DEV;
    // Handle specific error types
    switch (err === null || err === void 0 ? void 0 : err.name) {
        case 'ZodError':
            statusCode = 400;
            message = 'Invalid input data based on schema validation.';
            error = ((_a = err === null || err === void 0 ? void 0 : err.errors) === null || _a === void 0 ? void 0 : _a.map((e) => ({
                path: e.path,
                message: e.message,
            }))) || [];
            break;
        case 'ValidationError':
            statusCode = 422;
            message = 'Validation failed due to incorrect data format or missing fields.';
            error = [{
                    path: 'validation',
                    message: message,
                }];
            break;
        case 'AUTH_ERROR':
            statusCode = 401;
            message = 'Authentication failed. Please log in.';
            break;
        case 'JsonWebTokenError':
            statusCode = 401;
            message = 'You are not authorized';
            break;
        case 'AuthorizationeError':
            statusCode = 403;
            message = 'Access denied. You do not have permission to perform this action.';
            break;
    }
    // Send the response
    res.status(statusCode).json({
        success: false,
        message,
        statusCode,
        error,
        stack: NODE_DEV === 'development' ? err === null || err === void 0 ? void 0 : err.stack : null
    });
};
exports.default = globalErrorHandler;
