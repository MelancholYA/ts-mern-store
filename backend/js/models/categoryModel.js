"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const categorySchema = new Schema({
    name: String,
    products: [],
});
const category = mongoose_1.default.model('category', categorySchema);
exports.default = category;
