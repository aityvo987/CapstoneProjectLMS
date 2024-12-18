"use strict";
// Create catchAsyncErrors.ts file to catch the error asynchronously functions
// Since in controllers we will use a lots asynchronously functions
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatchAsyncError = void 0;
const CatchAsyncError = (theFunc) => (req, res, next) => {
    Promise.resolve(theFunc(req, res, next).catch(next));
};
exports.CatchAsyncError = CatchAsyncError;
