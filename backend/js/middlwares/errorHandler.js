"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    const resStatus = res.statusCode ? res.statusCode : 500;
    const errorBody = {
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null,
        status: resStatus,
    };
    res.status(resStatus).send(errorBody);
};
exports.default = errorHandler;
