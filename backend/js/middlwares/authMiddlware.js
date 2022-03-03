"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectForAdmin = exports.protect = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const protect = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers['x-auth-token'];
    const secret = process.env.JWT_SECRET || '';
    if (!token) {
        res.status(401);
        throw new Error('not authorized , no token');
    }
    let user = jsonwebtoken_1.default.verify(token.toString(), secret);
    if (!user) {
        res.status(401);
        throw new Error('not authorized');
    }
    if (typeof user === 'object') {
        req.user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            orders: user.orders,
            cart: user.cart,
        };
    }
    next();
}));
exports.protect = protect;
const protectForAdmin = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers['x-auth-token'];
    const secret = process.env.JWT_SECRET || '';
    if (!token) {
        res.status(401);
        throw new Error('not authorized , no token');
    }
    let admin = jsonwebtoken_1.default.verify(token.toString(), secret);
    if (!admin) {
        res.status(401);
        throw new Error('not authorized');
    }
    if (admin && typeof admin === 'object') {
        if (!admin.admin) {
            res.status(401);
            throw new Error('not authorized , not admin');
        }
        req.admin = Object.assign(Object.assign({}, admin), { admin: true });
    }
    next();
}));
exports.protectForAdmin = protectForAdmin;
