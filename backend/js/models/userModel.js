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
        unique: true,
    },
    picture: String,
    address: String,
    admin: Boolean,
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    cart: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'cart',
    },
    orders: [String],
}, {
    timestamps: true,
});
const user = mongoose_1.default.model('user', userSchema);
exports.default = user;
