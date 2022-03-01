"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'please add a category name'],
    },
    products: [String],
});
const category = mongoose_1.default.model('category', categorySchema);
exports.default = category;
