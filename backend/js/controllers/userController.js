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
exports.getUser = exports.loginUser = exports.registerUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = __importDefault(require("../models/userModel"));
const cartModel_1 = __importDefault(require("../models/cartModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const registerUser = (0, express_async_handler_1.default)((Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, email, password } = Request.body;
    if (!name || !email || !password) {
        Response.status(400);
        throw new Error('Invalid credentials');
    }
    let userData = yield userModel_1.default.findOne({ email });
    if (userData) {
        Response.status(400);
        throw new Error('Email already exists');
    }
    let salt = yield bcryptjs_1.default.genSalt(7);
    let hashedPassword = yield bcryptjs_1.default.hash(password, salt);
    yield userModel_1.default
        .create({ name, email, password: hashedPassword })
        .then((res) => __awaiter(void 0, void 0, void 0, function* () {
        let cartItem = yield cartModel_1.default.create({
            products: [],
            user: res._id,
        });
        let userItem = yield userModel_1.default
            .findByIdAndUpdate(res._id, {
            cart: cartItem._id,
        }, { returnDocument: 'after' })
            .select('-password');
        Response.status(201).json(userItem);
    }))
        .catch((err) => {
        Response.status(500);
        throw new Error(err);
    });
}));
exports.registerUser = registerUser;
const loginUser = (0, express_async_handler_1.default)((Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    Response.status(200).send('logeed in');
}));
exports.loginUser = loginUser;
const getUser = (0, express_async_handler_1.default)((Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    Response.status(200).send('user data');
}));
exports.getUser = getUser;
