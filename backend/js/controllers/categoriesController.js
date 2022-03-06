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
exports.deleteCategory = exports.editCategory = exports.setCategories = exports.getCategories = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const mongoose_1 = __importDefault(require("mongoose"));
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
const productModel_1 = __importDefault(require("../models/productModel"));
const getCategories = (0, express_async_handler_1.default)((Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield categoryModel_1.default.find();
    Response.status(200).json(categories);
}));
exports.getCategories = getCategories;
const setCategories = (0, express_async_handler_1.default)((Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, products } = Request.body;
    if (!name) {
        Response.status(400);
        throw new Error('Please provide a name for your category');
    }
    yield categoryModel_1.default
        .create({
        name,
        products,
    })
        .then((res) => Response.status(204).json())
        .catch((err) => {
        Response.status(400);
        throw new Error(err);
    });
}));
exports.setCategories = setCategories;
const editCategory = (0, express_async_handler_1.default)((Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = Request.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        Response.status(400);
        throw new Error('Please provide a valid category id');
    }
    if (JSON.stringify(Request.body) === '{}') {
        Response.status(400);
        throw new Error('Please provide a valid body');
    }
    yield categoryModel_1.default
        .findByIdAndUpdate(id, Request.body)
        .then((res) => Response.status(204).json(res))
        .catch((err) => {
        Response.status(400);
        throw new Error(err);
    });
}));
exports.editCategory = editCategory;
const deleteCategory = (0, express_async_handler_1.default)((Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = Request.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        Response.status(400);
        throw new Error('Please provide a valid category id');
    }
    try {
        yield categoryModel_1.default.findOneAndRemove({ _id: id });
        let relatedProducts = yield productModel_1.default.find({ category: id });
        relatedProducts.map((product, i) => __awaiter(void 0, void 0, void 0, function* () {
            product.categories = product.categories.filter((category) => category === id);
            yield product.save();
        }));
        Response.status(204).json();
    }
    catch (error) {
        Response.status(400);
        throw new Error(error);
    }
}));
exports.deleteCategory = deleteCategory;
