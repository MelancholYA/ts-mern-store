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
exports.deleteAdmin = exports.changeAdminPassword = exports.addAdmin = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateJWT_1 = __importDefault(require("../utils/generateJWT"));
const adminModel_1 = __importDefault(require("../models/adminModel"));
const addAdmin = (0, express_async_handler_1.default)((Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let { name, email, password } = Request.body;
    if (!name || !email || !password) {
        Response.status(400);
        throw new Error('Invalid credentials');
    }
    if (!((_a = Request.admin) === null || _a === void 0 ? void 0 : _a.admin)) {
        Response.status(400);
        throw new Error('Not authorized , not admin');
    }
    let alreadyUser = yield userModel_1.default.findOne({ email });
    if (alreadyUser) {
        Response.status(400);
        throw new Error('user already have a normal user account , please remove it first');
    }
    let alreadyExists = yield adminModel_1.default.findOne({ email });
    if (alreadyExists) {
        Response.status(400);
        throw new Error('Email already exists');
    }
    let salt = yield bcryptjs_1.default.genSalt(7);
    let hashedPassword = yield bcryptjs_1.default.hash(password, salt);
    yield adminModel_1.default
        .create({
        name,
        email,
        password: hashedPassword,
        admin: true,
    })
        .then((res) => {
        let token = (0, generateJWT_1.default)({
            id: res === null || res === void 0 ? void 0 : res.id,
            name: res === null || res === void 0 ? void 0 : res.name,
            email: res === null || res === void 0 ? void 0 : res.email,
            admin: res === null || res === void 0 ? void 0 : res.admin,
        });
        if (token) {
            Response.status(201).json({
                token,
            });
        }
        else {
            Response.status(500);
            throw new Error('admin created with no JWT ');
        }
    })
        .catch((err) => {
        Response.status(500);
        throw new Error(err);
    });
}));
exports.addAdmin = addAdmin;
const changeAdminPassword = (0, express_async_handler_1.default)((Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, currPassword, newPassword } = Request.body;
    let adminData = yield adminModel_1.default.findOne({ email });
    console.log({ email, currPassword, newPassword });
    if (!adminData) {
        Response.status(400);
        throw new Error('No admin with this email');
    }
    let isSamePassword = bcryptjs_1.default.compareSync(currPassword, adminData.password);
    if (!isSamePassword) {
        Response.status(400);
        throw new Error('wrong password');
    }
    let salt = yield bcryptjs_1.default.genSalt(7);
    let hashedPassword = yield bcryptjs_1.default.hash(newPassword, salt);
    yield adminModel_1.default
        .findOneAndUpdate({ email }, {
        password: hashedPassword,
    })
        .then((res) => {
        Response.status(204).json();
    })
        .catch((err) => {
        Response.status(500);
        throw new Error(err);
    });
}));
exports.changeAdminPassword = changeAdminPassword;
const deleteAdmin = (0, express_async_handler_1.default)((Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = Request.params;
    console.log(id);
    yield adminModel_1.default
        .findByIdAndDelete(id)
        .then((res) => {
        if (!res) {
            Response.status(400);
            throw new Error('no admin was find with this id');
        }
        console.log({ res });
        Response.status(204).json();
    })
        .catch((err) => {
        Response.status(500);
        throw new Error(err);
    });
}));
exports.deleteAdmin = deleteAdmin;
