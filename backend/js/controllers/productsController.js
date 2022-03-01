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
exports.getproduct = exports.deleteProduct = exports.editProducts = exports.setProducts = exports.getproducts = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const productModel_1 = __importDefault(require("../models/productModel"));
const getproduct = (0, express_async_handler_1.default)((Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    yield productModel_1.default
        .findById(Request.body.id)
        .then((res) => {
        if (!res) {
            Response.status(400);
            throw new Error('no item was found');
        }
        else {
            Response.status(400).json(res);
        }
    })
        .catch((err) => {
        Response.status(500);
        throw new Error(err);
    });
}));
exports.getproduct = getproduct;
const getproducts = (0, express_async_handler_1.default)((Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    Response.send('products');
}));
exports.getproducts = getproducts;
const setProducts = (0, express_async_handler_1.default)((Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    Response.send('add product');
}));
exports.setProducts = setProducts;
const editProducts = (0, express_async_handler_1.default)((Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    Response.send('proucts edit ');
}));
exports.editProducts = editProducts;
const deleteProduct = (0, express_async_handler_1.default)((Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    Response.send('delete product list item of id ' + Request.params.id);
}));
exports.deleteProduct = deleteProduct;
