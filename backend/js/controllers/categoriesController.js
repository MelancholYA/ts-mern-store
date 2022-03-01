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
exports.getCategories = (0, express_async_handler_1.default)((Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    Response.send('cat list');
}));
exports.setCategories = (0, express_async_handler_1.default)((Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Request.body.category) {
        Response.status(400);
        throw new Error('no category was provided');
    }
    Response.send('add to cat list');
}));
exports.editCategory = (0, express_async_handler_1.default)((Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    Response.send('edit cat list id = ' + Request.params.id);
}));
exports.deleteCategory = (0, express_async_handler_1.default)((Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    Response.send('delete cat list item of id ' + Request.params.id);
}));
