"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const cartSchema = new Schema({
    products: [String],
    userId: {
        type: String,
        required: [true, 'please add a user id'],
    },
}, {
    timestamps: true,
});
const cart = mongoose_1.default.model('cart', cartSchema);
exports.default = cart;
