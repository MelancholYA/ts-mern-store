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
exports.getproduct = exports.deleteProduct = exports.editProducts = exports.getProductByCategory = exports.setProducts = exports.getproducts = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const mongoose_1 = __importDefault(require("mongoose"));
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
const productModel_1 = __importDefault(require("../models/productModel"));
const getproduct = (0, express_async_handler_1.default)((Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    var id = Request.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        Response.status(400);
        throw new Error('invalid product id');
    }
    yield productModel_1.default
        .findById(id)
        .then((res) => {
        if (!res) {
            Response.status(400).json({
                message: 'no item was found',
                status: 400,
            });
        }
        else {
            Response.status(200).json(res);
        }
    })
        .catch((err) => {
        Response.status(500);
        throw new Error(err);
    });
}));
exports.getproduct = getproduct;
const getproducts = (0, express_async_handler_1.default)((Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    yield productModel_1.default
        .find()
        .then((res) => Response.status(200).json(res))
        .catch((err) => {
        Response.status(500);
        throw new Error(err);
    });
}));
exports.getproducts = getproducts;
const getProductByCategory = (0, express_async_handler_1.default)((Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = Request.params;
    yield productModel_1.default
        .find({ categories: [id] })
        .then((res) => Response.status(200).json(res))
        .catch((err) => {
        Response.status(500);
        throw new Error(err);
    });
}));
exports.getProductByCategory = getProductByCategory;
const setProducts = (0, express_async_handler_1.default)((Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    yield productModel_1.default
        .create(Request.body)
        .then((res) => __awaiter(void 0, void 0, void 0, function* () {
        let updated = yield categoryModel_1.default.find({ _id: Request.body.categories });
        console.log({ updated });
        updated.map((cat) => __awaiter(void 0, void 0, void 0, function* () {
            cat.products.push(res._id);
            yield cat.save();
        }));
        Response.json(updated);
    }))
        .catch((err) => {
        let messages = [];
        let errors = Object.values(err.errors);
        errors.map((value) => messages.push(value.message));
        Response.status(400);
        throw new Error(messages[0]);
    });
}));
exports.setProducts = setProducts;
const editProducts = (0, express_async_handler_1.default)((Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    let id = Request.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        Response.status(400);
        throw new Error('invalid product id');
    }
    yield productModel_1.default
        .findByIdAndUpdate(id, Request.body, { new: true })
        .then((res) => {
        if (!res) {
            Response.status(400).json({
                message: 'no item was found',
                status: 400,
            });
        }
        else {
            Response.status(200).json(res);
        }
    })
        .catch((err) => {
        Response.status(500);
        throw new Error(err);
    });
}));
exports.editProducts = editProducts;
const deleteProduct = (0, express_async_handler_1.default)((Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = Request.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        Response.status(400);
        throw new Error('invalid product id');
    }
    yield productModel_1.default
        .findByIdAndDelete(id)
        .then((res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!res) {
            Response.status(400).json({
                message: 'no item was found',
                status: 400,
            });
        }
        else {
            let updated = yield categoryModel_1.default.find({ _id: Request.body.categories });
            console.log({ updated });
            updated.map((cat) => __awaiter(void 0, void 0, void 0, function* () {
                cat.products = cat.product.filter((prod) => prod === res._id);
                yield cat.save();
            }));
            Response.status(200).json(res);
        }
    }))
        .catch((err) => {
        Response.status(500);
        throw new Error(err);
    });
    let relatedCategories = yield categoryModel_1.default.find({ products: [id] });
    relatedCategories.map((cat, i) => __awaiter(void 0, void 0, void 0, function* () {
        cat.products = cat.products.filter((product) => product === id);
        yield cat.save();
    }));
}));
exports.deleteProduct = deleteProduct;
