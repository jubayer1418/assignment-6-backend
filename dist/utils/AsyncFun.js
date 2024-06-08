"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncFun = void 0;
const AsyncFun = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(err => next(err));
    };
};
exports.AsyncFun = AsyncFun;
