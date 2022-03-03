"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const adminSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'user name is required'],
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
    },
    admin: Boolean,
    password: {
        type: String,
        required: [true, 'password is required'],
    },
}, {
    timestamps: true,
});
const admin = mongoose_1.default.model('admin', adminSchema);
exports.default = admin;
