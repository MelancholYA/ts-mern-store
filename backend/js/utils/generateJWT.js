"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET || '';
const generateToken = (payload) => {
    return payload
        ? jsonwebtoken_1.default.sign(JSON.parse(JSON.stringify(payload)), secret, {
            expiresIn: '30d',
        })
        : null;
};
exports.default = generateToken;
