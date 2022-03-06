"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'please add a name'],
    },
    count: {
        type: Number,
        required: [true, 'please add a count'],
    },
    curentPrice: {
        type: Number,
        required: [true, 'please add a price'],
    },
    olderPrice: Number,
    description: {
        type: String,
        required: [true, 'please add a description'],
    },
    images: {
        default: {
            type: String,
            required: [true, 'please add a product image'],
        },
        thumbs: [String],
    },
    categories: [
        {
            type: mongoose_1.default.Types.ObjectId,
            required: [true, 'please add at least one category'],
            ref: 'category',
        },
    ],
}, {
    timestamps: true,
});
const product = mongoose_1.default.model('product', productSchema);
exports.default = product;
