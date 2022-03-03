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
exports.updateUser = exports.loginUser = exports.registerUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = __importDefault(require("../models/userModel"));
const cartModel_1 = __importDefault(require("../models/cartModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateJWT_1 = __importDefault(require("../utils/generateJWT"));
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
        }, { new: true })
            .select('-password -__v -createdAt -updatedAt');
        let token = (0, generateJWT_1.default)(userItem);
        if (token) {
            Response.status(201).json({
                token,
            });
        }
        else {
            res.status(500);
            throw new Error('user created with no JWT');
        }
    }))
        .catch((err) => {
        Response.status(500);
        throw new Error(err);
    });
}));
exports.registerUser = registerUser;
const loginUser = (0, express_async_handler_1.default)((Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = Request.body;
    if (!email || !password) {
        Response.status(400);
        throw new Error('invalid credianltials');
    }
    let userData = yield userModel_1.default
        .findOne({ email })
        .select('-password -__v -createdAt -updatedAt');
    if (!userData) {
        Response.status(400);
        throw new Error('no user was found with this email');
    }
    let token = (0, generateJWT_1.default)(userData);
    if (!token) {
        Response.status(500);
        throw new Error("couldn't generate token");
    }
    Response.status(200).json({ token });
}));
exports.loginUser = loginUser;
const updateUser = (0, express_async_handler_1.default)((Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    const newData = Request.body;
    if (newData.password) {
        delete newData.password;
    }
    yield userModel_1.default
        .findByIdAndUpdate(Request === null || Request === void 0 ? void 0 : Request.user._id, newData, { new: true })
        .then((res) => {
        Response.status(204).json();
    })
        .catch((err) => {
        Response.status(400);
        throw new Error(err);
    });
}));
exports.updateUser = updateUser;
