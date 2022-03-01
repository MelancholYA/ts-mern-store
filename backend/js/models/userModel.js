"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'user name is required'],
    },
    email: {
        type: String,
        required: [true, 'email is required'],
    },
    picture: String,
    address: String,
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    cart: String,
    orders: [String],
}, {
    timestamps: true,
});
const user = mongoose_1.default.model('user', userSchema);
exports.default = user;
