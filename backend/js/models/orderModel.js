"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const orderSchema = new Schema({
    productId: {
        type: String,
        required: [true, 'please add a product id'],
    },
    userId: {
        type: String,
        required: [true, 'please add a user id'],
    },
}, {
    timestamps: true,
});
const order = mongoose_1.default.model('order', orderSchema);
exports.default = order;
